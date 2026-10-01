"use client";

import React, { useState, useMemo } from "react";
import { Navbar } from "@/components/Navbar";
import { ContactModal } from "@/components/modals/ContactModal";
import { ALL_PROJECTS } from "@/data/projectsData";
import { Project } from "@/types/portfolio";
import { WorkHero } from "@/components/work/WorkHero";
import { ProjectCard } from "@/components/work/ProjectCard";
import { ProjectModal } from "@/components/work/ProjectModal";
import { BackgroundEffects } from "@/components/work/BackgroundEffects";
import { Sparkles, ArrowUpRight, Mail, FolderGit2 } from "lucide-react";
import { PERSONAL_INFO } from "@/data/portfolioData";

export default function WorkPage() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  // Filter projects based on activeCategory
  const filteredProjects = useMemo(() => {
    if (activeCategory === "all") return ALL_PROJECTS;
    return ALL_PROJECTS.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  const handleOpenContactWithProject = (projectName?: string) => {
    setIsContactModalOpen(true);
  };

  return (
    <main
      className="relative min-h-screen text-stone-900 selection:bg-stone-900 selection:text-white font-sans overflow-x-hidden"
      style={{
        background: "radial-gradient(ellipse at 50% 45%, #b8aca0 0%, #aa9e92 50%, #998e83 100%)",
      }}
    >
      {/* 1. Ambient Floating Particles & Soft Website Warm Lighting */}
      <BackgroundEffects />

      {/* 2. Top Header & Bottom Page Navigation in Frosted Glass (Home | About | Work | CV) */}
      <Navbar
        currentChapterId="work"
        onNavigateChapter={() => {}}
        onOpenContactModal={() => setIsContactModalOpen(true)}
      />

      {/* 3. Hero Header with Title 'My Work', Subtitle & Category Filters */}
      <WorkHero
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
        projectCount={filteredProjects.length}
      />

      {/* 4. Interactive Work Cards Responsive Grid */}
      <section
        id="projects-grid"
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32 z-10"
      >
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-stone-300/80">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-amber-800 font-bold block mb-1">
              PORTFOLIO ARCHIVE
            </span>
            <h2 className="text-xl sm:text-3xl font-extrabold text-stone-950 tracking-tight">
              {activeCategory === "all"
                ? "All Engineering Works"
                : `${activeCategory.toUpperCase()} PROJECTS`}
            </h2>
          </div>

          <div className="text-xs font-mono text-stone-600 glass-card bg-white/70 px-3 py-1.5 rounded-full border border-white/80 shadow-xs">
            SHOWING <span className="text-stone-950 font-bold">{filteredProjects.length}</span> OF{" "}
            <span className="text-stone-700">{ALL_PROJECTS.length}</span>
          </div>
        </div>

        {/* Responsive Grid: 1 col on mobile, 2 col on md, 3 col on xl */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
          {filteredProjects.map((project, idx) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={idx}
              onSelect={(p) => setSelectedProject(p)}
            />
          ))}
        </div>

        {/* Empty state safeguard if a filter has 0 items */}
        {filteredProjects.length === 0 && (
          <div className="py-20 text-center glass-card bg-white/70 p-10 rounded-3xl border border-white/80 max-w-md mx-auto shadow-xl">
            <FolderGit2 className="w-12 h-12 text-stone-400 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-stone-900 mb-1">
              No projects found in this category
            </h3>
            <p className="text-xs text-stone-600 mb-6">
              Try switching back to All Projects to see the full showcase.
            </p>
            <button
              onClick={() => setActiveCategory("all")}
              className="px-5 py-2.5 rounded-full bg-stone-900 text-stone-50 font-mono text-xs font-bold shadow-md cursor-pointer hover:bg-stone-800 transition-colors"
            >
              SHOW ALL PROJECTS
            </button>
          </div>
        )}

        {/* 5. Bottom Conversion Callout */}
        <div className="mt-20 p-8 sm:p-12 rounded-3xl glass-card bg-white/75 hover:bg-white/85 border border-white/90 text-center relative overflow-hidden shadow-2xl backdrop-blur-2xl transition-all duration-300">
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 max-w-2xl mx-auto">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-100/90 border border-amber-300 text-amber-900 text-xs font-mono font-semibold mb-4 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Let&apos;s Build Together</span>
            </span>

            <h3 className="text-2xl sm:text-4xl font-extrabold text-stone-950 tracking-tight mb-4">
              Have a project in mind? Let&apos;s bring it to reality.
            </h3>

            <p className="text-xs sm:text-sm text-stone-700 mb-8 leading-relaxed font-normal">
              Available for full-stack engineering, web design systems, AI integrations, and technical leadership engagements.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => setIsContactModalOpen(true)}
                className="flex items-center gap-2 px-7 py-3 rounded-full bg-stone-950 hover:bg-stone-800 text-stone-50 text-xs font-bold font-mono tracking-wider uppercase transition-all shadow-xl hover:shadow-2xl cursor-pointer"
              >
                <span>TRANSMIT BRIEF VIA RESEND</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="flex items-center gap-2 px-6 py-3 rounded-full glass-card bg-white hover:bg-stone-100 text-stone-900 border border-stone-300/80 text-xs font-bold font-mono tracking-wider transition-all cursor-pointer shadow-md"
              >
                <Mail className="w-4 h-4 text-stone-600" />
                <span>{PERSONAL_INFO.email}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Smooth Project Popup / Modal in Frosted Glass */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onOpenContact={handleOpenContactWithProject}
      />

      {/* 7. Contact Modal with Resend API Integration */}
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </main>
  );
}
