import React from "react";
import ExistingWebsite from "./components/ExistingWebsite.jsx";
import ChatbotWidget from "./components/ChatbotWidget.jsx";

/**
 * Main Application layout
 * Renders the existing website backdrop and mounts the floating ChatbotWidget.
 */
export default function App() {
  return (
    <div className="relative min-h-screen">
      {/* Existing Cranes Varsity Website */}
      <ExistingWebsite />

      {/* Independent Floating Chatbot Widget */}
      <ChatbotWidget />
    </div>
  );
}
