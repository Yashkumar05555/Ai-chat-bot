import google.genai as genai
from app.core.config import settings
from app.core.logging import logger
from datetime import datetime, timezone
import asyncio
import re


def strip_markdown(text: str) -> str:
    """Remove Markdown formatting so the UI renders clean plain text."""
    if not text:
        return text
    text = text.replace("**", "")                     # **bold** (incl. stray/unbalanced pairs)
    text = re.sub(r"(?m)^\s*[*]\s+", "- ", text)      # * bullet -> - bullet
    text = re.sub(r"\*([^*\n]+)\*", r"\1", text)      # *italic*
    text = re.sub(r"`([^`\n]+)`", r"\1", text)         # `inline code`
    text = re.sub(r"(?m)^\s*#{1,6}\s+", "", text)     # # headings
    return text


class LLMService:
    def __init__(self):
        self._client = None
        self._api_available = bool(settings.gemini_api_key and settings.gemini_api_key != "YOUR_GEMINI_API_KEY_HERE")

    @property
    def client(self):
        if self._client is None and self._api_available:
            self._client = genai.Client(api_key=settings.gemini_api_key)
        return self._client

    def _require_api_key(self) -> None:
        if not self._api_available or self.client is None:
            raise RuntimeError(
                "GEMINI_API_KEY is not configured. Set a valid key in Backend/.env."
            )

    async def generate_response(
        self,
        message: str,
        mode: str = "general",
        course_id: str = None,
    ) -> dict:
        logger.info("LLM request: question extracted (mode=%s, courseId=%s)", mode, course_id)
        try:
            # Fail loudly when no key is configured instead of returning a
            # fake/mock answer. The frontend must receive a real Gemini answer
            # or a proper error (which surfaces as {type: "error"} over WS).
            self._require_api_key()
            prompt = self._build_prompt(message, mode, course_id)
            logger.info(
                "LLM request: knowledge/context retrieved (mode=%s, courseId=%s)",
                mode,
                course_id,
            )
            logger.info(
                "LLM request: sending Gemini request (model chain=%s)",
                settings.gemini_model_chain,
            )
            response_text = await self._call_gemini_with_fallback(prompt)
            logger.info("LLM request: Gemini response received (%d chars)", len(response_text or ""))
            return {
                "answer": strip_markdown(response_text),
                "sources": self._get_sources(mode, course_id),
                "timestamp": self._get_timestamp(),
            }
        except RuntimeError:
            raise
        except Exception as e:
            # Never log the API key.
            logger.error(f"LLM generation error: {e}")
            raise RuntimeError(f"Failed to generate AI response: {str(e)}")

    def _build_prompt(self, message: str, mode: str, course_id: str) -> str:
        base_instruction = (
            "You are Cranes Varsity AI Assistant. "
            "You are a virtual counselor for engineering admissions, "
            "technical curriculums, batch timings, and placement reports. "
            "Answer concisely and helpfully."
        )

        if mode == "course" and course_id:
            course_context = self._get_course_context(course_id)
            return f"{base_instruction}\n\nCourse context: {course_context}\n\nUser question: {message}"

        return f"{base_instruction}\n\nUser question: {message}"

    def _get_course_context(self, course_id: str) -> str:
        course_data = {
            "data-science-ai": "Data Science & AI program covers Python, Statistics, Machine Learning, Deep Learning, NLP, and Generative AI. 6 months.",
            "embedded-systems-automotive": "Embedded Systems & Automotive covers ARM Cortex-M4, Embedded Linux, FreeRTOS, CAN/LIN protocols. 5 months.",
            "iot-embedded-systems": "IoT & Embedded Systems covers ESP32, Raspberry Pi, MQTT, Cloud IoT. 4 months.",
            "vlsi-design-verification": "VLSI Design & Verification covers Verilog, SystemVerilog, UVM, FPGA/ASIC flows. 6 months.",
            "full-stack-java": "Full Stack Java covers Java 21, Spring Boot, React, PostgreSQL, Docker. 5 months.",
            "business-analytics": "Business Analytics covers Power BI, Tableau, SQL, Predictive Modeling. 4 months.",
        }
        return course_data.get(course_id, "General course information.")

    async def _call_gemini_with_fallback(self, prompt: str) -> str:
        """Try each configured model in order; fall back on quota/overload errors.

        Different Gemini models have independent free-tier quotas. The
        previously hardcoded `gemini-3.6-flash` frequently returns 429
        (20 req/day quota exhausted) or 503 (high demand), which surfaced in
        the frontend as the generic connectivity error. Falling back to the
        next model gives the request another independent quota bucket.
        """
        last_error: Exception | None = None
        for model in settings.gemini_model_chain:
            try:
                logger.info("LLM request: trying Gemini model=%s", model)
                text = await self._call_gemini(prompt, model)
                if not text or not text.strip():
                    raise RuntimeError(f"Gemini model {model} returned an empty response")
                logger.info("LLM request: Gemini model succeeded model=%s", model)
                return text
            except Exception as e:
                last_error = e
                if self._is_retryable_gemini_error(e):
                    logger.warning("LLM request: model %s unavailable (%s); trying fallback", model, str(e)[:200])
                    continue
                raise
        raise RuntimeError(f"All Gemini models unavailable. Last error: {last_error}")

    @staticmethod
    def _is_retryable_gemini_error(e: Exception) -> bool:
        msg = str(e)
        code = getattr(e, "code", None)
        if code in (429, 503):
            return True
        for token in ("429", "503", "RESOURCE_EXHAUSTED", "UNAVAILABLE", "overloaded", "high demand", "quota"):
            if token.lower() in msg.lower():
                return True
        return False

    async def _call_gemini(self, prompt: str, model: str) -> str:
        loop = asyncio.get_running_loop()
        response = await loop.run_in_executor(
            None,
            lambda: self.client.models.generate_content(
                model=model,
                contents=prompt,
            ),
        )
        return self._extract_response_text(response)

    @staticmethod
    def _extract_response_text(response) -> str:
        # Preferred SDK accessor.
        text = getattr(response, "text", None)
        if isinstance(text, str) and text.strip():
            return text
        # Fallback to the raw candidates structure.
        try:
            candidates = getattr(response, "candidates", None) or []
            if candidates:
                content = getattr(candidates[0], "content", None)
                parts = getattr(content, "parts", None) or []
                if parts:
                    part_text = getattr(parts[0], "text", None)
                    if isinstance(part_text, str) and part_text.strip():
                        return part_text
        except Exception:
            pass
        raise RuntimeError("Gemini returned no text (empty candidates/parts)")

    def _get_sources(self, mode: str, course_id: str) -> list[str]:
        if mode == "course":
            return [f"Cranes Varsity Course Syllabus: {course_id}", "Academic Curriculum Guide"]
        return ["Cranes Varsity Official FAQ", "Admissions Handbook"]

    def _get_timestamp(self) -> str:
        return datetime.now(timezone.utc).isoformat()