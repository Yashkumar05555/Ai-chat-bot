import React, { useState } from "react";
import {
  GraduationCap,
  Award,
  Users,
  Building2,
  CheckCircle2,
  Phone,
  Mail,
  MapPin,
  ExternalLink,
  ChevronRight,
  ArrowRight,
  Search,
  Filter,
  Calendar,
  Clock,
  Laptop,
  Layers,
  Cpu,
  BrainCircuit,
  Bot,
  Sparkles,
  TrendingUp,
  FileSpreadsheet,
  AlertCircle,
  Bell,
  ShieldCheck
} from "lucide-react";

/**
 * ExistingWebsite - Represents the Cranes Varsity CRM portal (https://cranesvarsitycrm.com/).
 * A clean, light corporate student admission and lead management portal for Cranes Varsity.
 */
export default function ExistingWebsite() {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const handleOpenChat = () => {
    window.dispatchEvent(new CustomEvent("open-cranes-chatbot"));
  };

  const sampleLeads = [
    {
      id: "LD-8491",
      name: "Rohit Verma",
      college: "RV College of Engineering, Bangalore",
      program: "Embedded Systems & Automotive",
      date: "Today, 10:45 AM",
      source: "AI Assistant",
      counselor: "Priya Sharma",
      status: "Counseling Scheduled",
      statusColor: "bg-blue-50 text-blue-700 border-blue-200"
    },
    {
      id: "LD-8490",
      name: "Ananya Rao",
      college: "BMS College of Engineering, Bangalore",
      program: "VLSI Design & Verification",
      date: "Today, 09:30 AM",
      source: "CRM Web Portal",
      counselor: "Kavitha R.",
      status: "Scholarship Cleared",
      statusColor: "bg-emerald-50 text-emerald-700 border-emerald-200"
    },
    {
      id: "LD-8489",
      name: "Karthik Subramanian",
      college: "PSG College of Technology, Coimbatore",
      program: "Data Science & AI",
      date: "Yesterday",
      source: "Walk-in Campus",
      counselor: "Vikram Sen",
      status: "Enrolled",
      statusColor: "bg-emerald-100 text-emerald-800 border-emerald-300"
    },
    {
      id: "LD-8488",
      name: "Sneha Patil",
      college: "COEP Technological University, Pune",
      program: "IoT & Embedded Systems",
      date: "Yesterday",
      source: "AI Assistant",
      counselor: "Priya Sharma",
      status: "New Inquiry",
      statusColor: "bg-amber-50 text-amber-700 border-amber-200"
    },
    {
      id: "LD-8487",
      name: "Aditya Nair",
      college: "NIT Calicut, Kerala",
      program: "VLSI Design & Verification",
      date: "14 Apr 2026",
      source: "CST Scholarship",
      counselor: "Kavitha R.",
      status: "Counseling Scheduled",
      statusColor: "bg-blue-50 text-blue-700 border-blue-200"
    },
    {
      id: "LD-8486",
      name: "Meera Krishnan",
      college: "MSRIT, Bangalore",
      program: "Full Stack Java & Cloud",
      date: "13 Apr 2026",
      source: "CRM Web Portal",
      counselor: "Vikram Sen",
      status: "Follow-up Due",
      statusColor: "bg-rose-50 text-rose-700 border-rose-200"
    }
  ];

  const filteredLeads = sampleLeads.filter((lead) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      lead.name.toLowerCase().includes(q) ||
      lead.program.toLowerCase().includes(q) ||
      lead.college.toLowerCase().includes(q);

    if (!matchesSearch) return false;

    if (activeTab === "all") return true;
    if (activeTab === "embedded") return lead.program.includes("Embedded");
    if (activeTab === "vlsi") return lead.program.includes("VLSI");
    if (activeTab === "ai") return lead.program.includes("Data Science");
    if (activeTab === "scheduled") return lead.status.includes("Scheduled");
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans antialiased selection:bg-blue-600 selection:text-white pb-20">
      {/* Top CRM Portal Info Bar */}
      <div className="bg-slate-900 text-slate-300 text-xs py-2 px-4 sm:px-8 flex flex-wrap items-center justify-between gap-3 border-b border-slate-800">
        <div className="flex items-center gap-4 text-[11px] sm:text-xs">
          <span className="flex items-center gap-1.5 font-medium text-white">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
            Cranes Varsity CRM Portal • Session 2026-27
          </span>
          <span className="hidden md:flex items-center gap-1.5 text-slate-400">
            <Phone className="w-3.5 h-3.5 text-blue-400" />
            +91 80 4112 0000
          </span>
          <span className="hidden lg:flex items-center gap-1.5 text-slate-400">
            <Mail className="w-3.5 h-3.5 text-blue-400" />
            counselor@cranesvarsity.com
          </span>
        </div>
        <div className="flex items-center gap-3 text-[11px]">
          <span className="bg-blue-900/70 text-blue-200 px-2 py-0.5 rounded border border-blue-700 font-medium">
            Bangalore Head Office • Kasturba Road
          </span>
          <span className="hidden sm:inline text-slate-400">
            Counselor Desk Active
          </span>
        </div>
      </div>

      {/* Main CRM Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-20 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between gap-4">
          {/* Brand Logo & Name */}
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-700 to-blue-600 text-white flex items-center justify-center font-black text-lg tracking-tighter shadow-sm relative overflow-hidden">
              <span className="relative z-10">CV</span>
              <div className="absolute top-0 right-0 w-4 h-4 bg-red-600 rotate-45 transform translate-x-2 -translate-y-2"></div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-lg font-black tracking-tight text-slate-900 leading-tight">
                  CRANES VARSITY
                </span>
                <span className="text-[10px] font-bold bg-red-600 text-white px-1.5 py-0.2 rounded uppercase tracking-wider">
                  CRM
                </span>
              </div>
              <span className="text-[10px] tracking-wide text-slate-500 font-medium block leading-none mt-0.5">
                Student Admission & Lead Management Portal
              </span>
            </div>
          </div>

          {/* CRM Navigation Links */}
          <nav className="hidden xl:flex items-center gap-6 text-xs font-semibold text-slate-600">
            <a href="#dashboard" className="text-blue-600 flex items-center gap-1 py-1 border-b-2 border-blue-600">
              <span>Dashboard</span>
            </a>
            <a href="#leads" className="hover:text-blue-600 transition-colors">
              Student Leads
            </a>
            <a href="#batches" className="hover:text-blue-600 transition-colors">
              2026 Batches
            </a>
            <a href="#scholarship" className="hover:text-blue-600 transition-colors">
              CST Scholarship Test
            </a>
            <a href="#placements" className="hover:text-blue-600 transition-colors">
              Placement Cell
            </a>
          </nav>

          {/* Counselor Profile & AI Assistant Trigger */}
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={handleOpenChat}
              className="flex items-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold px-3.5 py-2 rounded-xl border border-blue-200 transition-all shadow-2xs hover:shadow-xs"
            >
              <Bot className="w-4 h-4 text-blue-600" />
              <span>Ask AI Assistant</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            </button>

            <div className="hidden sm:flex items-center gap-2 pl-2 border-l border-slate-200">
              <div className="w-8 h-8 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 flex items-center justify-center font-bold text-xs">
                PS
              </div>
              <div className="text-left leading-none">
                <span className="text-xs font-bold text-slate-800 block">Priya Sharma</span>
                <span className="text-[10px] text-slate-500 font-medium">Sr. Counselor</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* CRM Notice Banner */}
      <div className="bg-gradient-to-r from-blue-700 via-blue-800 to-indigo-800 text-white py-3 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
              Live Alert
            </span>
            <span className="font-medium text-blue-100">
              Spring 2026 Batch Admissions Open: Embedded Systems & VLSI batches starting April 14th. CST Scholarship Round 2 active!
            </span>
          </div>
          <button
            type="button"
            onClick={handleOpenChat}
            className="text-white hover:text-blue-200 font-bold underline underline-offset-4 flex items-center gap-1 shrink-0"
          >
            <span>Consult AI for Batch Dates</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main CRM Body */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 pt-8 space-y-8">
        {/* KPI Metrics Row */}
        <section id="dashboard" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Active Student Leads
              </span>
              <div className="text-2xl font-black text-slate-900 mt-1">2,840</div>
              <span className="text-[11px] text-emerald-600 font-medium flex items-center gap-0.5 mt-1">
                <TrendingUp className="w-3 h-3" /> +18.4% this month
              </span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                2026 Admissions
              </span>
              <div className="text-2xl font-black text-slate-900 mt-1">846</div>
              <span className="text-[11px] text-blue-600 font-medium mt-1 block">
                Target: 1,000 (84.6% booked)
              </span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <GraduationCap className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                CST Scholarship Test
              </span>
              <div className="text-2xl font-black text-slate-900 mt-1">1,420</div>
              <span className="text-[11px] text-amber-600 font-medium mt-1 block">
                Up to 100% Fee Waiver
              </span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Award className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Placement Success
              </span>
              <div className="text-2xl font-black text-slate-900 mt-1">94.8%</div>
              <span className="text-[11px] text-purple-600 font-medium mt-1 block">
                100+ Hiring Partners
              </span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6" />
            </div>
          </div>
        </section>

        {/* Live CRM Leads Table Section */}
        <section id="leads" className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-5 border-b border-slate-200 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Recent Course Inquiries & Walk-In Leads
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Real-time student counseling queue synchronized with Cranes Varsity CRM
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              {/* Search */}
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search student, course, college..."
                  className="text-xs pl-8 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 placeholder-slate-400 w-52 sm:w-64"
                />
              </div>

              {/* Add Lead CTA */}
              <button
                type="button"
                onClick={handleOpenChat}
                className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-3.5 py-2 rounded-xl transition-colors shadow-2xs flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Inquire via AI</span>
              </button>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="px-5 py-2.5 bg-slate-50/70 border-b border-slate-200 flex items-center gap-2 overflow-x-auto">
            <span className="text-xs font-semibold text-slate-500 flex items-center gap-1 mr-1">
              <Filter className="w-3 h-3 text-slate-400" /> Filter:
            </span>
            {[
              { id: "all", label: "All Leads (6)" },
              { id: "embedded", label: "Embedded Systems" },
              { id: "vlsi", label: "VLSI Verification" },
              { id: "ai", label: "Data Science & AI" },
              { id: "scheduled", label: "Counseling Scheduled" }
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`text-xs px-3 py-1 rounded-full font-medium transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? "bg-blue-600 text-white"
                    : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Lead ID & Candidate</th>
                  <th className="py-3 px-4">College / Degree</th>
                  <th className="py-3 px-4">Target Track</th>
                  <th className="py-3 px-4">Inquiry Time</th>
                  <th className="py-3 px-4">Counselor</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-900">{lead.name}</div>
                      <div className="text-[10px] text-slate-400 font-mono">{lead.id} • {lead.source}</div>
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 max-w-xs truncate">
                      {lead.college}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100">
                        {lead.program}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-500">
                      {lead.date}
                    </td>
                    <td className="py-3.5 px-4 text-slate-700 font-medium">
                      {lead.counselor}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`text-[10px] font-bold px-2 py-1 rounded-md border ${lead.statusColor}`}>
                        {lead.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        type="button"
                        onClick={handleOpenChat}
                        className="text-xs font-semibold text-blue-600 hover:text-blue-800 hover:underline"
                      >
                        Ask AI
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 2026 Batches & Labs Matrix */}
        <section id="batches" className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Active 2026 Academic Batches & Lab Allocation
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                High-performance hardware kits and EDA workstation lab suites
              </p>
            </div>
            <button
              type="button"
              onClick={handleOpenChat}
              className="text-xs font-semibold text-blue-600 hover:underline flex items-center gap-1"
            >
              <span>Check Seat Availability</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold uppercase bg-blue-50 text-blue-700 px-2 py-0.5 rounded border border-blue-100">
                    Batch EMD-26A
                  </span>
                  <span className="text-xs font-bold text-emerald-600">28/30 Seats Full</span>
                </div>
                <h4 className="text-sm font-bold text-slate-900">Embedded Systems & Automotive</h4>
                <p className="text-xs text-slate-500 mt-1">ARM Cortex-M4 Kits, FreeRTOS & CAN Bus Protocol Lab</p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span>Starts: Apr 14, 2026</span>
                <span className="font-semibold text-blue-600">Lab Suite 1</span>
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold uppercase bg-purple-50 text-purple-700 px-2 py-0.5 rounded border border-purple-100">
                    Batch VLS-26B
                  </span>
                  <span className="text-xs font-bold text-emerald-600">24/25 Seats Full</span>
                </div>
                <h4 className="text-sm font-bold text-slate-900">VLSI Design & Verification</h4>
                <p className="text-xs text-slate-500 mt-1">SystemVerilog, UVM & Industry EDA Linux Workstations</p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span>Starts: Apr 21, 2026</span>
                <span className="font-semibold text-purple-600">Silicon Lab 2</span>
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold uppercase bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded border border-emerald-100">
                    Batch DSA-26A
                  </span>
                  <span className="text-xs font-bold text-emerald-600">22/30 Seats Full</span>
                </div>
                <h4 className="text-sm font-bold text-slate-900">Data Science & Generative AI</h4>
                <p className="text-xs text-slate-500 mt-1">PyTorch, LLMs, Computer Vision & GPU Cluster Lab</p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span>Starts: May 02, 2026</span>
                <span className="font-semibold text-emerald-600">Cloud AI Lab</span>
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold uppercase bg-amber-50 text-amber-700 px-2 py-0.5 rounded border border-amber-100">
                    Batch IOT-26A
                  </span>
                  <span className="text-xs font-bold text-emerald-600">18/25 Seats Full</span>
                </div>
                <h4 className="text-sm font-bold text-slate-900">IoT & Edge Computing</h4>
                <p className="text-xs text-slate-500 mt-1">ESP32, MQTT Broker, Sensor Hubs & AWS IoT Core</p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span>Starts: May 12, 2026</span>
                <span className="font-semibold text-amber-600">Edge Lab 4</span>
              </div>
            </div>
          </div>
        </section>

        {/* Top Hiring Partners */}
        <section id="placements" className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Leading Semiconductor & Software Hiring Partners
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Cranes Varsity alumni work in top R&D global tech companies
              </p>
            </div>
            <div className="text-xs font-semibold text-slate-600 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-blue-600" />
              <span>Highest Package: ₹24 LPA • Avg: ₹7.2 LPA</span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {[
              "Texas Instruments",
              "Qualcomm",
              "Bosch Automotive",
              "Intel Corporation",
              "Synopsys",
              "Tata Elxsi"
            ].map((company, i) => (
              <div
                key={i}
                className="bg-slate-50 p-3 rounded-xl border border-slate-200/80 text-center font-bold text-xs text-slate-700 flex items-center justify-center min-h-[52px]"
              >
                {company}
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* CRM Footer */}
      <footer className="mt-16 border-t border-slate-200 bg-white py-8 px-4 sm:px-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="font-bold text-slate-800">Cranes Varsity CRM Portal</span> • Official Admissions & Training Management System
            <div className="text-[11px] text-slate-400 mt-0.5">
              Headquarters: No. 2, Kasturba Road, Opposite Cubbon Park, Bangalore - 560001
            </div>
          </div>
          <div className="flex items-center gap-4 text-slate-600 font-medium">
            <span>CRM v4.8.2</span>
            <span>Security Compliant</span>
            <button
              type="button"
              onClick={handleOpenChat}
              className="text-blue-600 font-bold hover:underline"
            >
              Open AI Assistant
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
