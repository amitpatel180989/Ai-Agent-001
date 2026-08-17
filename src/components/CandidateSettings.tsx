import React, { useState } from "react";
import {
  Ban,
  Bot,
  Check,
  DollarSign,
  Moon,
  Plus,
  Save,
  ShieldCheck,
  Sliders,
  Trash2,
  User,
  Zap
} from "lucide-react";
import { AgentSettings, CandidateProfile } from "../types";
import { formatCurrency } from "../utils";

interface CandidateSettingsProps {
  candidateProfile: CandidateProfile;
  setCandidateProfile: React.Dispatch<React.SetStateAction<CandidateProfile>>;
  settings: AgentSettings;
  setSettings: React.Dispatch<React.SetStateAction<AgentSettings>>;
}

export const CandidateSettings: React.FC<CandidateSettingsProps> = ({
  candidateProfile,
  setCandidateProfile,
  settings,
  setSettings
}) => {
  const [profileForm, setProfileForm] = useState<CandidateProfile>(candidateProfile);
  const [settingsForm, setSettingsForm] = useState<AgentSettings>(settings);
  const [newSkill, setNewSkill] = useState("");
  const [newBlacklist, setNewBlacklist] = useState("");
  const [saveStatus, setSaveStatus] = useState("");

  const handleSaveAll = (e: React.FormEvent) => {
    e.preventDefault();
    setCandidateProfile(profileForm);
    setSettings(settingsForm);
    setSaveStatus("✓ All candidate settings & 24/7 agent guardrails saved successfully!");
    setTimeout(() => setSaveStatus(""), 3500);
  };

  const handleAddSkill = () => {
    if (newSkill.trim() && !profileForm.skills.includes(newSkill.trim())) {
      setProfileForm({
        ...profileForm,
        skills: [...profileForm.skills, newSkill.trim()]
      });
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setProfileForm({
      ...profileForm,
      skills: profileForm.skills.filter((s) => s !== skillToRemove)
    });
  };

  const handleAddBlacklist = () => {
    if (newBlacklist.trim() && !profileForm.blacklistCompanies.includes(newBlacklist.trim())) {
      setProfileForm({
        ...profileForm,
        blacklistCompanies: [...profileForm.blacklistCompanies, newBlacklist.trim()]
      });
      setNewBlacklist("");
    }
  };

  const handleRemoveBlacklist = (comp: string) => {
    setProfileForm({
      ...profileForm,
      blacklistCompanies: profileForm.blacklistCompanies.filter((c) => c !== comp)
    });
  };

  return (
    <form onSubmit={handleSaveAll} className="space-y-6 pb-12 max-w-5xl mx-auto">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white dark:bg-slate-800/90 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xs">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            Agent Guardrails & Candidate Profile Configuration
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Configure compensation boundaries, blacklisted companies, night schedules, and agent tone of voice
          </p>
        </div>

        <button
          type="submit"
          className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-600/20 transition cursor-pointer"
        >
          <Save className="w-4 h-4" />
          <span>Save Changes</span>
        </button>
      </div>

      {saveStatus && (
        <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-200 border border-emerald-200 dark:border-emerald-800 text-xs font-bold flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-600" />
          <span>{saveStatus}</span>
        </div>
      )}

      {/* Grid: 24/7 Agent Autonomous Guardrails & Candidate Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column: 24/7 Agent Autonomous Engine Settings */}
        <div className="bg-white dark:bg-slate-800/90 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-xs space-y-5">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-700">
            <div className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-950 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
              <Bot className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">24/7 Agent Behavior & Guardrails</h3>
              <p className="text-xs text-slate-500">Autonomous application engine parameters</p>
            </div>
          </div>

          {/* Toggle Autonomous Loop */}
          <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
            <div>
              <span className="font-bold text-xs text-slate-900 dark:text-white block">24/7 Autonomous Agent Loop</span>
              <span className="text-[11px] text-slate-500">Allows agent to scout, tailor, and apply continuously</span>
            </div>
            <input
              type="checkbox"
              checked={settingsForm.isAutonomousEnabled}
              onChange={(e) => setSettingsForm({ ...settingsForm, isAutonomousEnabled: e.target.checked })}
              className="w-5 h-5 rounded text-indigo-600 focus:ring-indigo-500 cursor-pointer"
            />
          </div>

          {/* Night Shift Sleep Hours */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <Moon className="w-4 h-4 text-purple-500" />
              <span>Night Shift (Sleep Mode) Schedule</span>
            </label>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <span className="text-[11px] text-slate-500 block mb-1">Starts (Candidate Sleep)</span>
                <input
                  type="time"
                  value={settingsForm.sleepScheduleStart}
                  onChange={(e) => setSettingsForm({ ...settingsForm, sleepScheduleStart: e.target.value })}
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white"
                />
              </div>
              <div>
                <span className="text-[11px] text-slate-500 block mb-1">Ends (Wakeup & Briefing)</span>
                <input
                  type="time"
                  value={settingsForm.sleepScheduleEnd}
                  onChange={(e) => setSettingsForm({ ...settingsForm, sleepScheduleEnd: e.target.value })}
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white"
                />
              </div>
            </div>
          </div>

          {/* Application Intensity */}
          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
              Application Intensity & Speed
            </label>
            <select
              value={settingsForm.speedIntensity}
              onChange={(e) => setSettingsForm({ ...settingsForm, speedIntensity: e.target.value as any })}
              className="w-full text-xs p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white"
            >
              <option value="Conservative (3-5/day)">Conservative (3-5 applications / day - High Precision)</option>
              <option value="Balanced (8-12/day)">Balanced (8-12 applications / day - Recommended)</option>
              <option value="Turbo (20-30/day)">Turbo (20-30 applications / day - Aggressive Blitz)</option>
            </select>
          </div>

          {/* Recruiter Auto-Reply Toggle */}
          <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
            <div>
              <span className="font-bold text-xs text-slate-900 dark:text-white block">Recruiter Auto-Responder</span>
              <span className="text-[11px] text-slate-500">Autonomous high-EQ replies & interview slot bookings</span>
            </div>
            <input
              type="checkbox"
              checked={settingsForm.autoReplyRecruiters}
              onChange={(e) => setSettingsForm({ ...settingsForm, autoReplyRecruiters: e.target.checked })}
              className="w-5 h-5 rounded text-indigo-600 focus:ring-indigo-500 cursor-pointer"
            />
          </div>

          {/* Agent Persona & Tone */}
          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
              Communication Persona & Tone of Voice
            </label>
            <select
              value={settingsForm.toneOfVoice}
              onChange={(e) => setSettingsForm({ ...settingsForm, toneOfVoice: e.target.value as any })}
              className="w-full text-xs p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white"
            >
              <option value="Assertive & High-EQ">Assertive & High-EQ (Executive Top Tier)</option>
              <option value="Warm & Technical">Warm & Technical (Staff Engineer Archetype)</option>
              <option value="Diplomatic Executive">Diplomatic Executive (Calm, Senior Negotiation)</option>
              <option value="Concise Professional">Concise Professional (Short, Punchy)</option>
            </select>
          </div>

          {/* Custom Agent Guardrail Rules */}
          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
              Custom Agent Directives & Guardrails
            </label>
            <textarea
              value={settingsForm.customInstructions}
              onChange={(e) => setSettingsForm({ ...settingsForm, customInstructions: e.target.value })}
              rows={4}
              className="w-full text-xs p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-hidden"
            />
          </div>
        </div>

        {/* Right Column: Candidate Profile & Criteria */}
        <div className="bg-white dark:bg-slate-800/90 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-xs space-y-5">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-700">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <User className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">Candidate Master Profile</h3>
              <p className="text-xs text-slate-500">Your core professional credentials</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400 block mb-1">Full Name</label>
              <input
                type="text"
                value={profileForm.name}
                onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                className="w-full text-xs p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400 block mb-1">Title</label>
              <input
                type="text"
                value={profileForm.title}
                onChange={(e) => setProfileForm({ ...profileForm, title: e.target.value })}
                className="w-full text-xs p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white"
              />
            </div>
          </div>

          {/* Salary Bounds */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400 block mb-1 flex items-center gap-1">
                <DollarSign className="w-3.5 h-3.5 text-emerald-500" />
                <span>Absolute Salary Floor ($/yr)</span>
              </label>
              <input
                type="number"
                value={profileForm.salaryFloor}
                onChange={(e) => setProfileForm({ ...profileForm, salaryFloor: Number(e.target.value) })}
                className="w-full text-xs p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400 block mb-1 flex items-center gap-1">
                <DollarSign className="w-3.5 h-3.5 text-emerald-500" />
                <span>Target Salary ($/yr)</span>
              </label>
              <input
                type="number"
                value={profileForm.salaryTarget}
                onChange={(e) => setProfileForm({ ...profileForm, salaryTarget: Number(e.target.value) })}
                className="w-full text-xs p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white"
              />
            </div>
          </div>

          {/* Work Mode */}
          <div>
            <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400 block mb-1">Work Preference</label>
            <select
              value={profileForm.workMode}
              onChange={(e) => setProfileForm({ ...profileForm, workMode: e.target.value as any })}
              className="w-full text-xs p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white"
            >
              <option value="Remote or Hybrid">Remote or Hybrid</option>
              <option value="Remote">100% Remote Only</option>
              <option value="Hybrid">Hybrid</option>
              <option value="On-site">On-site</option>
            </select>
          </div>

          {/* Core Skills Tag Editor */}
          <div>
            <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400 block mb-1">Skills & Keywords</label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                placeholder="Add skill (e.g. Next.js, WebSockets)..."
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddSkill();
                  }
                }}
                className="flex-1 text-xs p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white"
              />
              <button
                type="button"
                onClick={handleAddSkill}
                className="px-3 py-2 bg-indigo-600 text-white rounded-lg text-xs font-bold"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-1 max-h-28 overflow-y-auto p-2 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-slate-200 dark:border-slate-800">
              {profileForm.skills.map((s, idx) => (
                <span
                  key={idx}
                  className="text-xs px-2 py-0.5 rounded-md bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 flex items-center gap-1"
                >
                  {s}
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(s)}
                    className="text-slate-400 hover:text-rose-500 font-bold ml-1"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Blacklisted Companies */}
          <div>
            <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400 block mb-1 flex items-center gap-1">
              <Ban className="w-3.5 h-3.5 text-rose-500" />
              <span>Blacklisted Companies (Agent will never apply)</span>
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={newBlacklist}
                onChange={(e) => setNewBlacklist(e.target.value)}
                placeholder="Company name to blacklist..."
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddBlacklist();
                  }
                }}
                className="flex-1 text-xs p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white"
              />
              <button
                type="button"
                onClick={handleAddBlacklist}
                className="px-3 py-2 bg-rose-600 text-white rounded-lg text-xs font-bold"
              >
                Blacklist
              </button>
            </div>
            <div className="flex flex-wrap gap-1 p-2 bg-rose-50/50 dark:bg-rose-950/20 rounded-lg border border-rose-200/50 dark:border-rose-900/50">
              {profileForm.blacklistCompanies.map((c, idx) => (
                <span
                  key={idx}
                  className="text-xs px-2 py-0.5 rounded-md bg-white dark:bg-slate-800 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800 flex items-center gap-1"
                >
                  {c}
                  <button
                    type="button"
                    onClick={() => handleRemoveBlacklist(c)}
                    className="text-slate-400 hover:text-rose-500 font-bold ml-1"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};
