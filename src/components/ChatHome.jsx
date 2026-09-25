import React from "react";
import {
  MessageSquare,
  ChevronRight,
  Sparkles,
  Building2,
  Zap,
  History,
  GraduationCap
} from "lucide-react";
import { COURSES } from "../data/courses.js";

/**
 * ChatHome - Primary navigation hub when chatbot opens.
 * Features modern light & night theme styling with high-contrast typography,
 * course-wise chat selector, and clear visual hierarchy.
 */
export default function ChatHome({
  onSelectGeneral,
  onSelectCourses,
  onSelectCourse,
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

          {/* Card 2: Course Wise Chat & Curriculum */}
          <div
            id="cranes-card-course-query"
            className={`group w-full text-left p-4 rounded-2xl border shadow-xs hover:shadow-md transition-all duration-200 flex flex-col gap-3 ${
              isDark
                ? "bg-slate-800/90 border-slate-700 hover:border-purple-500"
                : "bg-white border-slate-200 hover:border-purple-300"
            }`}
          >
            <div
              role="button"
              tabIndex={0}
              onClick={onSelectCourses}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onSelectCourses?.();
                }
              }}
              className="flex items-center justify-between gap-3 w-full cursor-pointer focus:outline-none"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-105 transition-all duration-200 shadow-xs border ${
                    isDark
                      ? "bg-purple-950/60 border-purple-800 text-purple-400 group-hover:bg-purple-600 group-hover:text-white"
                      : "bg-purple-50 border-purple-200/50 text-purple-600 group-hover:bg-purple-600 group-hover:text-white"
                  }`}
                >
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`text-sm font-bold transition-colors ${
                        isDark ? "text-white group-hover:text-purple-400" : "text-slate-900 group-hover:text-purple-600"
                      }`}
                    >
                      Course-Wise Chat & Curriculum
                    </span>
                    <span
                      className={`text-[9px] px-1.5 py-0.2 rounded font-semibold border ${
                        isDark
                          ? "bg-purple-950/80 text-purple-300 border-purple-800"
                          : "bg-purple-50 text-purple-700 border-purple-100"
                      }`}
                    >
                      Curriculum
                    </span>
                  </div>
                  <p className={`text-xs line-clamp-1 mt-0.5 ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                    Ask specific questions about syllabus, lab tools & careers.
                  </p>
                </div>
              </div>
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                  isDark
                    ? "bg-slate-700 text-slate-400 group-hover:bg-purple-600 group-hover:text-white"
                    : "bg-slate-100 text-slate-400 group-hover:bg-purple-600 group-hover:text-white"
                }`}
              >
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>

            {/* Quick Course Tags */}
            <div
              className={`flex items-center flex-wrap gap-1.5 pt-2 border-t ${
                isDark ? "border-slate-700/60" : "border-slate-100"
              }`}
            >
              <span className={`text-[10px] font-medium mr-0.5 ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                Courses:
              </span>
              {COURSES.map((course) => (
                <button
                  key={course.id}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onSelectCourse) {
                      onSelectCourse(course);
                    } else if (onSelectCourses) {
                      onSelectCourses();
                    }
                  }}
                  className={`text-[10px] font-medium px-2 py-0.5 rounded-md transition-colors border ${
                    isDark
                      ? "bg-slate-700/90 hover:bg-purple-900/60 hover:border-purple-600 text-slate-200 hover:text-white border-slate-600"
                      : "bg-slate-100 hover:bg-purple-50 hover:border-purple-300 text-slate-700 hover:text-purple-700 border-slate-200"
                  }`}
                  title={`Start chat for ${course.name}`}
                >
                  {course.name}
                </button>
              ))}
            </div>
          </div>

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
