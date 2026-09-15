import React from "react";
import {
  BrainCircuit,
  Cpu,
  Wifi,
  Layers,
  Code2,
  BarChart3,
  ChevronRight,
  Clock,
  Laptop
} from "lucide-react";

// Map string icon names to Lucide icons
const ICON_MAP = {
  BrainCircuit,
  Cpu,
  Wifi,
  Layers,
  Code2,
  BarChart3
};

const COLOR_MAP_LIGHT = {
  "data-science-ai": "bg-emerald-50 text-emerald-600 border-emerald-200/60",
  "embedded-systems-automotive": "bg-blue-50 text-blue-600 border-blue-200/60",
  "iot-embedded-systems": "bg-amber-50 text-amber-600 border-amber-200/60",
  "vlsi-design-verification": "bg-purple-50 text-purple-600 border-purple-200/60",
  "full-stack-java": "bg-indigo-50 text-indigo-600 border-indigo-200/60",
  "business-analytics": "bg-sky-50 text-sky-600 border-sky-200/60"
};

const COLOR_MAP_DARK = {
  "data-science-ai": "bg-emerald-950/60 text-emerald-400 border-emerald-800",
  "embedded-systems-automotive": "bg-blue-950/60 text-blue-400 border-blue-800",
  "iot-embedded-systems": "bg-amber-950/60 text-amber-400 border-amber-800",
  "vlsi-design-verification": "bg-purple-950/60 text-purple-400 border-purple-800",
  "full-stack-java": "bg-indigo-950/60 text-indigo-400 border-indigo-800",
  "business-analytics": "bg-sky-950/60 text-sky-400 border-sky-800"
};

/**
 * CourseCard - clickable card representing a specialized Cranes Varsity course track.
 */
export default function CourseCard({ course, onSelect, theme = "light" }) {
  const isDark = theme === "dark";
  const IconComponent = ICON_MAP[course.iconName] || BrainCircuit;
  const colorStyle = isDark
    ? COLOR_MAP_DARK[course.id] || "bg-blue-950/60 text-blue-400 border-blue-800"
    : COLOR_MAP_LIGHT[course.id] || "bg-blue-50 text-blue-600 border-blue-200/60";

  return (
    <button
      id={`cranes-course-card-${course.id}`}
      type="button"
      onClick={() => onSelect(course)}
      className={`group w-full text-left p-4 rounded-2xl border shadow-xs hover:shadow-md transition-all duration-200 flex flex-col gap-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
        isDark
          ? "bg-slate-800/90 hover:bg-slate-800 border-slate-700/80 hover:border-blue-500"
          : "bg-white hover:bg-slate-50/80 active:bg-blue-50/50 border-slate-200 hover:border-blue-400"
      }`}
    >
      <div className="flex items-start justify-between gap-3 w-full">
        <div className="flex items-start gap-3 min-w-0">
          <div
            className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-105 transition-transform duration-200 shadow-xs ${colorStyle}`}
          >
            <IconComponent className="w-5 h-5" />
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <h4
                className={`text-xs font-bold transition-colors ${
                  isDark
                    ? "text-white group-hover:text-blue-400"
                    : "text-slate-900 group-hover:text-blue-600"
                }`}
              >
                {course.name}
              </h4>
              {course.badge && (
                <span
                  className={`text-[9px] font-bold tracking-wide px-1.5 py-0.2 rounded border ${
                    isDark
                      ? "bg-blue-950/80 text-blue-300 border-blue-800"
                      : "bg-blue-50 text-blue-700 border-blue-100"
                  }`}
                >
                  {course.badge}
                </span>
              )}
            </div>
            <p
              className={`text-[11px] line-clamp-1 mt-0.5 ${
                isDark ? "text-slate-400" : "text-slate-500"
              }`}
            >
              {course.shortDescription}
            </p>
          </div>
        </div>

        <div
          className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-colors mt-1 ${
            isDark
              ? "bg-slate-700 text-slate-400 group-hover:bg-blue-600 group-hover:text-white"
              : "bg-slate-100 text-slate-400 group-hover:bg-blue-600 group-hover:text-white"
          }`}
        >
          <ChevronRight className="w-3.5 h-3.5" />
        </div>
      </div>

      {/* Metadata Badges */}
      <div
        className={`flex items-center justify-between text-[10px] pt-2 border-t w-full ${
          isDark ? "border-slate-700/80 text-slate-400" : "border-slate-100 text-slate-500"
        }`}
      >
        <div className="flex items-center gap-1">
          <Clock className="w-3 h-3 text-slate-400" />
          <span>{course.duration}</span>
        </div>
        <div
          className={`flex items-center gap-1 font-medium px-2 py-0.5 rounded-md border ${
            isDark
              ? "bg-slate-700/70 text-blue-300 border-slate-600"
              : "bg-slate-50 text-blue-700 border-slate-200/60"
          }`}
        >
          <Laptop className="w-3 h-3" />
          <span>{course.mode}</span>
        </div>
      </div>
    </button>
  );
}
