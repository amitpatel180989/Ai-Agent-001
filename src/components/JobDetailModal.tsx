import React from "react";
import {
  Building2,
  CheckCircle2,
  Copy,
  ExternalLink,
  FileCheck,
  FileText,
  MapPin,
  Moon,
  Sparkles,
  User,
  X,
  Zap
} from "lucide-react";
import { ApplicationStatus, JobApplication } from "../types";
import { getStatusBadgeClass } from "../utils";

interface JobDetailModalProps {
  job: JobApplication | null;
  onClose: () => void;
  onUpdateStatus: (jobId: string, status: ApplicationStatus) => void;
}

export const JobDetailModal: React.FC<JobDetailModalProps> = ({
  job,
  onClose,
  onUpdateStatus
}) => {
  if (!job) return null;

  const statuses: ApplicationStatus[] = [
    "Scouted",
    "Tailoring",
    "Applied (While Sleeping)",
    "Recruiter Viewed",
    "Screen Scheduled",
    "Technical Interview",
    "Offer Received",
    "Archived"
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-start justify-between gap-4 bg-slate-50/70 dark:bg-slate-900/50">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-100 dark:bg-indigo-950 font-black text-indigo-700 dark:text-indigo-300 flex items-center justify-center text-base border border-indigo-200 dark:border-indigo-800">
              {job.company.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-lg text-slate-900 dark:text-white">{job.company}</h3>
                <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${getStatusBadgeClass(job.status)}`}>
                  {job.status}
                </span>
              </div>
              <p className="text-xs sm:text-sm font-semibold text-indigo-600 dark:text-indigo-400 mt-0.5">{job.title}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 flex-1 overflow-y-auto space-y-6 scrollbar-thin text-xs sm:text-sm">
          {/* Metadata Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 dark:bg-slate-950/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-800">
            <div>
              <span className="text-[10px] font-bold uppercase text-slate-400 block">Match Score</span>
              <span className="text-lg font-black text-emerald-600 dark:text-emerald-400">{job.matchScore}%</span>
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase text-slate-400 block">Work Mode</span>
              <span className="font-bold text-slate-800 dark:text-slate-200">{job.workType}</span>
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase text-slate-400 block">Salary Range</span>
              <span className="font-bold text-slate-800 dark:text-slate-200">{job.salaryRange}</span>
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase text-slate-400 block">Dispatched</span>
              <span className="font-bold text-purple-600 dark:text-purple-400">{job.appliedAt.split(" (")[0]}</span>
            </div>
          </div>

          {/* Match Rationale */}
          <div className="space-y-2">
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-500">Agent Cognitive Rationale</h4>
            <div className="space-y-1.5 bg-emerald-50/50 dark:bg-emerald-950/30 p-3.5 rounded-xl border border-emerald-200/60 dark:border-emerald-800/60 text-emerald-900 dark:text-emerald-200">
              {job.matchReasons.map((reason, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{reason}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ATS Matched Keywords */}
          <div className="space-y-2">
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-500">ATS Keywords Injected</h4>
            <div className="flex flex-wrap gap-1.5">
              {job.atsKeywordsMatched.map((kw, i) => (
                <span
                  key={i}
                  className="text-xs px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium border border-slate-200 dark:border-slate-700"
                >
                  {kw}
                </span>
              ))}
            </div>
          </div>

          {/* Tailored Resume Bullet Modification */}
          {job.tailoredResumeHighlight && (
            <div className="space-y-2">
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <FileCheck className="w-4 h-4 text-indigo-500" />
                Resume Tailoring Highlight
              </h4>
              <div className="p-3.5 rounded-xl bg-indigo-50/80 dark:bg-indigo-950/60 text-indigo-900 dark:text-indigo-200 text-xs border border-indigo-200 dark:border-indigo-800 leading-relaxed font-medium">
                {job.tailoredResumeHighlight}
              </div>
            </div>
          )}

          {/* Submitted Cover Letter */}
          {job.coverLetter && (
            <div className="space-y-2">
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-indigo-500" />
                Custom Submitted Cover Letter
              </h4>
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-800 dark:text-slate-200 whitespace-pre-line leading-relaxed font-sans">
                {job.coverLetter}
              </div>
            </div>
          )}

          {/* Recruiter Details if present */}
          {job.recruiterContact && (
            <div className="p-4 rounded-xl bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800 text-xs space-y-1">
              <div className="font-bold text-sky-900 dark:text-sky-200 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5" />
                <span>Recruiter Lead: {job.recruiterContact.name} ({job.recruiterContact.title})</span>
              </div>
              {job.recruiterContact.email && (
                <span className="text-sky-700 dark:text-sky-400 font-mono text-[11px]">
                  {job.recruiterContact.email}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer: Status Updater */}
        <div className="p-5 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 bg-slate-50/70 dark:bg-slate-900/50">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-600 dark:text-slate-400">Change Status:</span>
            <select
              value={job.status}
              onChange={(e) => onUpdateStatus(job.id, e.target.value as ApplicationStatus)}
              className="text-xs px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-semibold"
            >
              {statuses.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={job.jobUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 transition"
            >
              <span>Original Job Link</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white transition cursor-pointer"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
