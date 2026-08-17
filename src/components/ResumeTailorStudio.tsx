import React, { useState } from "react";
import {
  Award,
  BookOpen,
  BrainCircuit,
  Building2,
  CheckCircle2,
  Copy,
  Download,
  FileCheck,
  FileText,
  HelpCircle,
  Layers,
  Printer,
  RefreshCw,
  Sparkles,
  TrendingUp,
  Wand2,
  Zap
} from "lucide-react";
import { CandidateProfile } from "../types";

interface ResumeTailorStudioProps {
  candidateProfile: CandidateProfile;
  setCandidateProfile: React.Dispatch<React.SetStateAction<CandidateProfile>>;
}

export const ResumeTailorStudio: React.FC<ResumeTailorStudioProps> = ({
  candidateProfile,
  setCandidateProfile
}) => {
  const [activeSubTab, setActiveSubTab] = useState<"tailor" | "master">("tailor");

  // JD Tailor form state
  const [targetCompany, setTargetCompany] = useState("Linear");
  const [targetRole, setTargetRole] = useState("Staff Product Engineer - Realtime & Collaboration");
  const [targetJD, setTargetJD] = useState(
    `We are looking for a Staff Product Engineer to join our Realtime & Collaboration team.
Requirements:
- 5+ years building reactive, high-performance web applications in TypeScript and React.
- Deep expertise in local-first architecture, WebSockets, and state synchronization.
- Obsessive attention to UI/UX performance, micro-interactions, and 60fps animations.
- Experience with low-latency API architectures, distributed caching (Redis), and PostgreSQL.
- Passion for developer tools and high autonomy in an async startup environment.`
  );

  const [isTailoring, setIsTailoring] = useState(false);
  const [tailorResult, setTailorResult] = useState<any>(null);
  const [copiedCoverLetter, setCopiedCoverLetter] = useState(false);

  const handleRunTailor = async () => {
    setIsTailoring(true);
    try {
      const res = await fetch("/api/resume/tailor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jobTitle: targetRole,
          company: targetCompany,
          jobDescription: targetJD,
          currentResume: candidateProfile
        })
      });

      const data = await res.json();
      if (data.success && data.data) {
        setTailorResult(data.data);
      }
    } catch (e) {
      console.error("Failed to tailor resume:", e);
    } finally {
      setIsTailoring(false);
    }
  };

  const handleCopyCoverLetter = () => {
    if (tailorResult?.tailoredCoverLetter) {
      navigator.clipboard.writeText(tailorResult.tailoredCoverLetter);
      setCopiedCoverLetter(true);
      setTimeout(() => setCopiedCoverLetter(false), 2500);
    }
  };

  const handlePrintResume = () => {
    window.print();
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white dark:bg-slate-800/90 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xs">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <BrainCircuit className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            Resume & ATS Live Tailoring Engine
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Real-time JD keyword injection, metric-driven bullet rewriting, and executive cover letters
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveSubTab("tailor")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeSubTab === "tailor"
                ? "bg-indigo-600 text-white shadow-xs"
                : "bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200"
            }`}
          >
            ATS Tailor Playground
          </button>
          <button
            onClick={() => setActiveSubTab("master")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeSubTab === "master"
                ? "bg-indigo-600 text-white shadow-xs"
                : "bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200"
            }`}
          >
            Master Resume Profile
          </button>
        </div>
      </div>

      {activeSubTab === "tailor" ? (
        /* ATS Tailor Playground */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column (5 cols): Target JD Input */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white dark:bg-slate-800/90 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 shadow-xs space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-950 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                  <Wand2 className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white">Target Job Description</h3>
                  <p className="text-xs text-slate-500">Paste any job posting for instant ATS optimization</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400 block mb-1">Company</label>
                  <input
                    type="text"
                    value={targetCompany}
                    onChange={(e) => setTargetCompany(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400 block mb-1">Role Title</label>
                  <input
                    type="text"
                    value={targetRole}
                    onChange={(e) => setTargetRole(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400 block mb-1">Job Description Requirements</label>
                <textarea
                  value={targetJD}
                  onChange={(e) => setTargetJD(e.target.value)}
                  rows={9}
                  className="w-full text-xs p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-hidden font-mono leading-relaxed"
                />
              </div>

              <button
                onClick={handleRunTailor}
                disabled={isTailoring}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-xs bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-md shadow-indigo-500/20 transition cursor-pointer disabled:opacity-60"
              >
                <Sparkles className={`w-4 h-4 ${isTailoring ? "animate-spin" : ""}`} />
                <span>{isTailoring ? "AI Tailoring Resume & Cover Letter..." : "Execute ATS Optimization & Bullet Rewrite"}</span>
              </button>
            </div>
          </div>

          {/* Right Column (7 cols): Optimization Results */}
          <div className="lg:col-span-7 space-y-4">
            {tailorResult ? (
              <div className="space-y-4">
                {/* ATS Score Improvement Banner */}
                <div className="bg-white dark:bg-slate-800/90 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 shadow-xs flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">ATS Match Algorithm</span>
                    <h3 className="font-extrabold text-base text-slate-900 dark:text-white">Optimization Success</h3>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <span className="text-xs text-slate-400 block">Original</span>
                      <span className="text-lg font-bold text-slate-500">{tailorResult.atsScoreBefore}%</span>
                    </div>

                    <TrendingUp className="w-5 h-5 text-emerald-500" />

                    <div className="text-center bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1 rounded-xl border border-emerald-200 dark:border-emerald-800">
                      <span className="text-xs text-emerald-600 dark:text-emerald-400 font-bold block">Optimized</span>
                      <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400">{tailorResult.atsScoreAfter}%</span>
                    </div>
                  </div>
                </div>

                {/* Keyword Match Badges */}
                <div className="bg-white dark:bg-slate-800/90 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 shadow-xs space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">ATS Keyword Alignment</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {tailorResult.matchedKeywords?.map((kw: string, i: number) => (
                      <span
                        key={i}
                        className="text-xs px-2.5 py-1 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-semibold border border-emerald-200 dark:border-emerald-800 flex items-center gap-1"
                      >
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        {kw}
                      </span>
                    ))}
                    {tailorResult.missingKeywordsResolved?.map((kw: string, i: number) => (
                      <span
                        key={i}
                        className="text-xs px-2.5 py-1 rounded-lg bg-indigo-100 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-300 font-semibold border border-indigo-200 dark:border-indigo-800 flex items-center gap-1"
                      >
                        <Sparkles className="w-3 h-3 text-indigo-600" />
                        + Injected: {kw}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Rewritten Bullet Points */}
                <div className="bg-white dark:bg-slate-800/90 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 shadow-xs space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                    <FileCheck className="w-4 h-4 text-indigo-500" />
                    Metric-Optimized Experience Bullets
                  </h4>

                  <div className="space-y-3">
                    {tailorResult.tailoredExperienceBullets?.map((bullet: any, idx: number) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-2 text-xs"
                      >
                        <div className="text-slate-400 line-through">
                          <span className="font-bold text-[10px] uppercase text-slate-400">Original: </span>
                          {bullet.original}
                        </div>

                        <div className="text-slate-900 dark:text-white font-medium bg-emerald-50/50 dark:bg-emerald-950/30 p-2.5 rounded-lg border border-emerald-200/50 dark:border-emerald-800/50">
                          <span className="font-bold text-[10px] uppercase text-emerald-600 dark:text-emerald-400 block mb-0.5">
                            Tailored Bullet:
                          </span>
                          {bullet.optimized}
                        </div>

                        <div className="text-[11px] text-indigo-600 dark:text-indigo-400">
                          <span className="font-semibold">Why this works: </span>
                          {bullet.impactExplanation}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tailored Cover Letter */}
                <div className="bg-white dark:bg-slate-800/90 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                      <FileText className="w-4 h-4 text-indigo-500" />
                      Executive Cover Letter
                    </h4>

                    <button
                      onClick={handleCopyCoverLetter}
                      className="inline-flex items-center gap-1 text-xs text-indigo-600 dark:text-indigo-400 font-semibold hover:underline"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>{copiedCoverLetter ? "Copied to clipboard!" : "Copy Text"}</span>
                    </button>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 text-xs text-slate-800 dark:text-slate-200 whitespace-pre-line leading-relaxed border border-slate-200 dark:border-slate-800 font-sans">
                    {tailorResult.tailoredCoverLetter}
                  </div>
                </div>

                {/* Interview Talking Points */}
                {tailorResult.interviewTalkingPoints && (
                  <div className="bg-amber-50 dark:bg-amber-950/40 rounded-2xl p-5 border border-amber-200 dark:border-amber-800/60 shadow-xs space-y-2 text-xs text-amber-900 dark:text-amber-200">
                    <h4 className="font-bold uppercase tracking-wider text-[11px] text-amber-800 dark:text-amber-300 flex items-center gap-1.5">
                      <HelpCircle className="w-4 h-4 text-amber-600" />
                      Anticipated Interview Screen Questions
                    </h4>
                    <div className="space-y-1">
                      {tailorResult.interviewTalkingPoints.map((pt: string, idx: number) => (
                        <div key={idx} className="flex items-start gap-1.5">
                          <span>•</span>
                          <span>{pt}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* Default Empty State */
              <div className="bg-white dark:bg-slate-800/90 rounded-2xl p-12 border border-slate-200 dark:border-slate-700 shadow-xs flex flex-col items-center justify-center text-center space-y-3">
                <div className="w-16 h-16 rounded-2xl bg-indigo-50 dark:bg-indigo-950 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                  <BrainCircuit className="w-8 h-8" />
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white text-base">
                  Ready to optimize against any Job Description
                </h3>
                <p className="text-xs text-slate-500 max-w-md">
                  Click <strong>"Execute ATS Optimization"</strong> on the left. The Gemini agent will identify keywords, restructure bullet points to spotlight quantified outcomes, and boost your ATS score to 95%+.
                </p>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Master Resume Profile View */
        <div className="bg-white dark:bg-slate-800/90 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700 shadow-xs space-y-6 max-w-4xl mx-auto">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-700">
            <div>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white">{candidateProfile.name}</h3>
              <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">{candidateProfile.title}</p>
              <div className="flex flex-wrap gap-3 text-xs text-slate-500 dark:text-slate-400 mt-1">
                <span>{candidateProfile.email}</span>
                <span>•</span>
                <span>{candidateProfile.phone}</span>
                <span>•</span>
                <span>{candidateProfile.location}</span>
              </div>
            </div>

            <button
              onClick={handlePrintResume}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-600 transition cursor-pointer"
            >
              <Printer className="w-4 h-4 text-indigo-500" />
              <span>Print / Export Clean PDF</span>
            </button>
          </div>

          {/* Executive Bio */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Professional Summary</h4>
            <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed bg-slate-50 dark:bg-slate-900/50 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800">
              {candidateProfile.bio}
            </p>
          </div>

          {/* Skills Grid */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Core Technical Competencies</h4>
            <div className="flex flex-wrap gap-1.5">
              {candidateProfile.skills.map((skill, i) => (
                <span
                  key={i}
                  className="text-xs px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-800 dark:text-indigo-300 font-semibold border border-indigo-200 dark:border-indigo-800"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Work Experience */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Professional Experience</h4>
            {candidateProfile.workExperience.map((exp) => (
              <div key={exp.id} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-1">
                  <span className="font-bold text-sm text-slate-900 dark:text-white">{exp.role}</span>
                  <span className="text-xs text-slate-500">{exp.period}</span>
                </div>
                <div className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                  {exp.company} • {exp.location}
                </div>
                <ul className="list-disc list-inside text-xs text-slate-700 dark:text-slate-300 space-y-1 pl-1">
                  {exp.bullets.map((bullet, idx) => (
                    <li key={idx}>{bullet}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Featured Projects */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Featured AI & Distributed Projects</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {candidateProfile.featuredProjects.map((proj, i) => (
                <div key={i} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 space-y-2 text-xs">
                  <div className="font-bold text-slate-900 dark:text-white text-sm">{proj.name}</div>
                  <p className="text-slate-600 dark:text-slate-300">{proj.description}</p>
                  <div className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400">{proj.metrics}</div>
                  <div className="flex flex-wrap gap-1 pt-1">
                    {proj.tech.map((t, idx) => (
                      <span key={idx} className="text-[9px] px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
