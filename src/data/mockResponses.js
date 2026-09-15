/**
 * Mock responses knowledge-base for Cranes Varsity AI Chatbot
 */

export const COURSE_MOCK_RESPONSES = {
  "data-science-ai": {
    courseName: "Data Science & AI",
    welcome: "Hi! Ask me anything about the Data Science & AI course.",
    topics: "The Data Science & AI program covers Python, Statistics, Data Analysis, Machine Learning, Deep Learning, Data Visualization, Natural Language Processing, and Generative AI concepts (LLMs, Prompt Engineering, LangChain).",
    skills: "You will master Python (NumPy, Pandas, Matplotlib, Scikit-learn), PyTorch/TensorFlow, SQL, statistical hypothesis testing, ML pipelines, model deployment via FastAPI/Streamlit, and prompt engineering with Transformer models.",
    careers: "Graduates are hired into roles such as Data Scientist, Machine Learning Engineer, AI Research Associate, Business Intelligence Developer, and Quantitative Analyst with top MNCs and analytics startups.",
    duration: "The Data Science & AI diploma is 6 months long (approximately 480 hours of live mentor-led sessions, daily lab assignments, and 4 production-grade capstone projects).",
    prerequisites: "Basic programming understanding and fundamental high-school mathematics (calculus & linear algebra) are helpful, though our foundation module starts from scratch.",
    projects: "You will build real-world systems including Customer Churn Prediction, Fraud Detection in Fintech, Computer Vision object recognition, and an Enterprise Retrieval-Augmented Generation (RAG) QA Bot."
  },

  "embedded-systems-automotive": {
    courseName: "Embedded Systems & Automotive",
    welcome: "Hi! Ask me anything about the Embedded Systems & Automotive course.",
    topics: "The Embedded Systems & Automotive program covers Advanced C Programming, Data Structures, Microcontroller Architecture (ARM Cortex-M4), Embedded Linux, Device Drivers, FreeRTOS, and Automotive Communication Protocols (CAN, LIN, SPI, I2C, UART) along with AUTOSAR architecture basics.",
    skills: "You will develop deep competencies in bare-metal firmware development, hardware register configuration, RTOS task synchronization & semaphores, Linux kernel module programming, and CAN bus debugging using oscilloscopes & logic analyzers.",
    careers: "Key target roles include Embedded Firmware Engineer, Automotive Software Developer, Linux Device Driver Engineer, ECU Validation Engineer, and IoT Systems Developer with companies like Continental, Bosch, Aptiv, and Tata Elxsi.",
    duration: "The course duration is 5 months (comprehensive hands-on training with physical STM32/ARM hardware kits and dedicated lab mentorship).",
    hardware: "Students receive hands-on training on ARM Cortex-M microcontrollers, CAN transceivers, sensor breakout boards, logic analyzers, and industry debug probes (J-Link / ST-Link).",
    prerequisites: "A background in Electronics (ECE, EEE, E&I), Computer Science, or Mechatronics with an interest in hardware-software interfacing."
  },

  "iot-embedded-systems": {
    courseName: "IoT & Embedded Systems",
    welcome: "Hi! Ask me anything about the IoT & Embedded Systems course.",
    topics: "The IoT & Embedded Systems program covers Embedded C, ESP32 & Raspberry Pi hardware interfacing, Sensor telemetry, Wireless protocols (WiFi, BLE, Zigbee, LoRaWAN), Networking protocols (MQTT, HTTP, CoAP, WebSockets), and Cloud IoT integration (AWS IoT Core & Microsoft Azure IoT Hub).",
    skills: "You will gain skills in low-power firmware design, edge computing, sensor data acquisition, MQTT broker configuration, cloud dashboard visualization, and end-to-end device-to-cloud security implementation.",
    careers: "Graduates work as IoT Solution Architects, Firmware Developers, Smart Home Automation Engineers, Telematics Engineers, and Edge Computing Developers.",
    duration: "The program duration is 4 months (intensive practical modules featuring 3 multi-sensor hardware projects and cloud deployments).",
    cloud: "We cover AWS IoT Core, AWS Lambda for serverless telemetry processing, and Azure IoT Hub with real-time telemetry streaming into databases and monitoring dashboards.",
    prerequisites: "Basic understanding of C/Python and electronics components. Ideal for ECE, CSE, IT, and Instrumentation engineers."
  },

  "vlsi-design-verification": {
    courseName: "VLSI Design & Verification",
    welcome: "Hi! Ask me anything about the VLSI Design & Verification course.",
    topics: "The VLSI Design & Verification program covers Digital Design fundamentals, Verilog HDL modeling, SystemVerilog for verification, Universal Verification Methodology (UVM), ASIC/FPGA design flow, Static Timing Analysis (STA), and Linux shell scripting.",
    skills: "You will master writing synthesizable RTL code, developing testbenches with constrained-random verification, coverage-driven verification, building reusable UVM testbench architectures (agents, scoreboards, monitors, sequences), and running simulations on Synopsys/Cadence EDA tools.",
    careers: "High-paying semiconductor job roles include ASIC Verification Engineer, RTL Design Engineer, FPGA Design Engineer, and Silicon Validation Engineer at companies like Qualcomm, Intel, Broadcom, TI, and Synopsys.",
    duration: "The VLSI diploma spans 6 months with extensive access to high-performance EDA tool computing labs and industry case studies (e.g., AXI/AHB bus protocol verification).",
    tools: "You get hands-on experience with industry-grade EDA simulation tools, waveform viewers, Linting tools, and Xilinx Vivado FPGA synthesis suites.",
    prerequisites: "B.Tech/M.Tech in ECE, EEE, VLSI, or Microelectronics with solid grounding in digital logic and Boolean algebra."
  },

  "full-stack-java": {
    courseName: "Full Stack Java",
    welcome: "Hi! Ask me anything about the Full Stack Java course.",
    topics: "The Full Stack Java program covers Core Java (Java 17/21), Object-Oriented Programming, Spring Framework & Spring Boot, RESTful Web Services, Hibernate/JPA, Microservices Architecture, Relational Databases (PostgreSQL/MySQL), Modern React frontend, and Docker containerization.",
    skills: "You will acquire production-ready skills in building scalable multi-tier web applications, designing RESTful APIs, state management with React, database optimization, JWT authentication, containerization with Docker, and CI/CD with Git.",
    careers: "Graduates step into roles such as Full Stack Java Developer, Backend Software Engineer, Java Application Architect, and Enterprise Solutions Consultant across top IT service firms and product startups.",
    duration: "The program lasts 5 months with continuous pair programming, code reviews, and end-to-end full stack project building.",
    frameworks: "We specialize in Spring Boot 3, Spring Data JPA, Spring Security, React 18, Tailwind CSS, Hibernate, and JUnit mock testing.",
    prerequisites: "Logical aptitude and curiosity for software engineering. Suitable for graduates in BE/B.Tech, BCA, MCA, or working professionals transitioning into software."
  },

  "business-analytics": {
    courseName: "Business Analytics",
    welcome: "Hi! Ask me anything about the Business Analytics course.",
    topics: "The Business Analytics program covers Advanced Excel (Pivot tables, Macros, What-If Analysis), Relational SQL querying, Power BI report generation, Tableau data visualization, Statistical Decision Making, Exploratory Data Analysis with Python, and predictive business modeling.",
    skills: "You will learn to query complex schemas, build executive dashboards, automate reporting pipelines, perform cohort and customer churn analysis, and articulate actionable business insights to C-suite stakeholders.",
    careers: "Primary career paths include Business Analyst, BI Consultant, Marketing Analyst, Operations Analytics Specialist, and Financial Data Analyst.",
    duration: "The program spans 4 months with weekend and weekday batch options, designed specifically for rapid upskilling without career interruption.",
    tools: "Hands-on mastery of Microsoft Power BI, Tableau Desktop, PostgreSQL, Excel Modeling, and Python analytics libraries.",
    prerequisites: "Open to graduates from any discipline (B.Com, BBA, B.Sc, B.Tech, MBA). No prior coding experience required."
  }
};

