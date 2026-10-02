"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  Printer,
  Download,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  GraduationCap,
  Code2,
  Cpu,
  Layers,
  CheckCircle2,
  Calendar,
  ExternalLink,
  ChevronRight,
  Award,
  Terminal,
  ShieldCheck,
  Languages,
  Heart,
  Copy,
  Check,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { ContactModal } from "@/components/modals/ContactModal";
import { PERSONAL_INFO } from "@/data/portfolioData";

const LinkedinIcon = ({ className = "w-3.5 h-3.5" }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45a1.6 1.6 0 0 0-1.6 1.6 1.6 1.6 0 0 0 1.6 1.6 1.6 1.6 0 0 0 1.6-1.6 1.6 1.6 0 0 0-1.6-1.6Z" />
  </svg>
);

type SectionTab = "all" | "experience" | "skills" | "projects" | "education";

export default function CVPage() {
  const [activeTab, setActiveTab] = useState<SectionTab>("all");
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  // Ambient Floating Dust Particles on Canvas matching Home & About pages
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const particleCount = 26;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2 + 1,
      speedX: (Math.random() - 0.5) * 0.35,
      speedY: -(Math.random() * 0.45 + 0.15),
      alpha: Math.random() * 0.25 + 0.08,
    }));

    let animId: number;
    const renderParticles = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX;
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        ctx.fillStyle = `rgba(252, 249, 244, ${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animId = requestAnimationFrame(renderParticles);
    };
    renderParticles();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  const handlePrint = () => {
    window.print();
  };

  return (
    <main
      className="relative w-full min-h-screen text-stone-900 selection:bg-stone-900 selection:text-white overflow-x-hidden font-sans pb-32"
      style={{
        background: "radial-gradient(ellipse at 50% 45%, #b8aca0 0%, #aa9e92 50%, #998e83 100%)",
      }}
    >
      {/* Print Specific CSS to produce clean document output */}
      <style jsx global>{`
        @media print {
          body {
            background: #ffffff !important;
            color: #000000 !important;
          }
          header, nav, canvas, aside, .no-print {
            display: none !important;
          }
          main {
            background: #ffffff !important;
            padding: 0 !important;
            min-height: auto !important;
          }
          .glass-card {
            background: #ffffff !important;
            border: 1px solid #e5e5e5 !important;
            box-shadow: none !important;
            backdrop-filter: none !important;
          }
        }
      `}</style>

      {/* Floating Particles Canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full pointer-events-none z-0 opacity-40 no-print"
        aria-hidden="true"
      />

      {/* Top Fixed Header & Bottom Center Page Navigation */}
      <Navbar
        currentChapterId="cv"
        onNavigateChapter={() => {}}
        onOpenContactModal={() => setIsContactModalOpen(true)}
      />

      <div className="relative w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 z-10">
        
        {/* ============================================================== */}
        {/* CV HERO HEADER CARD                                            */}
        {/* ============================================================== */}
        <section className="glass-card p-6 sm:p-10 rounded-3xl border border-white/70 shadow-2xl backdrop-blur-xl bg-white/85 mb-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-stone-200/80">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-900 text-stone-100 text-xs font-mono mb-3 shadow-md">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>CURRICULUM VITAE • 2026</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-stone-950 mb-2">
                SHOHAG HOSSEN
              </h1>

              <p className="text-base sm:text-xl font-medium text-amber-900 font-serif italic mb-3">
                Full-Stack Developer | Technical Team Lead | IT Specialist
              </p>

              <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs font-mono text-stone-700">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-stone-600" />
                  <span>Badda, Dhaka, Bangladesh</span>
                </div>
                <span>•</span>
                <button
                  onClick={() => copyToClipboard("+8801646679886", "phone")}
                  className="flex items-center gap-1.5 hover:text-stone-950 transition-colors cursor-pointer"
                >
                  <Phone className="w-3.5 h-3.5 text-stone-600" />
                  <span>+880 1646-679-886</span>
                  {copiedField === "phone" ? (
                    <Check className="w-3 h-3 text-emerald-600" />
                  ) : (
                    <Copy className="w-3 h-3 opacity-50" />
                  )}
                </button>
                <span>•</span>
                <button
                  onClick={() => copyToClipboard("shohaghossen79886@gmail.com", "email")}
                  className="flex items-center gap-1.5 hover:text-stone-950 transition-colors cursor-pointer"
                >
                  <Mail className="w-3.5 h-3.5 text-stone-600" />
                  <span>shohaghossen79886@gmail.com</span>
                  {copiedField === "email" ? (
                    <Check className="w-3 h-3 text-emerald-600" />
                  ) : (
                    <Copy className="w-3 h-3 opacity-50" />
                  )}
                </button>
                <span>•</span>
                <a
                  href="https://www.linkedin.com/in/shohaghossen8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-stone-950 transition-colors text-[#0a66c2] hover:underline font-semibold"
                >
                  <LinkedinIcon className="w-3.5 h-3.5 text-[#0a66c2]" />
                  <span>linkedin.com/in/shohaghossen8</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
              </div>
            </div>

            {/* Quick Action CTAs (Print / Download / Contact / LinkedIn) */}
            <div className="flex flex-wrap lg:flex-col gap-2.5 w-full lg:w-auto no-print">
              <a
                href="https://www.linkedin.com/in/shohaghossen8"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#0a66c2] hover:bg-[#004182] text-white text-xs font-semibold tracking-wider transition-all shadow-md cursor-pointer"
              >
                <LinkedinIcon className="w-3.5 h-3.5" />
                <span>LINKEDIN PROFILE</span>
                <ExternalLink className="w-3 h-3 opacity-70" />
              </a>

              <button
                onClick={handlePrint}
                className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-stone-900 text-stone-100 hover:bg-stone-800 text-xs font-semibold tracking-wider transition-all shadow-md cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>PRINT / SAVE PDF</span>
              </button>

              <button
                onClick={() => setIsContactModalOpen(true)}
                className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold tracking-wider transition-all shadow-md cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>GET IN TOUCH</span>
              </button>
            </div>
          </div>

          {/* Professional Summary */}
          <div className="pt-6">
            <h2 className="text-xs font-mono font-bold tracking-widest text-stone-500 uppercase mb-2">
              PROFESSIONAL SUMMARY
            </h2>
            <p className="text-xs sm:text-sm text-stone-800 leading-relaxed font-normal">
              B.Sc. in Computer Science and Engineering (CSE) graduate with experience as a Freelance Developer, Project Manager, Brand Promoter, Sales Executive, and Computer Trainer. Skilled in developing digital solutions, managing projects, training individuals, and building strong client relationships. Strong in communication, teamwork, problem-solving, critical thinking, leadership, and decision-making. Adaptable, responsible, and results-oriented, with the ability to work independently or effectively within a team.
            </p>
          </div>
        </section>

        {/* ============================================================== */}
        {/* INTERACTIVE SECTION FILTER TABS                                */}
        {/* ============================================================== */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none no-print">
          {[
            { id: "all", label: "All Overview" },
            { id: "experience", label: "Experience" },
            { id: "skills", label: "Technical Skills" },
            { id: "projects", label: "Projects & Leadership" },
            { id: "education", label: "Education & Details" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as SectionTab)}
              className={`px-4 py-2 rounded-full text-xs font-mono font-semibold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === tab.id
                  ? "bg-stone-900 text-white shadow-md scale-105"
                  : "glass-card text-stone-700 hover:text-stone-950 bg-white/70 hover:bg-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ============================================================== */}
        {/* PROFESSIONAL EXPERIENCE                                        */}
        {/* ============================================================== */}
        {(activeTab === "all" || activeTab === "experience") && (
          <section className="glass-card p-6 sm:p-8 rounded-3xl border border-white/70 shadow-2xl backdrop-blur-xl bg-white/85 mb-8">
            <div className="flex items-center gap-2 text-stone-900 text-sm font-mono font-bold mb-6 pb-2 border-b border-stone-200">
              <Briefcase className="w-4 h-4 text-amber-700" />
              <span>PROFESSIONAL EXPERIENCE</span>
            </div>

            <div className="space-y-6">
              {/* Role 1: Freelance Developer & Project Manager */}
              <div className="relative pl-6 border-l-2 border-amber-600 pb-2">
                <span className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-amber-600 border-2 border-white shadow-sm" />
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                  <h3 className="text-base sm:text-lg font-bold text-stone-950 uppercase">
                    Freelance Developer &amp; Project Manager
                  </h3>
                  <span className="text-xs font-mono font-semibold text-amber-900 bg-amber-100/90 px-2.5 py-0.5 rounded-full self-start">
                    2022 – Present • Remote
                  </span>
                </div>
                <div className="text-xs font-mono text-stone-600 mb-3">
                  Self-employed | Global Clients
                </div>
                <ul className="space-y-2 text-xs sm:text-sm text-stone-800 leading-relaxed list-disc pl-4">
                  <li>
                    Designed, developed, and deployed scalable WordPress and Laravel solutions, including <strong>IT Agency Websites</strong>, <strong>E-Commerce Stores</strong>, <strong>Portfolio Websites</strong>, <strong>Automated Booking Platforms</strong>, <strong>Lonestar App</strong>, and a <strong>Threat Detection Website</strong> to identify malware, phishing, and intrusion attempts with responsive interfaces and secure payment and data handling.
                  </li>
                  <li>
                    Managed end-to-end client projects, including requirements gathering, technical scoping, development, feedback cycles, deployment, and post-launch support, while collaborating with designers to align solutions with business requirements.
                  </li>
                </ul>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {["Laravel", "React", "WordPress", "Shopify", "Flutter", "REST APIs", "Payment Gateways", "SEO"].map((tag) => (
                    <span key={tag} className="text-[10px] font-mono px-2 py-0.5 rounded bg-white text-stone-700 border border-stone-200">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Role 2: Brand Promoter */}
              <div className="relative pl-6 border-l-2 border-stone-300 pb-2">
                <span className="absolute -left-[7px] top-0 w-3 h-3 rounded-full bg-stone-400 border-2 border-white" />
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                  <h3 className="text-sm sm:text-base font-bold text-stone-950 uppercase">
                    Brand Promoter
                  </h3>
                  <span className="text-xs font-mono text-stone-600 bg-stone-100 px-2 py-0.5 rounded-full self-start">
                    2024
                  </span>
                </div>
                <div className="text-xs font-mono text-stone-600 mb-2">
                  Individual | Chef&apos;s Table, Sun Quick, etc.
                </div>
                <p className="text-xs sm:text-sm text-stone-800 leading-relaxed">
                  Led direct brand promotion campaigns, customer engagement activations, product demonstrations, and field marketing initiatives for tier-one brands.
                </p>
              </div>

              {/* Role 3: Sales Executive */}
              <div className="relative pl-6 border-l-2 border-stone-300 pb-2">
                <span className="absolute -left-[7px] top-0 w-3 h-3 rounded-full bg-stone-400 border-2 border-white" />
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                  <h3 className="text-sm sm:text-base font-bold text-stone-950 uppercase">
                    Sales Executive
                  </h3>
                  <span className="text-xs font-mono text-stone-600 bg-stone-100 px-2 py-0.5 rounded-full self-start">
                    2022 – 2023
                  </span>
                </div>
                <div className="text-xs font-mono text-stone-600 mb-2">
                  Black (Clothing Brand)
                </div>
                <p className="text-xs sm:text-sm text-stone-800 leading-relaxed">
                  Managed customer relationships, retail sales operations, inventory coordination, and revenue optimization strategies with excellent interpersonal communication.
                </p>
              </div>

              {/* Role 4: Training Center Manager | Computer Trainer */}
              <div className="relative pl-6 border-l-2 border-stone-300">
                <span className="absolute -left-[7px] top-0 w-3 h-3 rounded-full bg-stone-400 border-2 border-white" />
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                  <h3 className="text-sm sm:text-base font-bold text-stone-950 uppercase">
                    Training Center Manager | Computer Trainer
                  </h3>
                  <span className="text-xs font-mono text-stone-600 bg-stone-100 px-2 py-0.5 rounded-full self-start">
                    2021 – 2022
                  </span>
                </div>
                <div className="text-xs font-mono text-stone-600 mb-2">
                  Computer Training Center
                </div>
                <p className="text-xs sm:text-sm text-stone-800 leading-relaxed">
                  Trained individual students and corporate batches in essential computing, programming fundamentals, web technologies, and office productivity tools while overseeing day-to-day center operations.
                </p>
              </div>
            </div>
          </section>
        )}

        {/* ============================================================== */}
        {/* TECHNICAL SKILLS & CORE COMPETENCIES                           */}
        {/* ============================================================== */}
        {(activeTab === "all" || activeTab === "skills") && (
          <section className="glass-card p-6 sm:p-8 rounded-3xl border border-white/70 shadow-2xl backdrop-blur-xl bg-white/85 mb-8">
            <div className="flex items-center gap-2 text-stone-900 text-sm font-mono font-bold mb-6 pb-2 border-b border-stone-200">
              <Code2 className="w-4 h-4 text-emerald-700" />
              <span>TECHNICAL SKILLS &amp; CORE COMPETENCIES</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Column 1: Technical Stack */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-xs font-mono font-bold uppercase text-stone-600 mb-2">
                    Languages, Frameworks &amp; CMS
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "React",
                      "Node.js",
                      "Laravel",
                      "WordPress",
                      "Shopify",
                      "Joomla",
                      "Flutter",
                      "Flutter Flow",
                      "JavaScript",
                      "PHP",
                      "HTML5/CSS3",
                    ].map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 rounded-full text-xs font-mono bg-stone-900 text-stone-50 font-medium shadow-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-mono font-bold uppercase text-stone-600 mb-2">
                    Digital &amp; Project Skills
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      "SEO Optimization",
                      "Project Scheduling",
                      "API Integration",
                      "Responsive Design",
                      "Deployment & Hosting",
                      "Security Hardening",
                    ].map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-1 rounded-full text-xs font-mono bg-white text-stone-800 border border-stone-200 shadow-sm"
                      >
                        ✓ {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-mono font-bold uppercase text-stone-600 mb-2">
                    Tools &amp; Environments
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {["Figma", "VS Code", "Photoshop", "MS Word", "Excel", "PowerPoint", "Git / GitHub"].map(
                      (tool) => (
                        <span
                          key={tool}
                          className="px-2.5 py-0.5 rounded text-xs font-mono bg-stone-100 text-stone-700"
                        >
                          {tool}
                        </span>
                      )
                    )}
                  </div>
                </div>
              </div>

              {/* Column 2: Core Competencies (Leadership & Interpersonal) */}
              <div className="bg-white/70 p-5 rounded-2xl border border-stone-200/80 shadow-sm">
                <h3 className="text-xs font-mono font-bold uppercase text-stone-600 mb-3 flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-amber-700" />
                  <span>CORE COMPETENCIES &amp; LEADERSHIP</span>
                </h3>
                <div className="grid grid-cols-2 gap-2 text-xs font-mono text-stone-800">
                  {[
                    "Communication",
                    "Teamwork",
                    "Problem-Solving",
                    "Critical Thinking",
                    "Time Management",
                    "Leadership",
                    "Decision-Making",
                    "Active Listening",
                    "Negotiation",
                    "Interpersonal Skills",
                  ].map((comp) => (
                    <div key={comp} className="flex items-center gap-2 p-1.5 rounded bg-white border border-stone-100">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                      <span>{comp}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ============================================================== */}
        {/* PROJECT & LEADERSHIP SHOWCASE                                  */}
        {/* ============================================================== */}
        {(activeTab === "all" || activeTab === "projects") && (
          <section className="glass-card p-6 sm:p-8 rounded-3xl border border-white/70 shadow-2xl backdrop-blur-xl bg-white/85 mb-8">
            <div className="flex items-center gap-2 text-stone-900 text-sm font-mono font-bold mb-6 pb-2 border-b border-stone-200">
              <ShieldCheck className="w-4 h-4 text-blue-700" />
              <span>PROJECT &amp; LEADERSHIP</span>
            </div>

            <div className="space-y-6">
              {/* Highlight 1: Undergraduate Thesis Project */}
              <div className="p-5 rounded-2xl bg-white/95 border border-stone-200 shadow-md">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                  <div>
                    <span className="text-[10px] font-mono text-emerald-800 font-bold uppercase tracking-wider bg-emerald-100 px-2 py-0.5 rounded-full inline-block mb-1">
                      UNDERGRADUATE THESIS PROJECT
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-stone-950 uppercase">
                      Team Leader — Cybersecurity Threat Detection System
                    </h3>
                  </div>
                  <span className="text-xs font-mono text-stone-600 self-start">
                    Dhaka International University
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-stone-800 leading-relaxed mb-3">
                  Led a team of developers and researchers in designing and developing a comprehensive cybersecurity threat detection system for malware, phishing, and intrusion detection.
                </p>
                <ul className="space-y-1.5 text-xs text-stone-700 list-disc pl-4 mb-3">
                  <li>Managed task allocation, project milestones, backend integration, and technical coordination across the entire research group.</li>
                  <li>Resolved complex development bottlenecks and supported successful thesis defense and completion within a tight deadline.</li>
                </ul>
                <div className="flex flex-wrap gap-1.5">
                  {["Threat Detection", "Backend Integration", "Security Research", "Technical Team Lead"].map((t) => (
                    <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded bg-stone-100 text-stone-700 border border-stone-200">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Highlight 2: Freelance Deliverables */}
              <div className="p-5 rounded-2xl bg-white/95 border border-stone-200 shadow-md">
                <h3 className="text-sm sm:text-base font-bold text-stone-950 uppercase mb-2">
                  Freelance Production Deployments
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono text-stone-800">
                  <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200 flex items-start gap-2">
                    <span className="text-amber-600 font-bold">01</span>
                    <div>
                      <div className="font-bold text-stone-900">IT Agency Websites</div>
                      <div className="text-[11px] text-stone-600">High-converting editorial portals with CMS.</div>
                    </div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200 flex items-start gap-2">
                    <span className="text-amber-600 font-bold">02</span>
                    <div>
                      <div className="font-bold text-stone-900">E-Commerce Stores</div>
                      <div className="text-[11px] text-stone-600">Secure checkout, inventory, and payment integration.</div>
                    </div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200 flex items-start gap-2">
                    <span className="text-amber-600 font-bold">03</span>
                    <div>
                      <div className="font-bold text-stone-900">Automated Booking Platforms</div>
                      <div className="text-[11px] text-stone-600">Self-serve schedule booking and client workflows.</div>
                    </div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200 flex items-start gap-2">
                    <span className="text-amber-600 font-bold">04</span>
                    <div>
                      <div className="font-bold text-stone-900">Lonestar Mobile App</div>
                      <div className="text-[11px] text-stone-600">Cross-platform mobile application engineered with Flutter.</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ============================================================== */}
        {/* EDUCATION, CERTIFICATIONS, LANGUAGES & INTERESTS               */}
        {/* ============================================================== */}
        {(activeTab === "all" || activeTab === "education") && (
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Education Card */}
            <div className="glass-card p-6 sm:p-7 rounded-3xl border border-white/70 shadow-2xl backdrop-blur-xl bg-white/85">
              <div className="flex items-center gap-2 text-stone-900 text-sm font-mono font-bold mb-4 pb-2 border-b border-stone-200">
                <GraduationCap className="w-4 h-4 text-amber-700" />
                <span>EDUCATION &amp; TRAINING</span>
              </div>

              <div className="space-y-4">
                <div>
                  <span className="text-xs font-mono font-bold text-amber-900 bg-amber-100 px-2 py-0.5 rounded-full inline-block mb-1">
                    2022 – 2026
                  </span>
                  <h3 className="text-base font-bold text-stone-950 uppercase">
                    B.Sc. in Computer Science &amp; Engineering
                  </h3>
                  <p className="text-xs font-mono text-stone-600">
                    Dhaka International University (DIU)
                  </p>
                </div>

                <div className="pt-3 border-t border-stone-200/80">
                  <span className="text-xs font-mono font-bold text-stone-700 uppercase block mb-1">
                    CERTIFICATIONS &amp; TRAINING
                  </span>
                  <div className="text-xs font-mono font-semibold text-stone-900">
                    Web Design &amp; Development | CIT
                  </div>
                </div>
              </div>
            </div>

            {/* Languages & Personal Interests */}
            <div className="glass-card p-6 sm:p-7 rounded-3xl border border-white/70 shadow-2xl backdrop-blur-xl bg-white/85">
              <div className="flex items-center gap-2 text-stone-900 text-sm font-mono font-bold mb-4 pb-2 border-b border-stone-200">
                <Languages className="w-4 h-4 text-emerald-700" />
                <span>LANGUAGES &amp; INTERESTS</span>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-xs font-mono font-bold text-stone-600 uppercase mb-2">
                    Languages
                  </h3>
                  <div className="flex gap-2">
                    <span className="px-3 py-1 rounded-full text-xs font-mono bg-white border border-stone-200 text-stone-800">
                      Bengali <strong className="text-emerald-700">(Native)</strong>
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-mono bg-white border border-stone-200 text-stone-800">
                      English <strong className="text-blue-700">(Proficient)</strong>
                    </span>
                  </div>
                </div>

                <div className="pt-3 border-t border-stone-200/80">
                  <h3 className="text-xs font-mono font-bold text-stone-600 uppercase mb-2 flex items-center gap-1.5">
                    <Heart className="w-3.5 h-3.5 text-rose-500" />
                    <span>Personal Interests</span>
                  </h3>
                  <div className="flex flex-wrap gap-1.5 text-xs font-mono text-stone-700">
                    {[
                      "Research & Innovation",
                      "Programming",
                      "Continuous Learning",
                      "Traveling",
                      "Movies",
                      "Music",
                      "Games",
                    ].map((interest) => (
                      <span key={interest} className="px-2.5 py-1 rounded bg-stone-100 text-stone-700">
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ============================================================== */}
        {/* BOTTOM CALL TO ACTION                                          */}
        {/* ============================================================== */}
        <section className="glass-card p-8 rounded-3xl border border-white/70 shadow-2xl backdrop-blur-xl bg-white/85 text-center no-print">
          <h2 className="text-2xl sm:text-3xl font-extrabold uppercase text-stone-950 mb-2">
            READY TO COLLABORATE?
          </h2>
          <p className="text-xs sm:text-sm text-stone-700 max-w-lg mx-auto mb-6">
            Available for full-time roles, technical team leadership, and select high-impact freelance engineering projects.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => setIsContactModalOpen(true)}
              className="flex items-center gap-2 px-8 py-3 rounded-full bg-stone-950 text-stone-50 hover:bg-stone-800 text-xs font-semibold tracking-wider transition-all shadow-xl cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>SEND A MESSAGE</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <Link
              href="/about"
              className="flex items-center gap-2 px-6 py-3 rounded-full glass-card hover:bg-white text-stone-900 text-xs font-semibold tracking-wider transition-all border border-stone-200/80 shadow-md cursor-pointer bg-white/70"
            >
              <span>EXPLORE 2D ABOUT ROUTE</span>
            </Link>
          </div>
        </section>

      </div>

      {/* Global Interactive Contact Modal */}
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </main>
  );
}
