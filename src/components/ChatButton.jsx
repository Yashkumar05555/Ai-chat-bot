import React, { useState } from "react";
import { Bot, X } from "lucide-react";

/**
 * Floating trigger button placed at bottom: 24px, right: 24px.
 * Features hover tooltip, micro-animations, and high z-index.
 */
export default function ChatButton({ isOpen, onClick }) {
  const [isHovered, setIsHovered] = useState(false);

  // When the 30-40% right-side panel is open, hide the floating button to prevent overlapping the chat input
  if (isOpen) {
    return null;
  }

  return (
    <div
      id="cranes-chatbot-trigger-container"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-end"
    >
      {/* Tooltip on hover (desktop) */}
      {!isOpen && (
        <div
          id="cranes-chatbot-tooltip"
          role="tooltip"
          className={`absolute right-16 mr-2 px-3 py-1.5 bg-slate-900 text-white text-xs font-medium rounded-lg shadow-lg pointer-events-none transition-all duration-200 whitespace-nowrap hidden sm:flex items-center gap-1.5 ${
            isHovered
              ? "opacity-100 translate-x-0"
              : "opacity-0 translate-x-2"
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          AI Assistant • Ask Cranes
          <div className="absolute right-[-4px] top-1/2 -translate-y-1/2 w-2 h-2 bg-slate-900 rotate-45"></div>
        </div>
      )}

      {/* Circular Floating Button */}
      <button
        id="cranes-chatbot-floating-button"
        type="button"
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        aria-label={isOpen ? "Close AI Assistant" : "Open AI Assistant"}
        className={`relative flex items-center justify-center w-14 h-14 rounded-full shadow-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300 active:scale-95 ${
          isOpen
            ? "bg-slate-800 text-white rotate-90 hover:bg-slate-700"
            : "bg-gradient-to-tr from-blue-600 to-indigo-600 text-white hover:scale-105 hover:shadow-blue-500/25"
        }`}
      >
        {isOpen ? (
          <X className="w-6 h-6 transition-transform duration-200" />
        ) : (
          <>
            <Bot className="w-7 h-7 transition-transform duration-200" />
            {/* Pulsing online badge indicator */}
            <span className="absolute top-0 right-0 flex h-3.5 w-3.5 -mt-0.5 -mr-0.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 ring-2 ring-white"></span>
            </span>
          </>
        )}
      </button>
    </div>
  );
}