/**
 * General response provider based on matched query keywords
 */
export function getGeneralMockAnswer(userText) {
  const query = userText.toLowerCase().trim();

  if (!query) {
    return "Please enter a question so I can assist you with information about Cranes Varsity!";
  }

  // Greetings
  if (/^(hi|hello|hey|greetings|good\s(morning|evening|afternoon)|namaste)\b/i.test(query)) {
    return "Hello! Welcome to Cranes Varsity. I can help you with course catalogs, admissions, campus details, placement records, and batch schedules. What would you like to know?";
  }

  // Thanks / appreciation
  if (/^(thanks|thank\syou|thx|awesome|great|cool)\b/i.test(query)) {
    return "You're very welcome! Feel free to ask more questions or explore our specific course programs whenever you are ready.";
  }

  // Courses query
  if (query.includes("course") || query.includes("program") || query.includes("offer") || query.includes("what do you teach") || query.includes("catalog")) {
    return "Cranes Varsity offers industry-leading programs in:\n• Data Science & AI\n• Embedded Systems & Automotive\n• IoT & Embedded Systems\n• VLSI Design & Verification\n• Full Stack Java\n• Business Analytics\n\nYou can also click 'Course Specific Query' from the Home screen to explore any specific domain in detail!";
  }

  // Placement / Job
  if (query.includes("placement") || query.includes("job") || query.includes("salary") || query.includes("package") || query.includes("company") || query.includes("hiring")) {
    return "Cranes Varsity has an outstanding placement track record with 100+ hiring partners including Bosch, Qualcomm, Intel, Continental, Texas Instruments, Wipro, and TCS. We offer dedicated placement grooming, resume clinics, technical mock interviews, and guaranteed interview opportunities.";
  }

  // Location / Campus
  if (query.includes("location") || query.includes("where") || query.includes("address") || query.includes("bangalore") || query.includes("campus") || query.includes("center")) {
    return "Cranes Varsity is centrally situated in Bangalore, Karnataka, India (near MG Road / Kasturba Road). Our campus features advanced hardware test labs, dedicated EDA software suites, and spacious seminar rooms.";
  }

  // Mode / Online vs Offline
  if (query.includes("online") || query.includes("classroom") || query.includes("offline") || query.includes("hybrid") || query.includes("timing") || query.includes("batch")) {
    return "We offer both interactive Classroom sessions (with full physical hardware lab access) and Live Instructor-Led Online batches with remote lab connectivity. Weekend batches are also available for working professionals.";
  }

  // Fee / Cost
  if (query.includes("fee") || query.includes("cost") || query.includes("price") || query.includes("installment") || query.includes("emi")) {
    return "Tuition fees range from ₹45,000 to ₹85,000 depending on the program depth and lab equipment. We offer flexible zero-cost EMI plans, installment options, and merit-based discount waivers. Speak to an advisor for active batch scholarship slots.";
  }

  // Eligibility / Qualifications
  if (query.includes("eligib") || query.includes("qualification") || query.includes("degree") || query.includes("btech") || query.includes("fresher")) {
    return "Eligible applicants include students and graduates of B.E./B.Tech (ECE, EEE, CSE, IT, Instrumentation, Mechanical), MCA, M.Sc, BCA, or B.Sc, as well as working professionals looking to transition to specialized engineering fields.";
  }

  // Contact / Admission
  if (query.includes("contact") || query.includes("phone") || query.includes("email") || query.includes("admission") || query.includes("call") || query.includes("number")) {
    return "You can reach Cranes Varsity admissions counselors at admissions@cranesvarsity.com or call +91 80 4112 0000. Our counseling office is open Monday through Saturday from 9:00 AM to 6:30 PM.";
  }

  // Default helpful response
  return "Cranes Varsity is a pioneer in technical training and embedded/VLSI education since 1998. Could you please specify whether your query is regarding Courses, Admissions, Placements, or Batch timings? You can also switch to 'Course Specific Query' for in-depth program curriculum details.";
}

