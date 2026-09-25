import React, { useState, useRef, useEffect } from "react";
import ChatHeader from "./ChatHeader.jsx";
import ChatHome from "./ChatHome.jsx";
import GeneralChat from "./GeneralChat.jsx";
import CourseSelection from "./CourseSelection.jsx";
import CourseChat from "./CourseChat.jsx";
import ChatHistoryView from "./ChatHistoryView.jsx";
import { COURSES } from "../data/courses.js";
import {
  getThemePreference,
  saveThemePreference
} from "../utils/storage.js";
import { AlertCircle } from "lucide-react";

/**
 * ChatWindow - Main drawer panel for the AI assistant widget.
 * Features:
 * - Covers 30% to 40% horizontal width with 100% full vertical coverage
 * - Day / Night mode switching with local persistence
 * - Conversation History view with resume & management
 * - Coordinates view states, clear confirmations, and responsive backdrop
 */
export default function ChatWindow({ isOpen, onClose }) {
  const [theme, setTheme] = useState(() => getThemePreference());
  const [currentView, setCurrentView] = useState("home"); // 'home' | 'general' | 'courses' | 'course-chat' | 'history'
  const [previousView, setPreviousView] = useState("home");
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  // References to active child clear / new chat handlers
  const activeClearFnRef = useRef(null);
  const activeNewChatFnRef = useRef(null);

  const isDark = theme === "dark";

  // Toggle Day and Night mode
  const handleToggleTheme = () => {
    setTheme((prev) => {
      const nextTheme = prev === "dark" ? "light" : "dark";
      saveThemePreference(nextTheme);
      return nextTheme;
    });
  };

  // Toggle or open history view
  const handleHistoryToggle = () => {
    if (currentView === "history") {
      setCurrentView(previousView || "home");
    } else {
      setPreviousView(currentView);
      setCurrentView("history");
    }
  };

  // Resume a conversation session from history
  const handleResumeSession = (session) => {
    if (!session) return;
    if (session.type === "course") {
      const matchedCourse = COURSES.find((c) => c.id === session.courseId) || COURSES[0];
      setSelectedCourse(matchedCourse);
      setCurrentView("course-chat");
    } else {
      setSelectedCourse(null);
      setCurrentView("general");
    }
  };

  // Home navigation resets view and course without closing popup
  const handleHome = () => {
    setCurrentView("home");
    setSelectedCourse(null);
    setShowClearConfirm(false);
  };

  const handleSelectGeneral = () => {
    setCurrentView("general");
  };

  const handleSelectCourses = () => {
    setCurrentView("courses");
  };

  const handleSelectCourse = (course) => {
    setSelectedCourse(course);
    setCurrentView("course-chat");
  };

  const handleTriggerClearChat = () => {
    setShowClearConfirm(true);
  };

  const handleConfirmClear = () => {
    if (activeClearFnRef.current) {
      activeClearFnRef.current();
    }
    setShowClearConfirm(false);
  };

  const handleTriggerNewChat = () => {
    if (activeNewChatFnRef.current) {
      activeNewChatFnRef.current();
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Mobile backdrop overlay to close when clicking outside */}
      <div
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-40 md:hidden transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Main Drawer Window: Covers 30% to 40% horizontally with full vertical cover (top to bottom) */}
      <div
        id="cranes-chatbot-popup-window"
        role="dialog"
        aria-label="Cranes Varsity AI Assistant"
        className={`fixed top-0 bottom-0 right-0 z-50 h-screen h-[100dvh] w-full sm:w-[420px] md:w-[38vw] lg:w-[35vw] xl:w-[32vw] min-w-[340px] max-w-[580px] shadow-2xl border-l flex flex-col overflow-hidden animate-in slide-in-from-right duration-300 ease-out transition-colors ${
          isDark
            ? "bg-slate-950 text-slate-100 border-slate-800"
            : "bg-white text-slate-900 border-slate-200"
        }`}
      >
        {/* Fixed Chat Header with Night/Day mode and History trigger */}
        <ChatHeader
          currentView={currentView}
          selectedCourse={selectedCourse}
          theme={theme}
          onToggleTheme={handleToggleTheme}
          onHome={handleHome}
          onHistory={handleHistoryToggle}
          onClose={onClose}
          onClearChat={
            currentView === "general" || currentView === "course-chat"
              ? handleTriggerClearChat
              : null
          }
          onNewChat={
            currentView === "general" || currentView === "course-chat"
              ? handleTriggerNewChat
              : null
          }
        />

        {/* Screen Views Container */}
        <div
          className={`flex-1 flex flex-col min-h-0 relative transition-colors ${
            isDark ? "bg-slate-950" : "bg-slate-50/50"
          }`}
        >
          {currentView === "home" && (
            <ChatHome
              theme={theme}
              onSelectGeneral={handleSelectGeneral}
              onSelectCourses={handleSelectCourses}
              onSelectCourse={handleSelectCourse}
              onSelectHistory={() => setCurrentView("history")}
            />
          )}

          {currentView === "general" && (
            <GeneralChat
              theme={theme}
              registerClearHandler={(fn) => {
                activeClearFnRef.current = fn;
              }}
              registerNewChatHandler={(fn) => {
                activeNewChatFnRef.current = fn;
              }}
            />
          )}

          {currentView === "courses" && (
            <CourseSelection
              theme={theme}
              onSelectCourse={handleSelectCourse}
            />
          )}

          {currentView === "course-chat" && selectedCourse && (
            <CourseChat
              theme={theme}
              course={selectedCourse}
              registerClearHandler={(fn) => {
                activeClearFnRef.current = fn;
              }}
              registerNewChatHandler={(fn) => {
                activeNewChatFnRef.current = fn;
              }}
            />
          )}

          {currentView === "history" && (
            <ChatHistoryView
              theme={theme}
              onResumeSession={handleResumeSession}
              onStartNewGeneral={() => setCurrentView("general")}
              onStartNewCourse={() => setCurrentView("courses")}
            />
          )}

          {/* Clear Chat Confirmation Modal */}
          {showClearConfirm && (
            <div
              id="cranes-clear-confirm-dialog"
              className="absolute inset-0 bg-slate-950/50 backdrop-blur-xs z-30 flex items-center justify-center p-4"
            >
              <div
                className={`rounded-2xl p-5 max-w-xs w-full shadow-2xl border text-center animate-in zoom-in-95 duration-150 ${
                  isDark
                    ? "bg-slate-900 border-slate-800 text-slate-100"
                    : "bg-white border-slate-200 text-slate-900"
                }`}
              >
                <div className="w-10 h-10 rounded-full bg-rose-500/15 text-rose-500 flex items-center justify-center mx-auto mb-3">
                  <AlertCircle className="w-5 h-5" />
                </div>
                <h3 className={`text-sm font-bold mb-1 ${isDark ? "text-white" : "text-slate-900"}`}>
                  Clear Conversation?
                </h3>
                <p className={`text-xs mb-4 ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                  This will delete this conversation history from your browser.
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
                    onClick={handleConfirmClear}
                    className="flex-1 px-3 py-2 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-xl transition-colors shadow-xs"
                  >
                    Clear History
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
