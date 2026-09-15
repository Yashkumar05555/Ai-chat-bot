import React, { useState, useEffect } from "react";
import {
  History,
  MessageSquare,
  GraduationCap,
  Trash2,
  ChevronRight,
  Clock,
  RotateCcw,
  Sparkles,
  AlertCircle
} from "lucide-react";
import {
  getChatSessions,
  deleteChatSession,
  clearAllChatSessions
} from "../utils/storage.js";
import { COURSES } from "../data/courses.js";

/**
 * ChatHistoryView - Displays past conversation sessions with options to resume,
 * delete, or clear all history. Supports Day and Night mode.
 */
export default function ChatHistoryView({
  theme = "light",
  onResumeSession,
  onStartNewGeneral,
  onStartNewCourse
}) {
  const [sessions, setSessions] = useState([]);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const isDark = theme === "dark";

  useEffect(() => {
    setSessions(getChatSessions());
  }, []);

  const handleDeleteOne = (e, sessionId) => {
    e.stopPropagation();
    const updated = deleteChatSession(sessionId);
    setSessions(updated || []);
  };

  const handleConfirmClearAll = () => {
    clearAllChatSessions();
    setSessions([]);
    setShowClearConfirm(false);
  };

  const formatSessionTime = (isoString) => {
    if (!isoString) return "";
    try {
      const date = new Date(isoString);
      const now = new Date();
      const diffMs = now.getTime() - date.getTime();
      const diffMins = Math.floor(diffMs / 60000);
      const diffHours = Math.floor(diffMs / 3600000);

      if (diffMins < 1) return "Just now";
      if (diffMins < 60) return `${diffMins}m ago`;
      if (diffHours < 24 && date.getDate() === now.getDate()) {
        return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      }
      return date.toLocaleDateString([], { month: "short", day: "numeric" });
    } catch {
      return "";
    }
  };

  return (
    <div
      id="cranes-chat-history-view"
      className={`flex-1 overflow-y-auto p-4 flex flex-col justify-between transition-colors ${
        isDark ? "bg-slate-900/90 text-slate-100" : "bg-slate-50/80 text-slate-800"
      }`}
    >
      <div className="space-y-3.5">
        {/* Header Bar */}
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <div
              className={`w-7 h-7 rounded-xl flex items-center justify-center shadow-xs ${
                isDark
                  ? "bg-blue-950/60 border border-blue-800 text-blue-400"
                  : "bg-blue-50 border border-blue-200/60 text-blue-600"
              }`}
            >
              <History className="w-4 h-4" />
            </div>
            <div>
              <h3 className={`text-sm font-bold ${isDark ? "text-white" : "text-slate-900"}`}>
                Chat History
              </h3>
              <p className={`text-[11px] ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                {sessions.length} saved conversation{sessions.length === 1 ? "" : "s"}
              </p>
            </div>
          </div>

          {sessions.length > 0 && (
            <button
              type="button"
              onClick={() => setShowClearConfirm(true)}
              className={`text-[11px] font-semibold px-2.5 py-1 rounded-lg border transition-colors flex items-center gap-1 ${
                isDark
                  ? "bg-slate-800/80 hover:bg-rose-950/40 text-slate-300 hover:text-rose-400 border-slate-700 hover:border-rose-800"
                  : "bg-white hover:bg-rose-50 text-slate-600 hover:text-rose-700 border-slate-200 hover:border-rose-200"
              }`}
            >
              <Trash2 className="w-3 h-3" />
              <span>Clear All</span>
            </button>
          )}
        </div>

        {/* Sessions List */}
        {sessions.length > 0 ? (
          <div className="space-y-2.5">
            {sessions.map((session) => {
              const isCourse = session.type === "course";
              const timeDisplay = formatSessionTime(session.updatedAt || session.createdAt);

              return (
                <div
                  key={session.id}
                  onClick={() => onResumeSession(session)}
                  className={`group relative w-full text-left p-3.5 rounded-2xl border transition-all cursor-pointer shadow-xs hover:shadow-md flex flex-col gap-2 ${
                    isDark
                      ? "bg-slate-800/90 hover:bg-slate-800 border-slate-700/80 hover:border-blue-500/60"
                      : "bg-white hover:bg-slate-50/90 border-slate-200 hover:border-blue-300"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 w-full">
                    <div className="flex items-start gap-2.5 min-w-0">
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 shadow-2xs ${
                          isCourse
                            ? isDark
                              ? "bg-indigo-950/60 border border-indigo-800 text-indigo-400"
                              : "bg-indigo-50 border border-indigo-100 text-indigo-600"
                            : isDark
                            ? "bg-blue-950/60 border border-blue-800 text-blue-400"
                            : "bg-blue-50 border border-blue-100 text-blue-600"
                        }`}
                      >
                        {isCourse ? (
                          <GraduationCap className="w-4.5 h-4.5" />
                        ) : (
                          <MessageSquare className="w-4.5 h-4.5" />
                        )}
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <h4
                            className={`text-xs font-bold truncate transition-colors ${
                              isDark
                                ? "text-white group-hover:text-blue-400"
                                : "text-slate-900 group-hover:text-blue-600"
                            }`}
                          >
                            {session.title || "Conversation"}
                          </h4>
                          <span
                            className={`text-[9px] font-bold px-1.5 py-0.2 rounded border ${
                              isCourse
                                ? isDark
                                  ? "bg-indigo-950/80 text-indigo-300 border-indigo-800"
                                  : "bg-indigo-50 text-indigo-700 border-indigo-100"
                                : isDark
                                ? "bg-blue-950/80 text-blue-300 border-blue-800"
                                : "bg-blue-50 text-blue-700 border-blue-100"
                            }`}
                          >
                            {isCourse ? "Course" : "General"}
                          </span>
                        </div>

                        {session.lastMessage && (
                          <p
                            className={`text-[11px] line-clamp-1 mt-0.5 ${
                              isDark ? "text-slate-400" : "text-slate-500"
                            }`}
                          >
                            {session.lastMessage}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Delete single session */}
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        type="button"
                        onClick={(e) => handleDeleteOne(e, session.id)}
                        title="Delete conversation"
                        className={`p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity ${
                          isDark
                            ? "text-slate-400 hover:text-rose-400 hover:bg-rose-950/50"
                            : "text-slate-400 hover:text-rose-600 hover:bg-rose-50"
                        }`}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${
                          isDark
                            ? "bg-slate-700 text-slate-400 group-hover:bg-blue-600 group-hover:text-white"
                            : "bg-slate-100 text-slate-400 group-hover:bg-blue-600 group-hover:text-white"
                        }`}
                      >
                        <ChevronRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>

                  {/* Metadata footer */}
                  <div
                    className={`flex items-center justify-between text-[10px] pt-2 border-t ${
                      isDark ? "border-slate-700/60 text-slate-400" : "border-slate-100 text-slate-400"
                    }`}
                  >
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {timeDisplay}
                    </span>
                    <span className="font-medium">
                      {session.messageCount || session.messages?.length || 0} messages
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Empty History State */
          <div
            className={`text-center py-10 px-5 rounded-2xl border ${
              isDark
                ? "bg-slate-800/50 border-slate-700/80 text-slate-300"
                : "bg-white border-slate-200 text-slate-700"
            } shadow-xs`}
          >
            <div
              className={`w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-xs ${
                isDark
                  ? "bg-slate-800 border border-slate-700 text-slate-400"
                  : "bg-blue-50 border border-blue-100 text-blue-600"
              }`}
            >
              <History className="w-6 h-6" />
            </div>
            <h4 className={`text-sm font-bold ${isDark ? "text-white" : "text-slate-900"}`}>
              No Chat History Yet
            </h4>
            <p className={`text-xs mt-1 max-w-xs mx-auto ${isDark ? "text-slate-400" : "text-slate-500"}`}>
              Your previous inquiries and course counselor discussions will appear here for easy access.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 mt-5">
              <button
                type="button"
                onClick={onStartNewGeneral}
                className="w-full sm:w-auto text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white px-3.5 py-2 rounded-xl transition-colors shadow-xs flex items-center justify-center gap-1.5"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>General Admissions</span>
              </button>
              <button
                type="button"
                onClick={onStartNewCourse}
                className={`w-full sm:w-auto text-xs font-semibold px-3.5 py-2 rounded-xl transition-colors border ${
                  isDark
                    ? "bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700"
                    : "bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200"
                } flex items-center justify-center gap-1.5`}
              >
                <GraduationCap className="w-3.5 h-3.5" />
                <span>Browse Courses</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Clear All Confirmation Modal */}
      {showClearConfirm && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div
            className={`p-5 rounded-2xl max-w-xs w-full shadow-2xl border text-center animate-in zoom-in-95 duration-150 ${
              isDark
                ? "bg-slate-900 border-slate-800 text-slate-100"
                : "bg-white border-slate-200 text-slate-900"
            }`}
          >
            <div className="w-10 h-10 rounded-full bg-rose-500/15 text-rose-500 flex items-center justify-center mx-auto mb-3">
              <AlertCircle className="w-5 h-5" />
            </div>
            <h3 className={`text-sm font-bold mb-1 ${isDark ? "text-white" : "text-slate-900"}`}>
              Clear All Chat History?
            </h3>
            <p className={`text-xs mb-4 ${isDark ? "text-slate-400" : "text-slate-500"}`}>
              All saved inquiries and conversations will be deleted permanently from your browser.
            </p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowClearConfirm(false)}
                className={`flex-1 px-3 py-2 text-xs font-semibold rounded-xl transition-colors ${
                  isDark
                    ? "bg-slate-800 hover:bg-slate-700 text-slate-300"
                    : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                }`}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmClearAll}
                className="flex-1 px-3 py-2 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-xl transition-colors shadow-xs"
              >
                Delete All
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
