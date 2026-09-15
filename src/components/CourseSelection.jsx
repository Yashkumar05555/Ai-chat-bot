import React, { useState } from "react";
import { COURSES } from "../data/courses.js";
import CourseCard from "./CourseCard.jsx";
import { Search, GraduationCap } from "lucide-react";

/**
 * CourseSelection - Grid/list of technical courses at Cranes Varsity with Day and Night support.
 */
export default function CourseSelection({ onSelectCourse, theme = "light" }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const isDark = theme === "dark";

  const categories = [
    { id: "all", label: "All Tracks" },
    { id: "embedded", label: "Embedded & IoT" },
    { id: "vlsi", label: "VLSI" },
    { id: "ai", label: "AI & Data" },
    { id: "software", label: "Software" }
  ];

  const filteredCourses = COURSES.filter((c) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      c.name.toLowerCase().includes(q) ||
      c.shortDescription.toLowerCase().includes(q);

    if (!matchesSearch) return false;

    if (activeCategory === "all") return true;
    if (activeCategory === "embedded") {
      return c.id.includes("embedded") || c.id.includes("iot");
    }
    if (activeCategory === "vlsi") {
      return c.id.includes("vlsi");
    }
    if (activeCategory === "ai") {
      return c.id.includes("data") || c.id.includes("analytics");
    }
    if (activeCategory === "software") {
      return c.id.includes("java");
    }
    return true;
  });

  return (
    <div
      id="cranes-course-selection-view"
      className={`flex-1 overflow-y-auto p-4 flex flex-col transition-colors ${
        isDark ? "bg-slate-900/95 text-slate-100" : "bg-slate-50/70 text-slate-800"
      }`}
    >
      {/* Intro Header */}
      <div className="mb-3">
        <div className="flex items-center gap-2 mb-1">
          <div
            className={`w-7 h-7 rounded-xl border flex items-center justify-center shadow-xs transition-colors ${
              isDark
                ? "bg-blue-950/60 border-blue-800 text-blue-400"
                : "bg-blue-50 border-blue-200/60 text-blue-600"
            }`}
          >
            <GraduationCap className="w-4 h-4" />
          </div>
          <div>
            <h3 className={`text-sm font-bold ${isDark ? "text-white" : "text-slate-900"}`}>
              Select Technology Track
            </h3>
            <p className={`text-[11px] ${isDark ? "text-slate-400" : "text-slate-500"}`}>
              Chat directly with our curriculum & lab specialist for any track
            </p>
          </div>
        </div>
      </div>

      {/* Quick Search */}
      <div className="relative mb-2.5">
        <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        <input
          id="cranes-course-search-input"
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Filter courses (e.g. VLSI, Python, Java, RTOS)..."
          className={`w-full text-xs pl-8 pr-3 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-xs border transition-colors ${
            isDark
              ? "bg-slate-800 text-white placeholder-slate-400 border-slate-700 focus:bg-slate-800"
              : "bg-white text-slate-800 placeholder-slate-400 border-slate-200"
          }`}
        />
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2.5 scrollbar-none mb-1">
        {categories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setActiveCategory(cat.id)}
            className={`text-[11px] px-2.5 py-1 rounded-full whitespace-nowrap transition-colors font-medium border ${
              activeCategory === cat.id
                ? "bg-blue-600 text-white border-blue-600 shadow-2xs"
                : isDark
                ? "bg-slate-800 text-slate-300 hover:bg-slate-700 border-slate-700"
                : "bg-white text-slate-600 hover:bg-slate-100 border-slate-200"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Course List */}
      <div className="space-y-2.5 pb-2">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              onSelect={onSelectCourse}
              theme={theme}
            />
          ))
        ) : (
          <div
            className={`text-center py-8 px-4 rounded-2xl border shadow-xs ${
              isDark
                ? "bg-slate-800/60 border-slate-700 text-slate-400"
                : "bg-white border-slate-200 text-slate-500"
            }`}
          >
            <p className="text-xs">No courses match your filter</p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setActiveCategory("all");
              }}
              className="mt-2 text-xs font-semibold text-blue-500 hover:underline"
            >
              Reset filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
