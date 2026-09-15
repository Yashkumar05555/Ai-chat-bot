import React, { useState } from "react";
import { Bot, User, Check, Copy, Sparkles, CheckCircle2 } from "lucide-react";

/**
 * Formats message text: handles bullet lines starting with • or -, bold text (**text**), and line breaks.
 */
function renderFormattedContent(text) {
  if (!text) return null;

  const lines = text.split("\n");

  return (
    <div className="space-y-1.5 text-xs leading-relaxed">
      {lines.map((line, idx) => {
        const trimmed = line.trim();
        if (!trimmed) {
          return <div key={idx} className="h-1" />;
        }

        // Bullet line
        if (trimmed.startsWith("•") || trimmed.startsWith("-")) {
          const content = trimmed.replace(/^[•-]\s*/, "");
          return (
            <div key={idx} className="flex items-start gap-2 pl-1 my-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0"></span>
              <span className="text-slate-700">{content}</span>
            </div>
          );
        }

        return <p key={idx} className="text-slate-800">{line}</p>;
      })}
    </div>
  );
}

/**
 * Formats ISO or epoch timestamp to human time (e.g. 10:45 AM)
 */
function formatTime(timestamp) {
  if (!timestamp) return "";
  try {
    const date = new Date(timestamp);
    if (isNaN(date.getTime())) return "";
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  } catch {
    return "";
  }
}

/**
 * MessageBubble - renders single chat entry with light/night theme and enhanced visualization.
 */
export default function MessageBubble({ message, theme = "light" }) {
  const isUser = message.sender === "user";
  const formattedTime = formatTime(message.timestamp);
  const [copied, setCopied] = useState(false);
  const isDark = theme === "dark";

  const handleCopy = () => {
    if (!message.text) return;
    navigator.clipboard?.writeText(message.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={`group flex items-end gap-2.5 my-3 ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      {/* Bot Avatar (Left) */}
      {!isUser && (
        <div
          className={`w-8 h-8 rounded-xl border flex items-center justify-center shrink-0 shadow-2xs transition-colors ${
            isDark
              ? "bg-blue-950/60 border-blue-800 text-blue-400"
              : "bg-blue-50 border-blue-200/80 text-blue-600"
          }`}
        >
          <Bot className="w-4.5 h-4.5" />
        </div>
      )}

      {/* Bubble Container */}
      <div className={`max-w-[85%] sm:max-w-[82%] flex flex-col ${isUser ? "items-end" : "items-start"}`}>
        <div
          className={`p-3.5 rounded-2xl shadow-xs transition-colors relative ${
            isUser
              ? "bg-blue-600 text-white rounded-br-xs font-medium"
              : isDark
              ? "bg-slate-800/95 text-slate-100 border border-slate-700 rounded-bl-xs"
              : "bg-white text-slate-800 border border-slate-200 rounded-bl-xs"
          }`}
        >
          {/* Message text */}
          {renderFormattedContent(message.text)}

          {/* Sources preview if returned by bot */}
          {!isUser && message.sources && message.sources.length > 0 && (
            <div
              className={`mt-2.5 pt-2 border-t flex items-center flex-wrap gap-1.5 ${
                isDark ? "border-slate-700/80" : "border-slate-100"
              }`}
            >
              <span className={`text-[10px] font-medium ${isDark ? "text-slate-400" : "text-slate-400"}`}>
                Verified by:
              </span>
              {message.sources.map((src, i) => (
                <span
                  key={i}
                  className={`text-[10px] px-2 py-0.5 rounded-md font-medium border ${
                    isDark
                      ? "bg-slate-700 text-slate-200 border-slate-600"
                      : "bg-slate-100 text-slate-600 border-slate-200/60"
                  }`}
                >
                  {src}
                </span>
              ))}
            </div>
          )}

          {/* Quick Copy Action for Bot responses */}
          {!isUser && (
            <div
              className={`mt-2 pt-1 flex items-center justify-between text-[10px] ${
                isDark ? "text-slate-400" : "text-slate-400"
              }`}
            >
              <span className="text-[10px] flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                <span>Cranes CRM Verified</span>
              </span>
              <button
                type="button"
                onClick={handleCopy}
                title="Copy response"
                className={`opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 p-1 -mr-1 rounded ${
                  isDark
                    ? "text-slate-400 hover:text-blue-400 hover:bg-slate-700/50"
                    : "text-slate-400 hover:text-blue-600 hover:bg-slate-50"
                }`}
              >
                {copied ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-500" />
                    <span className="text-[10px] text-emerald-500 font-medium">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          )}
        </div>

        {/* Timestamp */}
        {formattedTime && (
          <span
            className={`text-[10px] mt-1 px-1 ${
              isDark ? "text-slate-500" : "text-slate-400"
            }`}
          >
            {formattedTime}
          </span>
        )}
      </div>

      {/* User Avatar (Right) */}
      {isUser && (
        <div
          className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 shadow-2xs transition-colors ${
            isDark
              ? "bg-slate-800 text-slate-300 border border-slate-700"
              : "bg-slate-200/90 text-slate-700"
          }`}
        >
          <User className="w-4 h-4" />
        </div>
      )}
    </div>
  );
}
