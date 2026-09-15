import React from "react";
import {
  ArrowLeft,
  Bot,
  RotateCcw,
  Trash2,
  X,
  Sun,
  Moon,
  History
} from "lucide-react";

/**
 * ChatHeader - fixed at top of the chatbot window.
 * Displays navigation (← Home), dynamic title, History toggle, Night/Day mode switch, clear chat, and close button.
 */
export default function ChatHeader({
  currentView,
  selectedCourse,
  theme = "light",
  onToggleTheme,
  onHome,
  onHistory,
  onClose,
  onClearChat,
  onNewChat
}) {
  const isHomeScreen = currentView === "home";
  const isHistoryScreen = currentView === "history";
  const isDark = theme === "dark";

  // Determine screen title
  let headerTitle = "AI Assistant";
  let headerSubtitle = "Cranes Varsity Virtual Counselor";

  if (currentView === "general") {
    headerTitle = "General Query";
    headerSubtitle = "Admissions, Campus & Placement FAQ";
  } else if (currentView === "courses") {
    headerTitle = "Select a Course";
    headerSubtitle = "Explore technical specializations";
  } else if (currentView === "course-chat" && selectedCourse) {
    headerTitle = selectedCourse.name;
    headerSubtitle = "Curriculum & Tech Lab Counselor";
  } else if (currentView === "history") {
    headerTitle = "Chat History";
    headerSubtitle = "Saved Inquiries & Counseling Sessions";
  }

  const isChatScreen = currentView === "general" || currentView === "course-chat";

  return (
    <header
      id="cranes-chat-header"
      className={`shrink-0 px-4 py-3.5 shadow-xs flex items-center justify-between border-b select-none z-10 transition-colors ${
        isDark
          ? "bg-slate-900/95 backdrop-blur-md text-white border-slate-800"
          : "bg-white/95 backdrop-blur-md text-slate-900 border-slate-200"
      }`}
    >
      <div className="flex items-center gap-2.5 min-w-0">
        {/* Home Navigation button on sub-screens */}
        {!isHomeScreen && (
          <button
            id="cranes-header-home-btn"
            type="button"
            onClick={onHome}
            title="Return to Chatbot Home"
            className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1.5 rounded-xl border transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 shrink-0 ${
              isDark
                ? "bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700"
                : "bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200"
            }`}
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Home</span>
          </button>
        )}

        {/* Bot Icon & Status Indicator */}
        <div
          className={`relative flex items-center justify-center w-9 h-9 rounded-xl shrink-0 shadow-xs border transition-colors ${
            isDark
              ? "bg-blue-950/60 border-blue-800 text-blue-400"
              : "bg-blue-50 border-blue-200/60 text-blue-600"
          }`}
        >
          <Bot className="w-5 h-5" />
          <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span
              className={`relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 ring-2 ${
                isDark ? "ring-slate-900" : "ring-white"
              }`}
            ></span>
          </span>
        </div>

        {/* Titles & Status */}
        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            <h2
              className={`text-sm font-bold tracking-tight truncate leading-tight ${
                isDark ? "text-white" : "text-slate-900"
              }`}
            >
              {headerTitle}
            </h2>
            <span
              className={`hidden sm:inline-block text-[10px] font-bold px-1.5 py-0.2 rounded-md border ${
                isDark
                  ? "bg-blue-950/80 text-blue-300 border-blue-800"
                  : "bg-blue-50 text-blue-700 border-blue-100"
              }`}
            >
              AI Counselor
            </span>
          </div>
          <p
            className={`text-[11px] truncate leading-none mt-1 flex items-center gap-1 ${
              isDark ? "text-slate-400" : "text-slate-500"
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></span>
            <span className="truncate">{headerSubtitle}</span>
          </p>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-1 shrink-0 ml-2">
        {/* History Toggle Button */}
        {onHistory && (
          <button
            id="cranes-header-history-btn"
            type="button"
            onClick={onHistory}
            title={isHistoryScreen ? "Close History" : "View Chat History"}
            className={`p-1.5 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              isHistoryScreen
                ? "bg-blue-600 text-white"
                : isDark
                ? "text-slate-300 hover:text-white hover:bg-slate-800"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            }`}
          >
            <History className="w-4 h-4" />
          </button>
        )}

        {/* Day / Night Mode Toggle */}
        {onToggleTheme && (
          <button
            id="cranes-header-theme-toggle"
            type="button"
            onClick={onToggleTheme}
            title={isDark ? "Switch to Day Mode (Light)" : "Switch to Night Mode (Dark)"}
            aria-label={isDark ? "Switch to Day Mode" : "Switch to Night Mode"}
            className={`p-1.5 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              isDark
                ? "text-amber-400 hover:text-amber-300 hover:bg-slate-800"
                : "text-slate-600 hover:text-blue-600 hover:bg-slate-100"
            }`}
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        )}

        {/* Chat Screen Quick Actions */}
        {isChatScreen && (
          <>
            {onNewChat && (
              <button
                id="cranes-header-new-chat-btn"
                type="button"
                onClick={onNewChat}
                title="Start a fresh conversation"
                className={`p-1.5 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  isDark
                    ? "text-slate-300 hover:text-white hover:bg-slate-800"
                    : "text-slate-500 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            )}

            {onClearChat && (
              <button
                id="cranes-header-clear-btn"
                type="button"
                onClick={onClearChat}
                title="Clear current conversation"
                className={`p-1.5 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-rose-500 ${
                  isDark
                    ? "text-slate-400 hover:text-rose-400 hover:bg-rose-950/40"
                    : "text-slate-500 hover:text-rose-600 hover:bg-rose-50"
                }`}
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </>
        )}

        {/* Close / Minimize Drawer button */}
        <button
          id="cranes-header-close-btn"
          type="button"
          onClick={onClose}
          title="Close AI Assistant"
          aria-label="Close AI Assistant"
          className={`p-1.5 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ml-0.5 ${
            isDark
              ? "text-slate-400 hover:text-white hover:bg-slate-800"
              : "text-slate-500 hover:text-slate-900 hover:bg-slate-100"
          }`}
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
}
