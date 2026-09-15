import React, { useState, useEffect } from "react";
import MessageList from "./MessageList.jsx";
import ChatInput from "./ChatInput.jsx";
import { sendMessage } from "../services/chatService.js";
import {
  getGeneralChatHistory,
  saveGeneralChatHistory,
  clearGeneralChatHistory
} from "../utils/storage.js";
import { HelpCircle, Sparkles } from "lucide-react";

const INITIAL_GENERAL_MESSAGES = [
  {
    id: "msg_gen_welcome",
    sender: "bot",
    text: "Hi! I can help you with general questions about Cranes Varsity. What would you like to know?",
    timestamp: new Date().toISOString()
  }
];

const GENERAL_SUGGESTIONS = [
  "What courses do you offer?",
  "Where is Cranes Varsity located?",
  "Do you offer placement assistance?",
  "Are classes online or classroom?"
];

/**
 * GeneralChat - Handles inquiries regarding Cranes Varsity general information.
 */
export default function GeneralChat({ registerClearHandler, registerNewChatHandler, theme = "light" }) {
  const [messages, setMessages] = useState(() => {
    const saved = getGeneralChatHistory();
    return saved && saved.length > 0 ? saved : INITIAL_GENERAL_MESSAGES;
  });
  const [isTyping, setIsTyping] = useState(false);
  const isDark = theme === "dark";

  // Sync with localStorage
  useEffect(() => {
    saveGeneralChatHistory(messages);
  }, [messages]);

  // Register clear & new chat actions with parent header
  useEffect(() => {
    if (registerClearHandler) {
      registerClearHandler(() => {
        clearGeneralChatHistory();
        setMessages(INITIAL_GENERAL_MESSAGES);
      });
    }
    if (registerNewChatHandler) {
      registerNewChatHandler(() => {
        const fresh = [
          {
            id: `msg_gen_new_${Date.now()}`,
            sender: "bot",
            text: "Hi! Started a fresh conversation. How can I help you with Cranes Varsity today?",
            timestamp: new Date().toISOString()
          }
        ];
        setMessages(fresh);
      });
    }
  }, [registerClearHandler, registerNewChatHandler]);

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
      const response = await sendMessage(userText, "general", null);
      const botMsg = {
        id: `msg_bot_${Date.now()}`,
        sender: "bot",
        text: response.answer,
        sources: response.sources,
        timestamp: response.timestamp || new Date().toISOString()
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error("General chat error:", err);
      const errorMsg = {
        id: `msg_bot_err_${Date.now()}`,
        sender: "bot",
        text: "I apologize, but I encountered an error answering your question. Please try asking again or check your connectivity.",
        timestamp: new Date().toISOString()
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div
      id="cranes-general-chat-view"
      className={`flex-1 flex flex-col min-h-0 transition-colors ${
        isDark ? "bg-slate-950 text-slate-100" : "bg-slate-50 text-slate-800"
      }`}
    >
      {/* Quick Suggestion Chips (visible when conversation is young) */}
      {messages.length <= 3 && (
        <div
          className={`px-4 pt-2.5 pb-2 border-b shrink-0 transition-colors ${
            isDark
              ? "bg-slate-900 border-slate-800"
              : "bg-white border-slate-100"
          }`}
        >
          <div
            className={`flex items-center gap-1.5 text-[11px] font-semibold mb-1.5 ${
              isDark ? "text-slate-400" : "text-slate-500"
            }`}
          >
            <Sparkles className="w-3 h-3 text-blue-500" />
            <span>Suggested questions:</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {GENERAL_SUGGESTIONS.map((sug, i) => (
              <button
                key={i}
                type="button"
                onClick={() => !isTyping && handleSend(sug)}
                disabled={isTyping}
                className={`text-[11px] px-2.5 py-1 rounded-full border transition-colors text-left disabled:opacity-50 disabled:cursor-not-allowed ${
                  isDark
                    ? "bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700 hover:border-blue-500"
                    : "bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-700 border-slate-200"
                }`}
              >
                {sug}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Message Stream */}
      <MessageList messages={messages} isTyping={isTyping} theme={theme} />

      {/* Input */}
      <ChatInput
        onSendMessage={handleSend}
        disabled={isTyping}
        placeholder="Ask about admissions, campus, fees, placements..."
        theme={theme}
      />
    </div>
  );
}
