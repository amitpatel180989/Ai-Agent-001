import React, { useState } from "react";
import {
  Briefcase,
  Building2,
  CheckCircle2,
  ExternalLink,
  Eye,
  FileText,
  Filter,
  Flame,
  Globe,
  MapPin,
  Moon,
  Plus,
  Search,
  Sparkles,
  Zap
} from "lucide-react";
import { ApplicationStatus, JobApplication } from "../types";
import { formatCurrency, getStatusBadgeClass } from "../utils";

interface ApplicationsPipelineProps {
  applications: JobApplication[];
  onSelectApplication: (job: JobApplication) => void;
  onUpdateJobStatus: (jobId: string, newStatus: ApplicationStatus) => void;
  onOpenNewJobModal: () => void;
  onRunAgentCycle: () => void;
  isAgentRunning: boolean;
}

export const ApplicationsPipeline: React.FC<ApplicationsPipelineProps> = ({
  applications,
  onSelectApplication,
  onUpdateJobStatus,
  onOpenNewJobModal,
  onRunAgentCycle,
  isAgentRunning
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>("ALL");
  const [workTypeFilter, setWorkTypeFilter] = useState<string>("ALL");
  const [viewMode, setViewMode] = useState<"kanban" | "table">("kanban");

  const statuses: ApplicationStatus[] = [
    "Scouted",
    "Tailoring",
    "Applied (While Sleeping)",
    "Recruiter Viewed",
    "Screen Scheduled",
    "Technical Interview",
    "Offer Received"
  ];

  const filteredApps = applications.filter((job) => {
    const matchesSearch =
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.atsKeywordsMatched.some((k) => k.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesStatus =
      selectedStatusFilter === "ALL" || job.status === selectedStatusFilter;

    const matchesWorkType =
      workTypeFilter === "ALL" || job.workType.toLowerCase() === workTypeFilter.toLowerCase();

    return matchesSearch && matchesStatus && matchesWorkType;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner & Quick Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white dark:bg-slate-800/90 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xs">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            Autonomous Applications Pipeline
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Auto-applied jobs while you sleep, ATS-tailored packages, and interview stages
          </p>
        </div>

        <div className="flex items-center gap-2.5 w-full sm:w-auto">
          <button
            id="add-custom-job-btn"
            onClick={onOpenNewJobModal}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-600 transition cursor-pointer"
          >
            <Plus className="w-4 h-4 text-indigo-500" />
            <span>Add / Paste Job URL</span>
          </button>

          <button
            id="trigger-ai-scout-btn"
            onClick={onRunAgentCycle}
            disabled={isAgentRunning}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 active:scale-98 disabled:opacity-50 text-white shadow-sm shadow-indigo-600/30 transition cursor-pointer"
          >
            <Zap className={`w-4 h-4 ${isAgentRunning ? "animate-spin" : ""}`} />
            <span>{isAgentRunning ? "Agent Scouting..." : "Scout & Auto-Apply"}</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white dark:bg-slate-800/90 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-xs flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search company, role, or tech keyword..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-start md:justify-end">
          <select
            value={selectedStatusFilter}
            onChange={(e) => setSelectedStatusFilter(e.target.value)}
            className="text-xs px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-200 focus:outline-hidden"
          >
            <option value="ALL">All Statuses ({applications.length})</option>
            {statuses.map((st) => (
              <option key={st} value={st}>
                {st}
              </option>
            ))}
          </select>

          <select
            value={workTypeFilter}
            onChange={(e) => setWorkTypeFilter(e.target.value)}
            className="text-xs px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-200 focus:outline-hidden"
          >
            <option value="ALL">All Work Modes</option>
            <option value="Remote">Remote Only</option>
            <option value="Hybrid">Hybrid</option>
            <option value="On-site">On-site</option>
          </select>

          {/* View Toggle */}
          <div className="flex items-center rounded-lg border border-slate-300 dark:border-slate-700 p-0.5 bg-slate-100 dark:bg-slate-900">
            <button
              onClick={() => setViewMode("kanban")}
              className={`text-xs px-2.5 py-1 rounded-md font-semibold transition ${
                viewMode === "kanban"
                  ? "bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-2xs"
                  : "text-slate-500 dark:text-slate-400"
              }`}
            >
              Board
            </button>
            <button
              onClick={() => setViewMode("table")}
              className={`text-xs px-2.5 py-1 rounded-md font-semibold transition ${
                viewMode === "table"
                  ? "bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-2xs"
                  : "text-slate-500 dark:text-slate-400"
              }`}
            >
              Table
            </button>
          </div>
        </div>
      </div>

      {/* Main Content: Kanban or Table */}
      {viewMode === "kanban" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {statuses.map((status) => {
            const columnApps = filteredApps.filter((j) => j.status === status);
            return (
              <div
                key={status}
                className="bg-slate-50 dark:bg-slate-900/60 rounded-2xl p-4 border border-slate-200 dark:border-slate-800 flex flex-col gap-3 min-h-[450px]"
              >
                {/* Column Header */}
                <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-slate-800 dark:text-slate-200">{status}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                      {columnApps.length}
                    </span>
                  </div>
                </div>

                {/* Job Cards */}
                <div className="space-y-3 flex-1 overflow-y-auto max-h-[600px] scrollbar-thin">
                  {columnApps.map((job) => (
                    <div
                      key={job.id}
                      onClick={() => onSelectApplication(job)}
                      className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700 shadow-xs hover:border-indigo-500 dark:hover:border-indigo-500 hover:shadow-md transition cursor-pointer space-y-3 group"
                    >
                      {/* Top row */}
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-700 flex items-center justify-center font-bold text-xs text-slate-700 dark:text-slate-200 overflow-hidden shrink-0 border border-slate-200 dark:border-slate-600">
                            {job.company.slice(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <h4 className="font-bold text-xs text-slate-900 dark:text-white leading-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition">
                              {job.company}
                            </h4>
                            <span className="text-[10px] text-slate-500 dark:text-slate-400 flex items-center gap-1">
                              <MapPin className="w-2.5 h-2.5" />
                              {job.workType}
                            </span>
                          </div>
                        </div>

                        {/* Match Score Badge */}
                        <div className="flex flex-col items-end">
                          <span className="text-[11px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                            {job.matchScore}% Match
                          </span>
                        </div>
                      </div>

                      {/* Job Title */}
                      <div className="text-xs font-semibold text-slate-800 dark:text-slate-200 line-clamp-2">
                        {job.title}
                      </div>

                      {/* Salary */}
                      <div className="text-[11px] font-medium text-slate-600 dark:text-slate-400 flex items-center gap-1">
                        <Zap className="w-3 h-3 text-amber-500" />
                        <span>{job.salaryRange}</span>
                      </div>

                      {/* ATS Keywords */}
                      <div className="flex flex-wrap gap-1">
                        {job.atsKeywordsMatched.slice(0, 3).map((kw, i) => (
                          <span
                            key={i}
                            className="text-[9px] px-1.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 font-medium"
                          >
                            {kw}
                          </span>
                        ))}
                        {job.atsKeywordsMatched.length > 3 && (
                          <span className="text-[9px] px-1 py-0.5 text-slate-400 font-medium">
                            +{job.atsKeywordsMatched.length - 3}
                          </span>
                        )}
                      </div>

                      {/* Tailored Bullet Highlight */}
                      {job.tailoredResumeHighlight && (
                        <div className="p-2 rounded-lg bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/60 text-[10px] text-indigo-900 dark:text-indigo-200 leading-tight">
                          <span className="font-bold">Tailored: </span>
                          {job.tailoredResumeHighlight}
                        </div>
                      )}

                      {/* Applied while sleeping badge */}
                      {job.appliedAt.includes("Sleeping") && (
                        <div className="text-[10px] font-semibold text-purple-600 dark:text-purple-400 flex items-center gap-1">
                          <Moon className="w-3 h-3" />
                          <span>Auto-Applied While Sleeping</span>
                        </div>
                      )}

                      {/* Quick Footer Action */}
                      <div className="pt-2 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between text-[11px]">
                        <span className="text-slate-400">{job.appliedAt.split(" (")[0]}</span>
                        <span className="font-semibold text-indigo-600 dark:text-indigo-400 flex items-center gap-1">
                          <Eye className="w-3 h-3" /> View Package
                        </span>
                      </div>
                    </div>
                  ))}

                  {columnApps.length === 0 && (
                    <div className="h-32 flex flex-col items-center justify-center text-slate-400 text-xs border border-dashed border-slate-300 dark:border-slate-800 rounded-xl p-4 text-center">
                      <span>No jobs in this phase</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Table View */
        <div className="bg-white dark:bg-slate-800/90 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700 dark:text-slate-300">
              <thead className="bg-slate-50 dark:bg-slate-900/80 text-slate-600 dark:text-slate-400 uppercase font-bold text-[10px] tracking-wider border-b border-slate-200 dark:border-slate-700">
                <tr>
                  <th className="py-3.5 px-4">Company & Role</th>
                  <th className="py-3.5 px-4">Match Score</th>
                  <th className="py-3.5 px-4">Work Type & Salary</th>
                  <th className="py-3.5 px-4">ATS Keywords</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Applied At</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
                {filteredApps.map((job) => (
                  <tr
                    key={job.id}
                    onClick={() => onSelectApplication(job)}
                    className="hover:bg-slate-50 dark:hover:bg-slate-900/50 transition cursor-pointer"
                  >
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-900 dark:text-white">{job.company}</div>
                      <div className="text-slate-500 dark:text-slate-400 text-[11px]">{job.title}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-extrabold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                        {job.matchScore}%
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <div>{job.workType}</div>
                      <div className="text-[11px] text-slate-500">{job.salaryRange}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex flex-wrap gap-1 max-w-xs">
                        {job.atsKeywordsMatched.slice(0, 3).map((kw, i) => (
                          <span
                            key={i}
                            className="text-[9px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
                          >
                            {kw}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getStatusBadgeClass(job.status)}`}>
                        {job.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-[11px] text-slate-500">
                      {job.appliedAt}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectApplication(job);
                        }}
                        className="text-indigo-600 dark:text-indigo-400 hover:underline font-bold"
                      >
                        Inspect Package
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
