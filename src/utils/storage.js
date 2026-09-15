/**
 * LocalStorage utilities for Cranes Varsity AI Chatbot
 * Includes theme preference (Night/Day mode) and conversation history management.
 */

const STORAGE_KEYS = {
  THEME: "cranes_chatbot_theme_mode",
  SESSIONS: "cranes_chatbot_history_sessions",
  GENERAL_CHAT: "cranes_chatbot_general_history",
  COURSE_CHAT_PREFIX: "cranes_chatbot_course_",
  SELECTED_COURSE: "cranes_chatbot_selected_course",
  ACTIVE_VIEW: "cranes_chatbot_active_view"
};

/**
 * Safe retrieval from localStorage
 */
function getItem(key, fallback = null) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch (err) {
    console.warn(`[ChatbotStorage] Failed to read ${key}:`, err);
    return fallback;
  }
}

/**
 * Safe write to localStorage
 */
function setItem(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.warn(`[ChatbotStorage] Failed to write ${key}:`, err);
  }
}

/**
 * Safe delete from localStorage
 */
function removeItem(key) {
  try {
    localStorage.removeItem(key);
  } catch (err) {
    console.warn(`[ChatbotStorage] Failed to remove ${key}:`, err);
  }
}

/* ==========================================================================
   Day / Night Theme Preference
   ========================================================================== */

export function getThemePreference() {
  const saved = getItem(STORAGE_KEYS.THEME, null);
  if (saved === "dark" || saved === "light") {
    return saved;
  }
  // Default to light mode as requested in previous prompt
  return "light";
}

export function saveThemePreference(theme) {
  if (theme === "dark" || theme === "light") {
    setItem(STORAGE_KEYS.THEME, theme);
  }
}

/* ==========================================================================
   Chat History Sessions
   ========================================================================== */

export function getChatSessions() {
  const sessions = getItem(STORAGE_KEYS.SESSIONS, []);
  if (!Array.isArray(sessions)) return [];
  // Sort descending by updatedAt
  return sessions.sort((a, b) => new Date(b.updatedAt || 0) - new Date(a.updatedAt || 0));
}

export function saveChatSession(session) {
  if (!session || !session.id) return;
  const sessions = getChatSessions();
  const existingIdx = sessions.findIndex((s) => s.id === session.id);

  const updatedSession = {
    ...session,
    updatedAt: new Date().toISOString()
  };

  if (existingIdx >= 0) {
    sessions[existingIdx] = updatedSession;
  } else {
    sessions.unshift(updatedSession);
  }

  // Keep up to 30 recent sessions
  const trimmed = sessions.slice(0, 30);
  setItem(STORAGE_KEYS.SESSIONS, trimmed);
  return trimmed;
}

export function deleteChatSession(sessionId) {
  if (!sessionId) return;
  const sessions = getChatSessions();
  const filtered = sessions.filter((s) => s.id !== sessionId);
  setItem(STORAGE_KEYS.SESSIONS, filtered);
  return filtered;
}

export function clearAllChatSessions() {
  removeItem(STORAGE_KEYS.SESSIONS);
  removeItem(STORAGE_KEYS.GENERAL_CHAT);
  // Clear course keys
  try {
    const keysToRemove = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(STORAGE_KEYS.COURSE_CHAT_PREFIX)) {
        keysToRemove.push(key);
      }
    }
    keysToRemove.forEach((k) => localStorage.removeItem(k));
  } catch (e) {
    console.warn("[ChatbotStorage] Failed clearing course history:", e);
  }
}

/* ==========================================================================
   Individual Chat Storage (Active Session)
   ========================================================================== */

// General Chat History
export function getGeneralChatHistory() {
  return getItem(STORAGE_KEYS.GENERAL_CHAT, null);
}

export function saveGeneralChatHistory(messages) {
  setItem(STORAGE_KEYS.GENERAL_CHAT, messages);

  // Sync to history session
  if (Array.isArray(messages) && messages.length > 1) {
    const lastUserMsg = [...messages].reverse().find((m) => m.sender === "user");
    const lastMsg = messages[messages.length - 1];
    saveChatSession({
      id: "session_general",
      type: "general",
      title: lastUserMsg ? lastUserMsg.text.slice(0, 45) : "General Admissions FAQ",
      subtitle: "Admissions, Campus & Placement FAQ",
      lastMessage: lastMsg?.text?.slice(0, 80) || "",
      messageCount: messages.length,
      messages,
      createdAt: messages[0]?.timestamp || new Date().toISOString()
    });
  }
}

export function clearGeneralChatHistory() {
  removeItem(STORAGE_KEYS.GENERAL_CHAT);
  deleteChatSession("session_general");
}

// Course Specific Chat History
export function getCourseChatHistory(courseId) {
  if (!courseId) return null;
  return getItem(`${STORAGE_KEYS.COURSE_CHAT_PREFIX}${courseId}`, null);
}

export function saveCourseChatHistory(courseId, messages, courseName) {
  if (!courseId) return;
  setItem(`${STORAGE_KEYS.COURSE_CHAT_PREFIX}${courseId}`, messages);

  // Sync to history session
  if (Array.isArray(messages) && messages.length > 1) {
    const lastUserMsg = [...messages].reverse().find((m) => m.sender === "user");
    const lastMsg = messages[messages.length - 1];
    saveChatSession({
      id: `session_course_${courseId}`,
      type: "course",
      courseId,
      title: courseName || "Course Curriculum Query",
      subtitle: lastUserMsg ? `"${lastUserMsg.text.slice(0, 40)}..."` : "Curriculum & Tech Labs",
      lastMessage: lastMsg?.text?.slice(0, 80) || "",
      messageCount: messages.length,
      messages,
      createdAt: messages[0]?.timestamp || new Date().toISOString()
    });
  }
}

export function clearCourseChatHistory(courseId) {
  if (!courseId) return;
  removeItem(`${STORAGE_KEYS.COURSE_CHAT_PREFIX}${courseId}`);
  deleteChatSession(`session_course_${courseId}`);
}

// Selected Course State Persistence
export function getStoredSelectedCourseId() {
  return getItem(STORAGE_KEYS.SELECTED_COURSE, null);
}

export function saveStoredSelectedCourseId(courseId) {
  if (courseId) {
    setItem(STORAGE_KEYS.SELECTED_COURSE, courseId);
  } else {
    removeItem(STORAGE_KEYS.SELECTED_COURSE);
  }
}
