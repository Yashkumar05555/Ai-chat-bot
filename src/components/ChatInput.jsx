import React, { useState } from "react";
import { Send } from "lucide-react";

/**
 * ChatInput - bottom bar for typing and sending queries.
 */
export default function ChatInput({
  onSendMessage,
  disabled = false,
  placeholder = "Ask your question...",
  theme = "light"
}) {
  const [text, setText] = useState("");
  const isDark = theme === "dark";

  const handleSubmit = (e) => {
    e?.preventDefault();
    const trimmed = text.trim();
    if (!trimmed || disabled) return;

    onSendMessage(trimmed);
    setText("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const canSend = text.trim().length > 0 && !disabled;

  return (
    <form
      id="cranes-chat-input-form"
      onSubmit={handleSubmit}
      className={`p-3 shrink-0 flex items-center gap-2 border-t transition-colors ${
        isDark
          ? "bg-slate-900 border-slate-800"
          : "bg-white border-slate-200/80"
      }`}
    >
      <input
        id="cranes-chat-text-input"
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        placeholder={disabled ? "AI is replying..." : placeholder}
        className={`flex-1 text-xs px-3.5 py-2.5 rounded-xl border focus:outline-none transition-all disabled:opacity-60 disabled:cursor-not-allowed ${
          isDark
            ? "bg-slate-800/90 text-white placeholder-slate-400 border-slate-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-900/50"
            : "bg-slate-50 hover:bg-slate-100/70 focus:bg-white text-slate-800 placeholder-slate-400 border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        }`}
      />

      <button
        id="cranes-chat-send-btn"
        type="submit"
        disabled={!canSend}
        aria-label="Send message"
        className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-all focus:outline-none focus:ring-2 focus:ring-blue-300 ${
          canSend
            ? "bg-blue-600 hover:bg-blue-700 active:scale-95 text-white shadow-xs"
            : isDark
            ? "bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700/60"
            : "bg-slate-100 text-slate-400 cursor-not-allowed"
        }`}
      >
        <Send className="w-4 h-4" />
      </button>
    </form>
  );
}
