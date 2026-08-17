import React, { useState } from "react";
import {
  Bot,
  Calendar,
  Check,
  CheckCircle2,
  Clock,
  ExternalLink,
  MessageSquare,
  Paperclip,
  RefreshCw,
  Send,
  ShieldAlert,
  Sparkles,
  User,
  Zap
} from "lucide-react";
import { AgentSettings, CandidateProfile, ChatMessage, RecruiterThread } from "../types";

interface RecruiterInboxProps {
  threads: RecruiterThread[];
  setThreads: React.Dispatch<React.SetStateAction<RecruiterThread[]>>;
  candidateProfile: CandidateProfile;
  settings: AgentSettings;
  activeThreadId: string | null;
  setActiveThreadId: (id: string) => void;
}

export const RecruiterInbox: React.FC<RecruiterInboxProps> = ({
  threads,
  setThreads,
  candidateProfile,
  settings,
  activeThreadId,
  setActiveThreadId
}) => {
  const currentThread = threads.find((t) => t.id === (activeThreadId || threads[0]?.id)) || threads[0];

  const [replyInput, setReplyInput] = useState("");
  const [isAiGenerating, setIsAiGenerating] = useState(false);
  const [aiDraft, setAiDraft] = useState<string>("");
  const [aiReasoning, setAiReasoning] = useState<string[]>([]);
  const [aiIntent, setAiIntent] = useState<string>("");
  const [suggestedSlots, setSuggestedSlots] = useState<string[]>([]);

  // Simulation prompt state
  const [simRecruiterPrompt, setSimRecruiterPrompt] = useState("");
  const [isSimulatingInbound, setIsSimulatingInbound] = useState(false);

  // Trigger Gemini AI generation for active thread
  const handleGenerateAiResponse = async () => {
    if (!currentThread) return;
    setIsAiGenerating(true);
    const lastRecruiterMsg = currentThread.messages
      .filter((m) => m.sender === "recruiter")
      .slice(-1)[0]?.text || "Hi, are you open to an introductory screen?";

    try {
      const res = await fetch("/api/agent/respond-recruiter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          recruiterMessage: lastRecruiterMsg,
          recruiterName: currentThread.recruiterName,
          company: currentThread.company,
          candidateProfile,
          agentTone: settings.toneOfVoice,
          userRules: settings.customInstructions
        })
      });

      const data = await res.json();
      if (data.success && data.data) {
        setAiDraft(data.data.proposedResponse || "");
        setAiReasoning(data.data.reasoningSteps || []);
        setAiIntent(data.data.intentClassification || "");
        setSuggestedSlots(data.data.suggestedTimeSlots || []);
      }
    } catch (err) {
      console.error("Failed to generate AI recruiter response", err);
    } finally {
      setIsAiGenerating(false);
    }
  };

  // Send message to thread
  const handleSendMessage = (messageText: string, isAi: boolean = false, reasoning?: string[], slots?: string[]) => {
    if (!messageText.trim() || !currentThread) return;

    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: isAi ? "ai_agent" : "candidate",
      text: messageText,
      timestamp: `Today at ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
      isAiGenerated: isAi,
      reasoningNotes: reasoning,
      suggestedSlots: slots
    };

    setThreads((prev) =>
      prev.map((t) =>
        t.id === currentThread.id
          ? {
              ...t,
              status: isAi ? "Auto-Replied" : "Under Review",
              messages: [...t.messages, newMsg],
              lastActive: "Just now"
            }
          : t
      )
    );

    setReplyInput("");
    setAiDraft("");
    setAiReasoning([]);
  };

  // Simulate Recruiter Inbound Message
  const handleSimulateRecruiterInbound = async (customText?: string) => {
    const textToSimulate =
      customText ||
      simRecruiterPrompt ||
      "Hi Alex, your background looks fantastic! We have a Staff Engineer position paying $215k base + equity. What days work best for a 20-min intro screen?";

    if (!currentThread) return;
    setIsSimulatingInbound(true);

    const recruiterMsg: ChatMessage = {
      id: `sim-${Date.now()}`,
      sender: "recruiter",
      text: textToSimulate,
      timestamp: `Today at ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
    };

    // Add recruiter message
    setThreads((prev) =>
      prev.map((t) =>
        t.id === currentThread.id
          ? {
              ...t,
              status: "Action Required",
              messages: [...t.messages, recruiterMsg],
              lastActive: "Just now"
            }
          : t
      )
    );

    setSimRecruiterPrompt("");

    // If 24/7 auto-reply is enabled in settings, auto-trigger agent response in 1.2s!
    if (settings.autoReplyRecruiters) {
      setTimeout(async () => {
        try {
          const res = await fetch("/api/agent/respond-recruiter", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              recruiterMessage: textToSimulate,
              recruiterName: currentThread.recruiterName,
              company: currentThread.company,
              candidateProfile,
              agentTone: settings.toneOfVoice,
              userRules: settings.customInstructions
            })
          });

          const data = await res.json();
          if (data.success && data.data) {
            handleSendMessage(
              data.data.proposedResponse,
              true,
              data.data.reasoningSteps,
              data.data.suggestedTimeSlots
            );
          }
        } catch (e) {
          console.error(e);
        } finally {
          setIsSimulatingInbound(false);
        }
      }, 1200);
    } else {
      setIsSimulatingInbound(false);
      handleGenerateAiResponse();
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white dark:bg-slate-800/90 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xs">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            24/7 Recruiter & HR Omni-Channel AI Communicator
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Handles InMails, email screening, scheduling calendar slots, and compensation negotiations with human-like EQ
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Auto-Responder: {settings.autoReplyRecruiters ? "Active (24/7 Instant)" : "Draft & Review Mode"}
          </span>
        </div>
      </div>

      {/* Main Inbox View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[620px]">
        {/* Left Sidebar: Threads List (4 cols) */}
        <div className="lg:col-span-4 bg-white dark:bg-slate-800/90 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xs flex flex-col overflow-hidden">
          <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between bg-slate-50/70 dark:bg-slate-900/40">
            <span className="font-bold text-xs text-slate-800 dark:text-slate-200 uppercase tracking-wider">
              Active Inquiries ({threads.length})
            </span>
            <span className="text-[11px] text-indigo-600 dark:text-indigo-400 font-semibold">
              Live Sync
            </span>
          </div>

          <div className="divide-y divide-slate-100 dark:divide-slate-800 flex-1 overflow-y-auto max-h-[580px] scrollbar-thin">
            {threads.map((thread) => {
              const isSelected = thread.id === currentThread?.id;
              const lastMsg = thread.messages[thread.messages.length - 1];

              return (
                <div
                  key={thread.id}
                  onClick={() => {
                    setActiveThreadId(thread.id);
                    setAiDraft("");
                    setAiReasoning([]);
                  }}
                  className={`p-4 transition cursor-pointer flex flex-col gap-2 ${
                    isSelected
                      ? "bg-indigo-50/80 dark:bg-indigo-950/50 border-l-4 border-indigo-600"
                      : "hover:bg-slate-50 dark:hover:bg-slate-900/50"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={thread.avatar}
                        alt={thread.recruiterName}
                        className="w-10 h-10 rounded-full object-cover shrink-0 border border-slate-300 dark:border-slate-700"
                      />
                      <div className="min-w-0">
                        <h4 className="font-bold text-xs text-slate-900 dark:text-white truncate">
                          {thread.recruiterName}
                        </h4>
                        <span className="text-[11px] text-slate-500 dark:text-slate-400 truncate block">
                          {thread.company} • {thread.channel}
                        </span>
                      </div>
                    </div>

                    <span className="text-[10px] text-slate-400 shrink-0">{thread.lastActive}</span>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                    {lastMsg?.text}
                  </p>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 truncate max-w-[150px]">
                      {thread.roleDiscussed}
                    </span>

                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        thread.status === "Interview Booked"
                          ? "bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300"
                          : thread.status === "Action Required"
                          ? "bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 animate-pulse"
                          : "bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300"
                      }`}
                    >
                      {thread.status}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Area: Conversation & Live AI Reasoning (8 cols) */}
        <div className="lg:col-span-8 bg-white dark:bg-slate-800/90 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xs flex flex-col overflow-hidden">
          {currentThread ? (
            <>
              {/* Conversation Top Header */}
              <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex flex-wrap items-center justify-between gap-3 bg-slate-50/70 dark:bg-slate-900/40">
                <div className="flex items-center gap-3">
                  <img
                    src={currentThread.avatar}
                    alt={currentThread.recruiterName}
                    className="w-10 h-10 rounded-full object-cover border border-slate-300 dark:border-slate-700"
                  />
                  <div>
                    <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                      {currentThread.recruiterName}{" "}
                      <span className="text-xs text-slate-500 font-normal">({currentThread.recruiterTitle})</span>
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                      <span className="font-medium text-indigo-600 dark:text-indigo-400">{currentThread.roleDiscussed}</span>
                      {currentThread.offeredComp && (
                        <>
                          <span>•</span>
                          <span className="font-semibold text-emerald-600 dark:text-emerald-400">{currentThread.offeredComp}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleGenerateAiResponse}
                    disabled={isAiGenerating}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950 dark:hover:bg-indigo-900 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 transition cursor-pointer"
                  >
                    <Bot className={`w-4 h-4 ${isAiGenerating ? "animate-spin" : ""}`} />
                    <span>{isAiGenerating ? "Agent Reasoning..." : "Draft Human AI Reply"}</span>
                  </button>
                </div>
              </div>

              {/* Message Feed */}
              <div className="p-4 sm:p-6 flex-1 overflow-y-auto space-y-4 max-h-[420px] scrollbar-thin bg-slate-50/40 dark:bg-slate-900/20">
                {currentThread.messages.map((msg) => {
                  const isRecruiter = msg.sender === "recruiter";

                  return (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${isRecruiter ? "items-start" : "items-end"}`}
                    >
                      <div
                        className={`max-w-xl rounded-2xl p-4 text-xs sm:text-sm leading-relaxed shadow-xs ${
                          isRecruiter
                            ? "bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700"
                            : "bg-indigo-600 text-white"
                        }`}
                      >
                        {/* Header badge */}
                        <div className="flex items-center justify-between gap-4 mb-2 pb-1 border-b border-white/10 dark:border-slate-700 text-[10px] opacity-80">
                          <span className="font-bold flex items-center gap-1">
                            {isRecruiter ? (
                              <User className="w-3 h-3" />
                            ) : (
                              <Bot className="w-3 h-3" />
                            )}
                            {isRecruiter ? currentThread.recruiterName : "AI Career Agent (On Behalf of Alex)"}
                          </span>
                          <span>{msg.timestamp}</span>
                        </div>

                        <div className="whitespace-pre-line">{msg.text}</div>

                        {/* If AI generated with reasoning details */}
                        {msg.reasoningNotes && msg.reasoningNotes.length > 0 && (
                          <div className="mt-3 pt-2 border-t border-indigo-400/40 text-[11px] bg-indigo-700/50 p-2 rounded-lg space-y-1">
                            <span className="font-bold uppercase tracking-wider text-[10px] text-indigo-200 flex items-center gap-1">
                              <Sparkles className="w-3 h-3" /> Autonomous Reasoning:
                            </span>
                            {msg.reasoningNotes.map((note, idx) => (
                              <div key={idx} className="flex items-center gap-1 text-indigo-100">
                                <span>•</span>
                                <span>{note}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}

                {isSimulatingInbound && (
                  <div className="flex items-center gap-2 text-xs text-indigo-600 dark:text-indigo-400 font-medium animate-pulse p-2">
                    <Bot className="w-4 h-4 animate-bounce" />
                    <span>Agent evaluating inbound message and formulating high-EQ response...</span>
                  </div>
                )}
              </div>

              {/* AI Draft & Reasoning Panel (if generated) */}
              {aiDraft && (
                <div className="p-4 bg-indigo-50/90 dark:bg-indigo-950/70 border-t border-indigo-200 dark:border-indigo-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-600 text-white">
                        AI Formulated Draft (High-EQ Human Response)
                      </span>
                      {aiIntent && (
                        <span className="text-[11px] text-indigo-700 dark:text-indigo-300 font-medium">
                          Intent: {aiIntent}
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => setAiDraft("")}
                      className="text-xs text-slate-400 hover:text-slate-600"
                    >
                      Dismiss
                    </button>
                  </div>

                  {aiReasoning.length > 0 && (
                    <div className="text-[11px] text-indigo-800 dark:text-indigo-200 space-y-0.5 bg-white/70 dark:bg-slate-900/60 p-2.5 rounded-lg border border-indigo-200/60 dark:border-indigo-800/60">
                      <span className="font-bold">Cognitive Rationale: </span>
                      {aiReasoning.join(" ")}
                    </div>
                  )}

                  <textarea
                    value={aiDraft}
                    onChange={(e) => setAiDraft(e.target.value)}
                    rows={4}
                    className="w-full text-xs p-3 rounded-xl border border-indigo-300 dark:border-indigo-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-hidden"
                  />

                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => handleSendMessage(aiDraft, true, aiReasoning, suggestedSlots)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs transition cursor-pointer"
                    >
                      <Check className="w-4 h-4" />
                      <span>Approve & Send to Recruiter</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Reply Input Box & Recruiter Simulator */}
              <div className="p-4 border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 space-y-3">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={replyInput}
                    onChange={(e) => setReplyInput(e.target.value)}
                    placeholder="Type custom response or click 'Draft Human AI Reply' above..."
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage(replyInput, false);
                      }
                    }}
                    className="flex-1 text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                  />

                  <button
                    onClick={() => handleSendMessage(replyInput, false)}
                    className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send</span>
                  </button>
                </div>

                {/* Recruiter Simulator Toolbar */}
                <div className="pt-2 border-t border-slate-100 dark:border-slate-700/60 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 text-xs text-slate-500">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    <span>Recruiter Test Simulator:</span>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    <button
                      onClick={() =>
                        handleSimulateRecruiterInbound(
                          "We are excited about your background! Can you do a 30-minute system design screen next Tuesday at 2:00 PM?"
                        )
                      }
                      className="text-[10px] px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 font-medium transition cursor-pointer"
                    >
                      + Sim: "Interview Invite"
                    </button>
                    <button
                      onClick={() =>
                        handleSimulateRecruiterInbound(
                          "What is your target base salary expectation for this role?"
                        )
                      }
                      className="text-[10px] px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 font-medium transition cursor-pointer"
                    >
                      + Sim: "Salary Inquiry"
                    </button>
                    <button
                      onClick={() =>
                        handleSimulateRecruiterInbound(
                          "Is this role 100% remote or are you open to 2 days hybrid in San Francisco?"
                        )
                      }
                      className="text-[10px] px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 font-medium transition cursor-pointer"
                    >
                      + Sim: "Location / Hybrid Policy"
                    </button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-slate-400">
              <Bot className="w-12 h-12 text-slate-300 dark:text-slate-600 mb-3" />
              <p className="text-sm font-semibold">Select a conversation thread on the left</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
