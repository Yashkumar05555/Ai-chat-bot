/**
 * Chat Service - Abstracted interface for AI responses.
 * Currently backed by local mock responses with simulated latency.
 * Prepared for clean drop-in transition to POST /api/chat.
 */

import { getGeneralMockAnswer, getCourseMockAnswer } from "../data/mockResponses.js";

/**
 * Send message to AI assistant.
 * 
 * @param {string} message - User query text
 * @param {'general' | 'course'} mode - Chat mode
 * @param {object | null} course - Course object if mode === 'course'
 * @param {string} [sessionId] - Optional session ID for future backend persistence
 * @returns {Promise<{ answer: string, sources?: string[], timestamp: string }>}
 */
export async function sendMessage(message, mode = "general", course = null, sessionId = "session_default") {
  // Simulate realistic network / AI inference delay (800ms - 1100ms)
  const delay = Math.floor(Math.random() * 300) + 850;
  await new Promise((resolve) => setTimeout(resolve, delay));

  // In the future, this can be swapped with:
  /*
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      message,
      mode,
      courseId: course?.id || null,
      sessionId
    })
  });
  const data = await response.json();
  return data;
  */

  let answer = "";
  let sources = [];

  if (mode === "course" && course) {
    answer = getCourseMockAnswer(message, course);
    sources = [`Cranes Varsity Course Syllabus: ${course.name}`, "Academic Curriculum Guide"];
  } else {
    answer = getGeneralMockAnswer(message);
    sources = ["Cranes Varsity Official FAQ", "Admissions Handbook"];
  }

  return {
    answer,
    sources,
    timestamp: new Date().toISOString()
  };
}
