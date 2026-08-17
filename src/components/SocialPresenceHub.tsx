import React, { useState } from "react";
import {
  BarChart2,
  Calendar,
  CheckCircle2,
  Clock,
  ExternalLink,
  Eye,
  Github,
  Globe,
  Heart,
  Linkedin,
  MessageCircle,
  Plus,
  Radio,
  Repeat,
  Send,
  Share2,
  Sparkles,
  TrendingUp,
  Twitter,
  Zap
} from "lucide-react";
import { CandidateProfile, SocialPost } from "../types";

interface SocialPresenceHubProps {
  posts: SocialPost[];
  setPosts: React.Dispatch<React.SetStateAction<SocialPost[]>>;
  candidateProfile: CandidateProfile;
}

export const SocialPresenceHub: React.FC<SocialPresenceHubProps> = ({
  posts,
  setPosts,
  candidateProfile
}) => {
  const [activePlatformFilter, setActivePlatformFilter] = useState<string>("ALL");

  // Post generation modal/form state
  const [selectedPlatform, setSelectedPlatform] = useState<"LinkedIn" | "Twitter / X" | "GitHub" | "Substack">("LinkedIn");
  const [topicInput, setTopicInput] = useState("Architecting 24/7 autonomous background job runners with Gemini 3.7 & TypeScript");
  const [toneInput, setToneInput] = useState("Engaging, Technical, Insightful, and Humble");
  const [isGeneratingPost, setIsGeneratingPost] = useState(false);
  const [generatedDraft, setGeneratedDraft] = useState<any>(null);

  const filteredPosts = activePlatformFilter === "ALL"
    ? posts
    : posts.filter((p) => p.platform.toLowerCase().includes(activePlatformFilter.toLowerCase()));

  const handleGeneratePost = async () => {
    setIsGeneratingPost(true);
    try {
      const res = await fetch("/api/social/generate-post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          platform: selectedPlatform,
          topic: topicInput,
          tone: toneInput,
          recentProject: candidateProfile.featuredProjects[0]?.name || "AgentFlow Autonomous Engine"
        })
      });

      const data = await res.json();
      if (data.success && data.data) {
        setGeneratedDraft(data.data);
      }
    } catch (e) {
      console.error("Failed to generate social post", e);
    } finally {
      setIsGeneratingPost(false);
    }
  };

  const handlePublishOrSchedule = (status: "Published" | "Scheduled") => {
    if (!generatedDraft) return;

    const newPost: SocialPost = {
      id: `post-${Date.now()}`,
      platform: selectedPlatform,
      title: topicInput,
      content: generatedDraft.postContent,
      status: status,
      scheduledTime: status === "Published" ? "Just now" : generatedDraft.optimalPostingTime || "Tomorrow at 08:30 AM EST",
      estimatedReach: generatedDraft.estimatedReach || "2,500+ impressions",
      recruiterVisibilityScore: generatedDraft.recruiterVisibilityScore || 95,
      engagementStats: status === "Published" ? { likes: 1, shares: 0, comments: 0, recruiterViews: 4 } : undefined,
      tags: ["SoftwareEngineering", "AI", "TypeScript"]
    };

    setPosts([newPost, ...posts]);
    setGeneratedDraft(null);
  };

  const getPlatformIcon = (platform: string) => {
    if (platform.includes("LinkedIn")) return <Linkedin className="w-4 h-4 text-blue-600" />;
    if (platform.includes("Twitter") || platform.includes("X")) return <Twitter className="w-4 h-4 text-sky-500" />;
    if (platform.includes("GitHub")) return <Github className="w-4 h-4 text-slate-800 dark:text-white" />;
    return <Globe className="w-4 h-4 text-orange-500" />;
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white dark:bg-slate-800/90 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xs">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            Omni-Channel Professional Social Presence Autopilot
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Publishes technical thought leadership across LinkedIn, X & GitHub to keep you top-of-mind for executive tech recruiters 24/7
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
            <Radio className="w-3.5 h-3.5 text-blue-600 animate-pulse" />
            Recruiter Feed Inbound Booster Active
          </span>
        </div>
      </div>

      {/* Recruiter Impact Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-slate-800/90 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950 flex items-center justify-center text-blue-600">
            <Eye className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs text-slate-500 font-medium">Recruiter Profile Views</span>
            <div className="text-xl font-extrabold text-slate-900 dark:text-white">193 this week (+42%)</div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800/90 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-950 flex items-center justify-center text-purple-600">
            <BarChart2 className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs text-slate-500 font-medium">Total Monthly Reach</span>
            <div className="text-xl font-extrabold text-purple-600 dark:text-purple-400">18.4k Impressions</div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800/90 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center text-emerald-600">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs text-slate-500 font-medium">Inbound Recruiter InMails</span>
            <div className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400">4 Direct InMails / wk</div>
          </div>
        </div>
      </div>

      {/* Main Grid: AI Content Studio + Scheduled Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: AI Post Generator Studio (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white dark:bg-slate-800/90 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 shadow-xs space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-950 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">AI Thought Leadership Generator</h3>
                <p className="text-xs text-slate-500">Draft high-engagement insights tailored to your engineering skills</p>
              </div>
            </div>

            {/* Platform Selector */}
            <div>
              <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400 block mb-1">Target Network</label>
              <div className="grid grid-cols-2 gap-2">
                {(["LinkedIn", "Twitter / X", "GitHub", "Substack"] as const).map((p) => (
                  <button
                    key={p}
                    onClick={() => setSelectedPlatform(p)}
                    className={`flex items-center justify-center gap-2 p-2.5 rounded-xl text-xs font-semibold border transition cursor-pointer ${
                      selectedPlatform === p
                        ? "bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border-indigo-400 dark:border-indigo-600"
                        : "bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700"
                    }`}
                  >
                    {getPlatformIcon(p)}
                    <span>{p}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Topic Input */}
            <div>
              <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400 block mb-1">Topic or Architectural Focus</label>
              <textarea
                value={topicInput}
                onChange={(e) => setTopicInput(e.target.value)}
                rows={3}
                className="w-full text-xs p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-hidden"
              />
            </div>

            {/* Tone Selector */}
            <div>
              <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400 block mb-1">Tone & Persona</label>
              <select
                value={toneInput}
                onChange={(e) => setToneInput(e.target.value)}
                className="w-full text-xs p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-200"
              >
                <option value="Engaging, Technical, Insightful, and Humble">Technical & Grounded System Designer</option>
                <option value="High-Impact Visionary Architect">Executive AI Thought Leader</option>
                <option value="Concise, Punchy, & Actionable">Concise Developer Tips (Thread Style)</option>
                <option value="Deep-Dive Open Source Release">Open Source Builder & Maintainer</option>
              </select>
            </div>

            <button
              onClick={handleGeneratePost}
              disabled={isGeneratingPost}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-xs bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-600/20 transition cursor-pointer disabled:opacity-50"
            >
              <Sparkles className={`w-4 h-4 ${isGeneratingPost ? "animate-spin" : ""}`} />
              <span>{isGeneratingPost ? "Synthesizing Thought Leadership Post..." : "Generate AI Social Post"}</span>
            </button>

            {/* Preview of Generated Draft */}
            {generatedDraft && (
              <div className="mt-4 p-4 rounded-xl bg-indigo-50/80 dark:bg-indigo-950/70 border border-indigo-200 dark:border-indigo-800 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-indigo-700 dark:text-indigo-300 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" /> Generated {selectedPlatform} Post
                  </span>
                  <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950 px-2 py-0.5 rounded-full">
                    Score: {generatedDraft.recruiterVisibilityScore}% Recruiter Visibility
                  </span>
                </div>

                <div className="text-xs text-slate-800 dark:text-slate-200 whitespace-pre-line bg-white dark:bg-slate-900 p-3 rounded-lg border border-indigo-100 dark:border-indigo-900 font-sans leading-relaxed">
                  {generatedDraft.postContent}
                </div>

                <div className="text-[11px] text-slate-500 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-indigo-500" />
                  <span>Optimal posting window: {generatedDraft.optimalPostingTime}</span>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <button
                    onClick={() => handlePublishOrSchedule("Scheduled")}
                    className="flex-1 py-2 px-3 rounded-lg text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white transition cursor-pointer"
                  >
                    Schedule for 08:30 AM EST
                  </button>
                  <button
                    onClick={() => handlePublishOrSchedule("Published")}
                    className="py-2 px-3 rounded-lg text-xs font-semibold bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 text-slate-800 dark:text-slate-200 transition cursor-pointer"
                  >
                    Publish Now
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Published & Scheduled Queue (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white dark:bg-slate-800/90 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 shadow-xs space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-700">
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-slate-900 dark:text-white">Active Social Feed Queue</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold">
                  {filteredPosts.length}
                </span>
              </div>

              {/* Filter Tabs */}
              <div className="flex gap-1">
                {["ALL", "LinkedIn", "Twitter", "GitHub"].map((p) => (
                  <button
                    key={p}
                    onClick={() => setActivePlatformFilter(p)}
                    className={`text-[10px] px-2.5 py-1 rounded-md font-semibold transition ${
                      activePlatformFilter === p
                        ? "bg-indigo-600 text-white"
                        : "bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300"
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            {/* Post cards */}
            <div className="space-y-3">
              {filteredPosts.map((post) => (
                <div
                  key={post.id}
                  className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                        {getPlatformIcon(post.platform)}
                      </div>
                      <span className="font-bold text-xs text-slate-900 dark:text-white">{post.platform}</span>
                      <span className="text-slate-400 text-xs">•</span>
                      <span className="text-[11px] text-slate-500">{post.scheduledTime}</span>
                    </div>

                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        post.status === "Published"
                          ? "bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300"
                          : "bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300"
                      }`}
                    >
                      {post.status}
                    </span>
                  </div>

                  <p className="text-xs text-slate-800 dark:text-slate-200 whitespace-pre-line leading-relaxed">
                    {post.content}
                  </p>

                  {/* Engagement bar */}
                  {post.engagementStats && (
                    <div className="flex items-center gap-4 pt-2 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <Heart className="w-3.5 h-3.5 text-rose-500" />
                        {post.engagementStats.likes} Likes
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageCircle className="w-3.5 h-3.5 text-sky-500" />
                        {post.engagementStats.comments} Comments
                      </span>
                      <span className="flex items-center gap-1">
                        <Share2 className="w-3.5 h-3.5 text-indigo-500" />
                        {post.engagementStats.shares} Shares
                      </span>
                      <span className="flex items-center gap-1 ml-auto text-emerald-600 dark:text-emerald-400 font-bold">
                        <Eye className="w-3.5 h-3.5" />
                        {post.engagementStats.recruiterViews} Recruiter Views
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
