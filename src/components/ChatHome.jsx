import React from "react";
import {
  MessageSquare,
  GraduationCap,
  ChevronRight,
  Sparkles,
  Building2,
  Award,
  Zap,
  History
} from "lucide-react";

/**
 * ChatHome - Primary navigation hub when chatbot opens.
 * Features modern light & night theme styling with high-contrast typography,
 * quick suggestion chips, and clear visual hierarchy.
 */
export default function ChatHome({
  onSelectGeneral,
  onSelectCourses,
  onSelectHistory,
  theme = "light"
}) {
  const isDark = theme === "dark";

  return (
    <div
      id="cranes-chat-home"
      className={`flex-1 overflow-y-auto p-5 flex flex-col justify-between transition-colors ${
        isDark ? "bg-slate-900/95 text-slate-100" : "bg-slate-50/70 text-slate-800"
      }`}
    >
      {/* Top Welcome Section */}
      <div className="space-y-4">
        {/* Welcome Callout Card */}
        <div
          className={`rounded-2xl p-4 shadow-xs border relative overflow-hidden transition-colors ${
            isDark
              ? "bg-slate-800/90 border-slate-700/80"
              : "bg-white border-slate-200/90"
          }`}
        >
          <div className="flex items-start gap-3 relative z-10">
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-xs border transition-colors ${
                isDark
                  ? "bg-blue-950/60 border-blue-800 text-blue-400"
                  : "bg-blue-50 border-blue-200/60 text-blue-600"
              }`}
            >
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <span
                  className={`text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded border ${
                    isDark
                      ? "bg-blue-950/80 text-blue-300 border-blue-800"
                      : "bg-blue-50 text-blue-700 border-blue-100"
                  }`}
                >
                  Cranes Varsity AI
                </span>
                <span className="flex items-center gap-1 text-[10px] text-emerald-500 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  Active Now
                </span>
              </div>
              <h3 className={`text-base font-bold leading-snug ${isDark ? "text-white" : "text-slate-900"}`}>
                Welcome to Cranes Varsity Assistant
              </h3>
              <p className={`text-xs mt-1 leading-relaxed ${isDark ? "text-slate-300" : "text-slate-600"}`}>
                Your virtual counselor for engineering admissions, technical curriculums, batch timings, and placement reports.
              </p>
            </div>
          </div>
        </div>

        {/* Section Heading */}
        <div className="px-1 flex items-center justify-between">
          <h4
            className={`text-xs font-bold uppercase tracking-wider ${
              isDark ? "text-slate-400" : "text-slate-500"
            }`}
          >
            Choose Inquiry Type
          </h4>
          <span className={`text-[11px] ${isDark ? "text-slate-500" : "text-slate-400"}`}>
            Select an option
          </span>
        </div>

        {/* Action Cards Container */}
        <div className="space-y-3">
          {/* Card 1: General Query */}
          <button
            id="cranes-card-general-query"
            type="button"
            onClick={onSelectGeneral}
            className={`group w-full text-left p-4 rounded-2xl border shadow-xs hover:shadow-md transition-all duration-200 flex flex-col gap-3 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              isDark
                ? "bg-slate-800/90 hover:bg-slate-800 border-slate-700 hover:border-blue-500"
                : "bg-white hover:bg-slate-50/80 active:bg-blue-50/50 border-slate-200 hover:border-blue-300"
            }`}
          >
            <div className="flex items-center justify-between gap-3 w-full">
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-105 transition-all duration-200 shadow-xs border ${
                    isDark
                      ? "bg-blue-950/60 border-blue-800 text-blue-400 group-hover:bg-blue-600 group-hover:text-white"
                      : "bg-blue-50 border-blue-200/50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white"
                  }`}
                >
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`text-sm font-bold transition-colors ${
                        isDark ? "text-white group-hover:text-blue-400" : "text-slate-900 group-hover:text-blue-600"
                      }`}
                    >
                      General Admissions & FAQ
                    </span>
                    <span
                      className={`text-[9px] px-1.5 py-0.2 rounded font-semibold border ${
                        isDark
                          ? "bg-blue-950/80 text-blue-300 border-blue-800"
                          : "bg-blue-50 text-blue-700 border-blue-100"
                      }`}
                    >
                      Admissions
                    </span>
                  </div>
                  <p className={`text-xs line-clamp-1 mt-0.5 ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                    Fees, placement assistance, campus address & batch timings.
                  </p>
                </div>
              </div>
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                  isDark
                    ? "bg-slate-700 text-slate-400 group-hover:bg-blue-600 group-hover:text-white"
                    : "bg-slate-100 text-slate-400 group-hover:bg-blue-600 group-hover:text-white"
                }`}
              >
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>

            {/* Quick Starter Chips */}
            <div
              className={`flex items-center flex-wrap gap-1.5 pt-1 border-t ${
                isDark ? "border-slate-700/60" : "border-slate-100"
              }`}
            >
              <span className={`text-[10px] font-medium ${isDark ? "text-slate-400" : "text-slate-400"}`}>
                Popular:
              </span>
              <span
                className={`text-[10px] px-2 py-0.5 rounded-md ${
                  isDark ? "bg-slate-700 text-slate-300" : "bg-slate-100 text-slate-600"
                }`}
              >
                Course Fees & EMI
              </span>
              <span
                className={`text-[10px] px-2 py-0.5 rounded-md ${
                  isDark ? "bg-slate-700 text-slate-300" : "bg-slate-100 text-slate-600"
                }`}
              >
                100% Placements
              </span>
              <span
                className={`text-[10px] px-2 py-0.5 rounded-md ${
                  isDark ? "bg-slate-700 text-slate-300" : "bg-slate-100 text-slate-600"
                }`}
              >
                Bangalore Center
              </span>
            </div>
          </button>

          {/* Card 2: Course Specific Query */}
          <button
            id="cranes-card-course-query"
            type="button"
            onClick={onSelectCourses}
            className={`group w-full text-left p-4 rounded-2xl border shadow-xs hover:shadow-md transition-all duration-200 flex flex-col gap-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
              isDark
                ? "bg-slate-800/90 hover:bg-slate-800 border-slate-700 hover:border-indigo-500"
                : "bg-white hover:bg-slate-50/80 active:bg-indigo-50/50 border-slate-200 hover:border-indigo-300"
            }`}
          >
            <div className="flex items-center justify-between gap-3 w-full">
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-105 transition-all duration-200 shadow-xs border ${
                    isDark
                      ? "bg-indigo-950/60 border-indigo-800 text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white"
                      : "bg-indigo-50 border-indigo-200/50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white"
                  }`}
                >
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`text-sm font-bold transition-colors ${
                        isDark ? "text-white group-hover:text-indigo-400" : "text-slate-900 group-hover:text-indigo-600"
                      }`}
                    >
                      Course Specific Curriculum
                    </span>
                    <span
                      className={`text-[9px] px-1.5 py-0.2 rounded font-semibold border ${
                        isDark
                          ? "bg-indigo-950/80 text-indigo-300 border-indigo-800"
                          : "bg-indigo-50 text-indigo-700 border-indigo-100"
                      }`}
                    >
                      6 Specializations
                    </span>
                  </div>
                  <p className={`text-xs line-clamp-1 mt-0.5 ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                    VLSI Design, Embedded Systems, AI & Data Science, IoT, Java.
                  </p>
                </div>
              </div>
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                  isDark
                    ? "bg-slate-700 text-slate-400 group-hover:bg-indigo-600 group-hover:text-white"
                    : "bg-slate-100 text-slate-400 group-hover:bg-indigo-600 group-hover:text-white"
                }`}
              >
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>

            {/* Quick Course Tags */}
            <div
              className={`flex items-center flex-wrap gap-1.5 pt-1 border-t ${
                isDark ? "border-slate-700/60" : "border-slate-100"
              }`}
            >
              <span className={`text-[10px] font-medium ${isDark ? "text-slate-400" : "text-slate-400"}`}>
                Tracks:
              </span>
              <span
                className={`text-[10px] px-2 py-0.5 rounded-md font-medium ${
                  isDark ? "bg-indigo-950/80 text-indigo-300" : "bg-indigo-50 text-indigo-700"
                }`}
              >
                Embedded & Automotive
              </span>
              <span
                className={`text-[10px] px-2 py-0.5 rounded-md font-medium ${
                  isDark ? "bg-indigo-950/80 text-indigo-300" : "bg-indigo-50 text-indigo-700"
                }`}
              >
                VLSI Verification
              </span>
              <span
                className={`text-[10px] px-2 py-0.5 rounded-md font-medium ${
                  isDark ? "bg-indigo-950/80 text-indigo-300" : "bg-indigo-50 text-indigo-700"
                }`}
              >
                Data Science & AI
              </span>
            </div>
          </button>

          {/* History Shortcut Card */}
          {onSelectHistory && (
            <button
              type="button"
              onClick={onSelectHistory}
              className={`w-full text-left p-3.5 rounded-2xl border flex items-center justify-between gap-3 transition-colors ${
                isDark
                  ? "bg-slate-800/60 hover:bg-slate-800 border-slate-700 text-slate-200"
                  : "bg-white hover:bg-slate-50 border-slate-200 text-slate-700"
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                    isDark ? "bg-blue-950/80 text-blue-400" : "bg-blue-50 text-blue-600"
                  }`}
                >
                  <History className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <h5 className={`text-xs font-bold ${isDark ? "text-white" : "text-slate-900"}`}>
                    View Chat History
                  </h5>
                  <p className={`text-[11px] truncate ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                    Resume past conversations and counseling logs
                  </p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>
          )}

          {/* Card 3: Scholarship Test Callout */}
          <div
            className={`rounded-2xl p-3.5 border flex items-center justify-between gap-3 ${
              isDark
                ? "bg-gradient-to-r from-amber-950/30 via-amber-950/10 to-transparent border-amber-900/60"
                : "bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border-amber-200/80"
            }`}
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-xs">
                <Award className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <h5 className={`text-xs font-bold truncate ${isDark ? "text-amber-300" : "text-slate-900"}`}>
                  National Scholarship Test 2026 (CST)
                </h5>
                <p className={`text-[11px] truncate ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                  Up to 100% tuition waiver for meritorious engineers.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={onSelectGeneral}
              className={`text-[11px] font-semibold px-2.5 py-1 rounded-lg transition-colors shrink-0 ${
                isDark
                  ? "text-amber-200 bg-amber-950/80 hover:bg-amber-900 border border-amber-800"
                  : "text-amber-800 bg-amber-100 hover:bg-amber-200"
              }`}
            >
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* Bottom info footer pill */}
      <div className={`pt-4 border-t mt-4 ${isDark ? "border-slate-800" : "border-slate-200/80"}`}>
        <div
          className={`flex items-center justify-between text-[11px] px-1 ${
            isDark ? "text-slate-400" : "text-slate-500"
          }`}
        >
          <span className="flex items-center gap-1">
            <Building2 className="w-3.5 h-3.5 text-slate-400" />
            Bangalore Tech Campus
          </span>
          <span className="flex items-center gap-1 font-semibold text-blue-500">
            <Zap className="w-3.5 h-3.5 text-amber-500" />
            100+ Hiring Partners
          </span>
        </div>
      </div>
    </div>
  );
}