/**
 * Course-specific query response matcher
 */
export function getCourseMockAnswer(userText, course) {
  const query = userText.toLowerCase().trim();
  const cData = COURSE_MOCK_RESPONSES[course?.id] || COURSE_MOCK_RESPONSES["data-science-ai"];

  // Topics / syllabus / curriculum
  if (query.includes("topic") || query.includes("syllabus") || query.includes("curriculum") || query.includes("covered") || query.includes("content") || query.includes("learn") && query.includes("what")) {
    return cData.topics;
  }

  // Skills / tools / tech
  if (query.includes("skill") || query.includes("tool") || query.includes("tech") || query.includes("software") || query.includes("framework")) {
    return cData.skills;
  }

  // Career / jobs / placement / salary
  if (query.includes("career") || query.includes("job") || query.includes("placement") || query.includes("opportunity") || query.includes("hire") || query.includes("role") || query.includes("salary")) {
    return cData.careers;
  }

  // Duration / period / timing / hours
  if (query.includes("duration") || query.includes("how long") || query.includes("months") || query.includes("hours") || query.includes("time") || query.includes("period")) {
    return cData.duration;
  }

  // Hardware / kit / labs
  if (query.includes("hardware") || query.includes("kit") || query.includes("lab") || query.includes("eda") || query.includes("microcontroller")) {
    return cData.hardware || cData.tools || `All students in ${cData.courseName} receive extensive guided lab access, industry simulation software, and mentorship for practical execution.`;
  }

  // Projects / capstone
  if (query.includes("project") || query.includes("capstone") || query.includes("practical") || query.includes("hands on") || query.includes("hands-on")) {
    return cData.projects || `In ${cData.courseName}, you complete 3 to 4 comprehensive capstone projects designed to mirror actual enterprise engineering requirements.`;
  }

  // Prerequisites / eligibility
  if (query.includes("prereq") || query.includes("eligib") || query.includes("prior") || query.includes("background") || query.includes("who can")) {
    return cData.prerequisites || `Graduates and engineers in relevant disciplines (ECE, EEE, CSE, IT, or science) with fundamental interest in ${cData.courseName} are eligible.`;
  }

  // Generic fallback within course context
  return `${cData.courseName}: ${cData.topics} For specific questions, ask about topics covered, skills acquired, career opportunities, or duration!`;
}
