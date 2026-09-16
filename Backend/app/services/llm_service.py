import google.genai as genai
from app.core.config import settings
from app.core.logging import logger
from datetime import datetime, timezone
import asyncio


class LLMService:
    def __init__(self):
        self._client = None
        self._api_available = bool(settings.gemini_api_key and settings.gemini_api_key != "YOUR_GEMINI_API_KEY_HERE")

    @property
    def client(self):
        if self._client is None and self._api_available:
            self._client = genai.Client(api_key=settings.gemini_api_key)
        return self._client

    async def generate_response(
        self,
        message: str,
        mode: str = "general",
        course_id: str = None,
    ) -> dict:
        try:
            if self._api_available:
                prompt = self._build_prompt(message, mode, course_id)
                response = await self._call_gemini(prompt)
                return {
                    "answer": response,
                    "sources": self._get_sources(mode, course_id),
                    "timestamp": self._get_timestamp(),
                }
            else:
                return self._get_mock_response(message, mode, course_id)
        except Exception as e:
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

    async def _call_gemini(self, prompt: str) -> str:
        loop = asyncio.get_event_loop()
        response = await loop.run_in_executor(
            None,
            lambda: self.client.models.generate_content(
                model="gemini-2.0-flash",
                contents=[{"role": "user", "parts": [prompt]}],
            ),
        )
        return response.candidates[0].content.parts[0].text

    def _get_sources(self, mode: str, course_id: str) -> list[str]:
        if mode == "course":
            return [f"Cranes Varsity Course Syllabus: {course_id}", "Academic Curriculum Guide"]
        return ["Cranes Varsity Official FAQ", "Admissions Handbook"]

    def _get_timestamp(self) -> str:
        return datetime.now(timezone.utc).isoformat()

    def _get_mock_response(self, message: str, mode: str, course_id: str) -> dict:
        return {
            "answer": f"Response to: {message} (mode: {mode}, course: {course_id}). [Mock mode - set GEMINI_API_KEY for real AI responses]",
            "sources": self._get_sources(mode, course_id),
            "timestamp": self._get_timestamp(),
        }