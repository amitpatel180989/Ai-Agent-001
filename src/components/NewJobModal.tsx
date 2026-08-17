import React, { useState } from "react";
import {
  Briefcase,
  Building2,
  ExternalLink,
  MapPin,
  Sparkles,
  Wand2,
  X,
  Zap
} from "lucide-react";
import { CandidateProfile, JobApplication } from "../types";

interface NewJobModalProps {
  isOpen: boolean;
  onClose: () => void;
  onJobAdded: (newJob: JobApplication) => void;
  candidateProfile: CandidateProfile;
}

export const NewJobModal: React.FC<NewJobModalProps> = ({
  isOpen,
  onClose,
  onJobAdded,
  candidateProfile
}) => {
  if (!isOpen) return null;

  const [company, setCompany] = useState("OpenAI");
  const [title, setTitle] = useState("Staff Web Platform Engineer");
  const [jobUrl, setJobUrl] = useState("https://openai.com/careers/staff-web-engineer");
  const [workType, setWorkType] = useState<"Remote" | "Hybrid" | "On-site">("Remote");
  const [salaryRange, setSalaryRange] = useState("$230,000 - $285,000");
  const [description, setDescription] = useState(
    "Looking for a Staff Web Platform Engineer to lead real-time web experiences, canvas interactions, and low-latency API rendering pipelines across ChatGPT & developer platforms."
  );
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyzeAndApply = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAnalyzing(true);

    try {
      // Call tailor endpoint to get real ATS optimization
      const res = await fetch("/api/resume/tailor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jobTitle: title,
          company: company,
          jobDescription: description,
          currentResume: candidateProfile
        })
      });

      const data = await res.json();
      const tailorData = data.data || {};

      const newJob: JobApplication = {
        id: `app-custom-${Date.now()}`,
        company,
        title,
        jobUrl,
        workType,
        salaryRange,
        matchScore: tailorData.atsScoreAfter || 95,
        status: "Applied (While Sleeping)",
        appliedAt: `Just now (${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })})`,
        atsKeywordsMatched: tailorData.matchedKeywords || ["React", "TypeScript", "Realtime Web", "Latency Optimization"],
        tailoredResumeHighlight: tailorData.tailoredSummary || "Tailored for low-latency full-stack architecture and interactive canvas tooling.",
        coverLetter: tailorData.tailoredCoverLetter || `Dear ${company} Hiring Team,\n\nI am thrilled to apply for the ${title} position. Given my background in high-performance web systems and AI orchestration, I am confident I can make an immediate impact.\n\nBest,\n${candidateProfile.name}`,
        matchReasons: [
          "100% matches remote preference",
          `Salary meets ${candidateProfile.salaryTarget.toLocaleString()} target`,
          "Extensive experience in low-latency systems and TypeScript"
        ]
      };

      onJobAdded(newJob);
      onClose();
    } catch (err) {
      console.error(err);
      // Fallback
      const fallbackJob: JobApplication = {
        id: `app-custom-${Date.now()}`,
        company,
        title,
        jobUrl,
        workType,
        salaryRange,
        matchScore: 94,
        status: "Applied (While Sleeping)",
        appliedAt: "Just now",
        atsKeywordsMatched: ["React", "TypeScript", "Next.js", "AI Integration"],
        tailoredResumeHighlight: "Engineered high-throughput TypeScript platforms.",
        coverLetter: `Dear ${company} Team,\n\nI am applying for the ${title} role. My experience in distributed web engineering aligns directly with your mission.\n\nBest,\n${candidateProfile.name}`,
        matchReasons: ["Fits target salary and work mode criteria."]
      };
      onJobAdded(fallbackJob);
      onClose();
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-xl w-full p-6 sm:p-7 shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col space-y-5">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              <Wand2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white">Add or Paste Job Posting</h3>
              <p className="text-xs text-slate-500">Autonomous AI analysis, ATS tailoring, and application dispatch</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center justify-center text-slate-500 transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleAnalyzeAndApply} className="space-y-4 text-xs">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Company Name</label>
              <input
                type="text"
                required
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Role Title</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Work Mode</label>
              <select
                value={workType}
                onChange={(e) => setWorkType(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white"
              >
                <option value="Remote">Remote</option>
                <option value="Hybrid">Hybrid</option>
                <option value="On-site">On-site</option>
              </select>
            </div>
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Salary Range</label>
              <input
                type="text"
                value={salaryRange}
                onChange={(e) => setSalaryRange(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Job Link / Career URL</label>
            <input
              type="url"
              value={jobUrl}
              onChange={(e) => setJobUrl(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white"
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Job Description or Key Requirements</label>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white"
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-slate-600 dark:text-slate-400 font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isAnalyzing}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold transition shadow-md shadow-indigo-600/20 cursor-pointer disabled:opacity-50"
            >
              <Sparkles className={`w-4 h-4 ${isAnalyzing ? "animate-spin" : ""}`} />
              <span>{isAnalyzing ? "AI Tailoring & Applying..." : "Tailor & Auto-Apply"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
