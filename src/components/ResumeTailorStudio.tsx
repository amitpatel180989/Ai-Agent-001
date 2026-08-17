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
  UploadCloud,
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
  const [activeSubTab, setActiveSubTab] = useState<"tailor" | "upload_master">("tailor");

  // Resume Upload & Extraction state
  const [rawResumeInput, setRawResumeInput] = useState("");
  const [isParsingResume, setIsParsingResume] = useState(false);
  const [parseMessage, setParseMessage] = useState("");

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

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      const content = event.target?.result as string;
      if (content) {
        setRawResumeInput(content);
        await runResumeParser(content, file.name);
      }
    };
    reader.readAsText(file);
  };

  const runResumeParser = async (rawText: string, fileName?: string) => {
    if (!rawText || rawText.trim().length < 20) {
      setParseMessage("⚠️ Please provide at least a few lines of resume text.");
      return;
    }

    setIsParsingResume(true);
    setParseMessage("Extracting skills, experience bullets, and credentials with AI...");

    try {
      const res = await fetch("/api/resume/parse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rawText, fileName: fileName || "Uploaded_Resume.pdf" })
      });

      const data = await res.json();
      if (data.success && data.data) {
        const parsed = data.data;
        const updated: CandidateProfile = {
          ...candidateProfile,
          name: parsed.name || candidateProfile.name,
          title: parsed.title || candidateProfile.title,
          email: parsed.email || candidateProfile.email,
          phone: parsed.phone || candidateProfile.phone,
          location: parsed.location || candidateProfile.location,
          bio: parsed.bio || candidateProfile.bio,
          skills: parsed.skills && parsed.skills.length ? parsed.skills : candidateProfile.skills,
          targetRoles: parsed.targetRoles && parsed.targetRoles.length ? parsed.targetRoles : candidateProfile.targetRoles,
          workExperience: parsed.workExperience && parsed.workExperience.length ? parsed.workExperience : candidateProfile.workExperience,
          featuredProjects: parsed.featuredProjects && parsed.featuredProjects.length ? parsed.featuredProjects : candidateProfile.featuredProjects,
          resumePdfName: fileName || parsed.resumePdfName || "Candidate_Resume.pdf"
        };
        setCandidateProfile(updated);
        setParseMessage(`✓ Successfully loaded resume! Extracted ${parsed.skills?.length || 0} skills & past roles.`);
      }
    } catch (e) {
      console.error("Resume parse error", e);
      setParseMessage("⚠️ Parsed with standard fallback. Check profile fields below.");
    } finally {
      setIsParsingResume(false);
      setTimeout(() => setParseMessage(""), 5000);
    }
  };

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
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <BrainCircuit className="w-5 h-5 text-indigo-600" />
            Resume & ATS Live Tailoring Engine
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Upload your real resume, optimize against target JDs, and generate metric-driven bullet points & cover letters
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveSubTab("tailor")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
              activeSubTab === "tailor"
                ? "bg-indigo-600 text-white shadow-xs"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            ATS Tailor Playground
          </button>
          <button
            onClick={() => setActiveSubTab("upload_master")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
              activeSubTab === "upload_master"
                ? "bg-indigo-600 text-white shadow-xs"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            Upload & Master Profile
          </button>
        </div>
      </div>

      {activeSubTab === "tailor" ? (
        /* ATS Tailor Playground */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column (5 cols): Target JD Input */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
                    <Wand2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-slate-900">Target Job Description</h3>
                    <p className="text-xs text-slate-500">Paste any job posting for instant ATS optimization</p>
                  </div>
                </div>

                <span className="text-[11px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                  Using: {candidateProfile.name}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-slate-600 block mb-1">Company</label>
                  <input
                    type="text"
                    value={targetCompany}
                    onChange={(e) => setTargetCompany(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-300 bg-slate-50 text-slate-900"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-600 block mb-1">Role Title</label>
                  <input
                    type="text"
                    value={targetRole}
                    onChange={(e) => setTargetRole(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-300 bg-slate-50 text-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-600 block mb-1">Job Description Requirements</label>
                <textarea
                  value={targetJD}
                  onChange={(e) => setTargetJD(e.target.value)}
                  rows={9}
                  className="w-full text-xs p-3 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 focus:outline-hidden font-mono leading-relaxed"
                />
              </div>

              <button
                onClick={handleRunTailor}
                disabled={isTailoring}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-xs bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-600/20 transition cursor-pointer disabled:opacity-60"
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
                <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">ATS Match Algorithm</span>
                    <h3 className="font-extrabold text-base text-slate-900">Optimization Success</h3>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <span className="text-xs text-slate-400 block">Original</span>
                      <span className="text-lg font-bold text-slate-500">{tailorResult.atsScoreBefore}%</span>
                    </div>

                    <TrendingUp className="w-5 h-5 text-emerald-500" />

                    <div className="text-center bg-emerald-50 px-3 py-1 rounded-xl border border-emerald-200">
                      <span className="text-xs text-emerald-600 font-bold block">Optimized</span>
                      <span className="text-2xl font-black text-emerald-600">{tailorResult.atsScoreAfter}%</span>
                    </div>
                  </div>
                </div>

                {/* Keyword Match Badges */}
                <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">ATS Keyword Alignment</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {tailorResult.matchedKeywords?.map((kw: string, i: number) => (
                      <span
                        key={i}
                        className="text-xs px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-800 font-semibold border border-emerald-200 flex items-center gap-1"
                      >
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        {kw}
                      </span>
                    ))}
                    {tailorResult.missingKeywordsResolved?.map((kw: string, i: number) => (
                      <span
                        key={i}
                        className="text-xs px-2.5 py-1 rounded-lg bg-indigo-100 text-indigo-800 font-semibold border border-indigo-200 flex items-center gap-1"
                      >
                        <Sparkles className="w-3 h-3 text-indigo-600" />
                        + Injected: {kw}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Rewritten Bullet Points */}
                <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                    <FileCheck className="w-4 h-4 text-indigo-500" />
                    Metric-Optimized Experience Bullets
                  </h4>

                  <div className="space-y-3">
                    {tailorResult.tailoredExperienceBullets?.map((bullet: any, idx: number) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs"
                      >
                        <div className="text-slate-400 line-through">
                          <span className="font-bold text-[10px] uppercase text-slate-400">Original: </span>
                          {bullet.original}
                        </div>

                        <div className="text-slate-900 font-medium bg-emerald-50/70 p-2.5 rounded-lg border border-emerald-200">
                          <span className="font-bold text-[10px] uppercase text-emerald-600 block mb-0.5">
                            Tailored Bullet:
                          </span>
                          {bullet.optimized}
                        </div>

                        <div className="text-[11px] text-indigo-600 font-medium">
                          <span className="font-semibold">Why this works: </span>
                          {bullet.impactExplanation}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tailored Cover Letter */}
                <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                      <FileText className="w-4 h-4 text-indigo-500" />
                      Executive Cover Letter
                    </h4>

                    <button
                      onClick={handleCopyCoverLetter}
                      className="inline-flex items-center gap-1 text-xs text-indigo-600 font-semibold hover:underline cursor-pointer"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>{copiedCoverLetter ? "Copied to clipboard!" : "Copy Text"}</span>
                    </button>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 text-xs text-slate-800 whitespace-pre-line leading-relaxed border border-slate-200 font-sans">
                    {tailorResult.tailoredCoverLetter}
                  </div>
                </div>

                {/* Interview Talking Points */}
                {tailorResult.interviewTalkingPoints && (
                  <div className="bg-amber-50 rounded-2xl p-5 border border-amber-200 shadow-xs space-y-2 text-xs text-amber-900">
                    <h4 className="font-bold uppercase tracking-wider text-[11px] text-amber-800 flex items-center gap-1.5">
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
              <div className="bg-white rounded-2xl p-12 border border-slate-200 shadow-xs flex flex-col items-center justify-center text-center space-y-3">
                <div className="w-16 h-16 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                  <BrainCircuit className="w-8 h-8" />
                </div>
                <h3 className="font-bold text-slate-900 text-base">
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
        /* Master Resume Profile View + Instant Upload Dropzone */
        <div className="space-y-6 max-w-4xl mx-auto">
          {/* Quick Resume Upload Bar */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
              <UploadCloud className="w-5 h-5 text-indigo-600" />
              <h3 className="font-bold text-sm text-slate-900">Upload Current Resume to Replace Master Profile</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border-2 border-dashed border-slate-300 hover:border-indigo-500 rounded-xl p-5 flex flex-col items-center justify-center text-center transition bg-slate-50/50 cursor-pointer relative">
                <input
                  type="file"
                  accept=".pdf,.docx,.txt,.json,.md"
                  onChange={handleFileUpload}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                />
                <UploadCloud className="w-8 h-8 text-indigo-600 mb-2" />
                <span className="text-xs font-bold text-slate-800">Upload PDF / DOCX Resume</span>
                <span className="text-[10px] text-slate-500 mt-0.5">Click or drag & drop</span>
              </div>

              <div className="space-y-2">
                <textarea
                  placeholder="Or paste resume text here..."
                  value={rawResumeInput}
                  onChange={(e) => setRawResumeInput(e.target.value)}
                  rows={3}
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-300 bg-slate-50 text-slate-900 font-mono"
                />
                <button
                  type="button"
                  onClick={() => runResumeParser(rawResumeInput)}
                  disabled={isParsingResume || !rawResumeInput.trim()}
                  className="w-full py-2 px-3 rounded-lg text-xs font-bold bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white cursor-pointer"
                >
                  {isParsingResume ? "Extracting..." : "Parse & Update Master Profile"}
                </button>
              </div>
            </div>

            {parseMessage && (
              <div className="p-3 rounded-xl bg-indigo-50 text-indigo-900 border border-indigo-200 text-xs font-semibold">
                {parseMessage}
              </div>
            )}
          </div>

          {/* Master Profile Preview Card */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200">
              <div>
                <h3 className="text-2xl font-black text-slate-900">{candidateProfile.name}</h3>
                <p className="text-sm font-semibold text-indigo-600">{candidateProfile.title}</p>
                <div className="flex flex-wrap gap-3 text-xs text-slate-500 mt-1">
                  <span>{candidateProfile.email}</span>
                  <span>•</span>
                  <span>{candidateProfile.phone}</span>
                  <span>•</span>
                  <span>{candidateProfile.location}</span>
                </div>
              </div>

              <button
                onClick={handlePrintResume}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 transition cursor-pointer"
              >
                <Printer className="w-4 h-4 text-indigo-500" />
                <span>Print / Export Clean PDF</span>
              </button>
            </div>

            {/* Executive Bio */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Professional Summary</h4>
              <p className="text-xs sm:text-sm text-slate-800 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                {candidateProfile.bio}
              </p>
            </div>

            {/* Skills Grid */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Core Technical Competencies</h4>
              <div className="flex flex-wrap gap-1.5">
                {candidateProfile.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="text-xs px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-800 font-semibold border border-indigo-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Work Experience */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Professional Experience</h4>
              {candidateProfile.workExperience.map((exp) => (
                <div key={exp.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-1">
                    <span className="font-bold text-sm text-slate-900">{exp.role}</span>
                    <span className="text-xs text-slate-500">{exp.period}</span>
                  </div>
                  <div className="text-xs font-semibold text-indigo-600">
                    {exp.company} • {exp.location}
                  </div>
                  <ul className="list-disc list-inside text-xs text-slate-700 space-y-1 pl-1">
                    {exp.bullets.map((bullet, idx) => (
                      <li key={idx}>{bullet}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Featured Projects */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Featured AI & Distributed Projects</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {candidateProfile.featuredProjects.map((proj, i) => (
                  <div key={i} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                    <div className="font-bold text-slate-900 text-sm">{proj.name}</div>
                    <p className="text-slate-600">{proj.description}</p>
                    <div className="text-[11px] font-bold text-emerald-600">{proj.metrics}</div>
                    <div className="flex flex-wrap gap-1 pt-1">
                      {proj.tech.map((t, idx) => (
                        <span key={idx} className="text-[9px] px-1.5 py-0.5 rounded bg-slate-200 text-slate-700">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
