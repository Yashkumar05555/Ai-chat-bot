import React, { useState, useEffect } from "react";
import ChatButton from "./ChatButton.jsx";
import ChatWindow from "./ChatWindow.jsx";

/**
 * ChatbotWidget - Self-contained, floating AI Chatbot widget.
 * Drop-in component for any existing website.
 */
export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);

  // Allow closing via Escape key for accessibility
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    const handleOpenEvent = () => {
      setIsOpen(true);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("open-cranes-chatbot", handleOpenEvent);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("open-cranes-chatbot", handleOpenEvent);
    };
  }, [isOpen]);

  const toggleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div id="cranes-varsity-ai-chatbot-root">
      {/* Floating Popup Window */}
      <ChatWindow isOpen={isOpen} onClose={handleClose} />

      {/* Floating Action Button at bottom: 24px, right: 24px */}
      <ChatButton isOpen={isOpen} onClick={toggleOpen} />
    </div>
  );
}
