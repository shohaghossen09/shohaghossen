"use client";

import React, { useState } from "react";
import { Briefcase, ArrowUpRight, Award, Monitor } from "lucide-react";
import { PROJECTS } from "@/data/portfolioData";
import { Project } from "@/types/portfolio";

interface WorkSectionProps {
  progress: number; // 0.0 to 1.0 overall progress
  onSelectProject: (project: Project) => void;
}

export const WorkSection: React.FC<WorkSectionProps> = ({
  progress,
  onSelectProject,
}) => {
  // Active range: 0.48 to 0.66
  let opacity = 0;
  if (progress >= 0.47 && progress <= 0.67) {
    if (progress < 0.51) {
      opacity = (progress - 0.47) / 0.04;
    } else if (progress > 0.63) {
      opacity = 1 - (progress - 0.63) / 0.04;
    } else {
      opacity = 1;
    }
  }

  const workRange = 0.66 - 0.48;
  const localProg = Math.max(0, Math.min(0.999, (progress - 0.48) / workRange));
  const activeIndex = Math.min(PROJECTS.length - 1, Math.floor(localProg * PROJECTS.length));
  const activeProject = PROJECTS[activeIndex];

  const [manualIndex, setManualIndex] = useState<number | null>(null);
  const currentProject = manualIndex !== null ? PROJECTS[manualIndex] : activeProject;
  const currentIndex = manualIndex !== null ? manualIndex : activeIndex;

  if (opacity <= 0.01) return null;

  const isLeft = currentIndex % 2 === 0;

  return (
    <section
      className="fixed inset-0 pointer-events-none flex flex-col justify-end lg:justify-center px-4 sm:px-8 md:px-12 xl:px-16 pb-24 sm:pb-20 lg:pb-0 z-20 transition-opacity duration-300"
      style={{ opacity }}
    >
      <div className="w-full flex flex-col justify-between h-full py-2">
        {/* Top Header & Indicator Tabs */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 pointer-events-auto">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-pill text-stone-800 text-[11px] font-mono mb-1 shadow-sm border border-white/60">
              <Briefcase className="w-3.5 h-3.5 text-stone-600" />
              <span className="font-semibold tracking-wider uppercase">04 / SELECTED WORK</span>
            </div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight text-stone-950 uppercase leading-none">
              BUILT TO MAKE AN
              <span className="text-amber-800 italic font-serif lowercase ml-2 text-xl sm:text-3xl">
                impact.
              </span>
            </h2>
          </div>

          <div className="flex items-center gap-1.5 p-1 rounded-full glass-card border border-white/60 text-xs font-mono">
            {PROJECTS.map((proj, idx) => (
              <button
                key={proj.id}
                onClick={() => setManualIndex(idx)}
                className={`px-3 py-1 rounded-full transition-all duration-200 cursor-pointer ${
                  currentIndex === idx
                    ? "bg-stone-900 text-white font-bold shadow-sm"
                    : "text-stone-600 hover:text-stone-900 hover:bg-white/40"
                }`}
              >
                0{idx + 1} {proj.title.split(" ")[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Spatial Floating Project Artifact: Alternating Left & Right with strict max-w-sm / xl:max-w-md */}
        <div className="w-full flex items-center justify-between flex-1 my-2">
          {/* Left Flank Container */}
          <div
            className={`w-full max-w-sm xl:max-w-md pointer-events-auto transition-all duration-500 ${
              isLeft ? "opacity-100 translate-x-0" : "lg:opacity-0 lg:-translate-x-8 lg:pointer-events-none"
            }`}
          >
            {isLeft && (
              <ProjectCard
                project={currentProject}
                onSelectProject={onSelectProject}
              />
            )}
          </div>

          {/* Right Flank Container */}
          <div
            className={`w-full max-w-sm xl:max-w-md pointer-events-auto transition-all duration-500 flex justify-end ${
              !isLeft ? "opacity-100 translate-x-0" : "lg:opacity-0 lg:translate-x-8 lg:pointer-events-none"
            }`}
          >
            {!isLeft && (
              <ProjectCard
                project={currentProject}
                onSelectProject={onSelectProject}
              />
            )}
          </div>
        </div>

        {/* Bottom Status bar */}
        <div className="hidden lg:flex items-center justify-between pointer-events-auto text-xs font-mono text-stone-600 pt-2 border-t border-stone-300/40">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-600" />
            <span>PROJECT 0{currentIndex + 1} OF 0{PROJECTS.length}</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-stone-500">
              Scroll or click tabs to explore portfolio artifacts
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

const ProjectCard: React.FC<{
  project: Project;
  onSelectProject: (p: Project) => void;
}> = ({ project, onSelectProject }) => {
  return (
    <div className="w-full glass-card p-4 sm:p-5 rounded-3xl border border-white/80 shadow-2xl transition-all duration-300 hover:shadow-3xl">
      <div className="flex items-center justify-between text-xs font-mono text-stone-500 mb-2 border-b border-stone-200/60 pb-1.5">
        <span className="font-semibold text-stone-700 uppercase tracking-wider">
          {project.category}
        </span>
        <span>{project.year}</span>
      </div>

      <h3 className="text-xl sm:text-2xl font-extrabold text-stone-950 tracking-tight mb-1">
        {project.title}
      </h3>

      <p className="text-xs text-stone-700 leading-relaxed mb-3 font-normal">
        {project.tagline}
      </p>

      {/* Visual Mockup Frame */}
      <div className="rounded-xl overflow-hidden border border-stone-200/80 bg-stone-900/90 p-3 mb-3 text-stone-100 shadow-inner">
        <div className="flex items-center justify-between pb-2 border-b border-stone-700/60 mb-2">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-red-500/80" />
            <span className="w-2 h-2 rounded-full bg-yellow-500/80" />
            <span className="w-2 h-2 rounded-full bg-green-500/80" />
            <span className="text-[10px] font-mono text-stone-400 ml-2">
              preview://{project.id}.live
            </span>
          </div>
          <Monitor className="w-3 h-3 text-stone-400" />
        </div>

        <div className="space-y-1">
          <div className="text-[11px] font-mono text-amber-400">
            {project.description}
          </div>
          <div className="flex items-center justify-between pt-1 text-[10px] font-mono text-stone-400">
            <span>CLIENT: {project.client}</span>
            <span className="text-emerald-400 font-semibold">{project.metrics.value}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-1 mb-4">
        {project.tech.map((t) => (
          <span
            key={t}
            className="px-2 py-0.5 rounded-md bg-stone-200/70 text-stone-800 text-[10px] font-mono"
          >
            {t}
          </span>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={() => onSelectProject(project)}
          className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full bg-stone-950 text-stone-50 hover:bg-stone-800 text-xs font-semibold tracking-wider transition-all shadow-md cursor-pointer"
        >
          <span>VIEW CASE STUDY</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>

        <div className="px-3 py-2 rounded-full glass-card border border-white/60 text-xs font-mono font-bold text-amber-800 flex items-center gap-1.5">
          <Award className="w-3.5 h-3.5 text-amber-600" />
          <span>{project.metrics.value}</span>
        </div>
      </div>
    </div>
  );
};
