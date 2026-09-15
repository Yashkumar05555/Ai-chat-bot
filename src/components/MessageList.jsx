import React, { useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble.jsx";
import { Bot } from "lucide-react";

/**
 * MessageList - renders scrollable conversation stream with auto-scroll and typing indicator.
 */
export default function MessageList({ messages = [], isTyping = false, theme = "light" }) {
  const bottomRef = useRef(null);
  const isDark = theme === "dark";

  // Auto-scroll to bottom whenever messages change or typing state changes
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  return (
    <div
      id="cranes-message-list"
      className={`flex-1 overflow-y-auto px-4 py-3 transition-colors ${
        isDark ? "bg-slate-950/90 text-slate-100" : "bg-slate-50/70 text-slate-800"
      }`}
    >
      {messages.map((msg) => (
        <MessageBubble key={msg.id} message={msg} theme={theme} />
      ))}

      {/* Typing Indicator */}
      {isTyping && (
        <div className="flex items-end gap-2.5 my-3 justify-start">
          <div
            className={`w-8 h-8 rounded-xl border flex items-center justify-center shrink-0 shadow-2xs transition-colors ${
              isDark
                ? "bg-blue-950/60 border-blue-800 text-blue-400"
                : "bg-blue-50 border-blue-200/80 text-blue-600"
            }`}
          >
            <Bot className="w-4.5 h-4.5" />
          </div>

          <div
            className={`px-4 py-3 rounded-2xl rounded-bl-xs border shadow-xs flex items-center gap-2.5 transition-colors ${
              isDark
                ? "bg-slate-800/90 text-slate-200 border-slate-700"
                : "bg-white text-slate-700 border-slate-200"
            }`}
          >
            <span className={`text-xs font-medium ${isDark ? "text-slate-400" : "text-slate-500"}`}>
              Counselor is typing
            </span>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-bounce [animation-delay:-0.3s]"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-bounce [animation-delay:-0.15s]"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-bounce"></span>
            </div>
          </div>
        </div>
      )}

      {/* Invisible anchor for scroll alignment */}
      <div ref={bottomRef} />
    </div>
  );
}
