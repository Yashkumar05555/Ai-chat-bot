import React, { useState, useEffect } from "react";
import MessageList from "./MessageList.jsx";
import ChatInput from "./ChatInput.jsx";
import { sendMessage } from "../services/chatService.js";
import {
  getCourseChatHistory,
  saveCourseChatHistory,
  clearCourseChatHistory
} from "../utils/storage.js";
import { Sparkles, Info } from "lucide-react";

/**
 * CourseChat - Dedicated interactive counselor for a specific Cranes Varsity course track.
 */
export default function CourseChat({
  course,
  registerClearHandler,
  registerNewChatHandler,
  theme = "light"
}) {
  const isDark = theme === "dark";

  const getInitialMessages = () => [
    {
      id: `msg_course_welcome_${course.id}`,
      sender: "bot",
      text: `Hi! Ask me anything about the ${course.name} course.`,
      sources: [`${course.name} Curriculum`],
      timestamp: new Date().toISOString()
    }
  ];

  const [messages, setMessages] = useState(() => {
    const saved = getCourseChatHistory(course.id);
    return saved && saved.length > 0 ? saved : getInitialMessages();
  });
  const [isTyping, setIsTyping] = useState(false);

  // Sync to localStorage for this specific course
  useEffect(() => {
    if (course?.id) {
      saveCourseChatHistory(course.id, messages, course.name);
    }
  }, [messages, course?.id, course?.name]);

  // Register clear & new chat handlers with parent header
  useEffect(() => {
    if (registerClearHandler) {
      registerClearHandler(() => {
        clearCourseChatHistory(course.id);
        setMessages(getInitialMessages());
      });
    }
    if (registerNewChatHandler) {
      registerNewChatHandler(() => {
        const fresh = [
          {
            id: `msg_course_new_${Date.now()}`,
            sender: "bot",
            text: `Hi! Fresh chat started for ${course.name}. What specific syllabus or career topic can I clarify?`,
            sources: [`${course.name} Syllabus`],
            timestamp: new Date().toISOString()
          }
        ];
        setMessages(fresh);
      });
    }
  }, [course?.id, course?.name, registerClearHandler, registerNewChatHandler]);

  const handleSend = async (userText) => {
    const userMsg = {
      id: `msg_user_${Date.now()}`,
      sender: "user",
      text: userText,
      timestamp: new Date().toISOString()
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    try {
      const response = await sendMessage(userText, "course", course);
      const botMsg = {
        id: `msg_bot_${Date.now()}`,
        sender: "bot",
        text: response.answer,
        sources: response.sources,
        timestamp: response.timestamp || new Date().toISOString()
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error("Course chat error:", err);
      const errorMsg = {
        id: `msg_bot_err_${Date.now()}`,
        sender: "bot",
        text: `Sorry, I had trouble retrieving curriculum details for ${course.name}. Please try again.`,
        timestamp: new Date().toISOString()
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const exampleQuestions = course.exampleQuestions || [
    "What topics are covered?",
    "What skills will I learn?",
    "What are the career opportunities?",
    "What is the course duration?"
  ];

  return (
    <div
      id="cranes-course-chat-view"
      className={`flex-1 flex flex-col min-h-0 transition-colors ${
        isDark ? "bg-slate-950 text-slate-100" : "bg-slate-50 text-slate-800"
      }`}
    >
      {/* Course Info & Quick Questions Banner */}
      <div
        className={`px-4 py-2.5 border-b shrink-0 transition-colors ${
          isDark
            ? "bg-slate-900 border-slate-800 text-slate-200"
            : "bg-blue-50/70 border-blue-100/80 text-blue-900"
        }`}
      >
        <div className="flex items-center justify-between text-[11px] mb-1.5">
          <span className="font-semibold flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-blue-500" />
            <span>Quick questions for {course.name}:</span>
          </span>
          <span
            className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${
              isDark
                ? "bg-slate-800 text-blue-300 border-slate-700"
                : "bg-white text-blue-700 border-blue-200"
            }`}
          >
            {course.duration}
          </span>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {exampleQuestions.map((q, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => !isTyping && handleSend(q)}
              disabled={isTyping}
              className={`text-[11px] px-2.5 py-1 rounded-full border shadow-2xs transition-all text-left disabled:opacity-50 disabled:cursor-not-allowed ${
                isDark
                  ? "bg-slate-800 hover:bg-blue-600 hover:text-white text-slate-200 border-slate-700"
                  : "bg-white hover:bg-blue-600 hover:text-white text-slate-700 border-blue-200/90"
              }`}
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Message Stream */}
      <MessageList messages={messages} isTyping={isTyping} theme={theme} />

      {/* Input */}
      <ChatInput
        onSendMessage={handleSend}
        disabled={isTyping}
        placeholder={`Ask about ${course.name} modules, labs, eligibility...`}
        theme={theme}
      />
    </div>
  );
}
