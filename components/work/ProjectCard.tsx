"use client";

import React from "react";
import { ArrowUpRight, Sparkles, Calendar } from "lucide-react";
import { Project } from "@/types/portfolio";
import { ProjectVisual } from "./ProjectVisual";

interface ProjectCardProps {
  project: Project;
  index: number;
  onSelect: (project: Project) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  index,
  onSelect,
}) => {
  return (
    <div
      onClick={() => onSelect(project)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect(project);
        }
      }}
      role="button"
      tabIndex={0}
      aria-label={`View project details for ${project.title}`}
      className="group relative flex flex-col justify-between rounded-3xl glass-card bg-white/75 hover:bg-white/95 border border-white/90 hover:border-amber-400/80 p-5 sm:p-6 transition-all duration-500 ease-out cursor-pointer hover:-translate-y-2 hover:shadow-2xl overflow-hidden focus:outline-none focus:ring-2 focus:ring-amber-500"
      style={{
        boxShadow: "0 15px 35px -10px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(255, 255, 255, 0.8) inset",
        animationDelay: `${index * 80}ms`,
      }}
    >
      {/* Subtle Ambient Color Glow Orb behind card on hover */}
      <div
        className="pointer-events-none absolute -top-20 -right-20 w-52 h-52 rounded-full opacity-0 group-hover:opacity-20 blur-2xl transition-opacity duration-700"
        style={{ backgroundColor: project.color }}
      />

      <div>
        {/* Visual Thumbnail */}
        <div className="mb-5 overflow-hidden rounded-2xl shadow-md border border-stone-200/60">
          <ProjectVisual
            projectId={project.id}
            color={project.color}
            title={project.title}
          />
        </div>

        {/* Category & Year Tags */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span
              className="w-2.5 h-2.5 rounded-full shadow-sm animate-pulse"
              style={{ backgroundColor: project.color }}
            />
            <span className="text-[11px] font-mono uppercase tracking-wider text-stone-600 font-bold">
              {project.category}
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-[11px] font-mono text-stone-500 glass-card bg-stone-100/80 px-2.5 py-0.5 rounded-full border border-stone-200">
            <Calendar className="w-3 h-3 text-stone-400" />
            <span>{project.year}</span>
          </div>
        </div>

        {/* Project Title */}
        <h3 className="text-xl sm:text-2xl font-extrabold text-stone-950 tracking-tight mb-2 group-hover:text-amber-800 transition-colors flex items-center justify-between">
          <span>{project.title}</span>
          <div className="w-7 h-7 rounded-full bg-stone-200/80 group-hover:bg-amber-600 text-stone-700 group-hover:text-white flex items-center justify-center transition-all duration-300 group-hover:rotate-45 shadow-sm">
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </h3>

        {/* Short Description */}
        <p className="text-xs sm:text-sm text-stone-600 line-clamp-3 leading-relaxed mb-4 font-normal">
          {project.description}
        </p>

        {/* Key Metrics Highlight Pill */}
        {project.metrics && (
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-card bg-amber-50/90 border border-amber-200 text-xs font-mono mb-4 shadow-sm">
            <span className="text-stone-600 font-medium">{project.metrics.label}:</span>
            <span className="font-bold text-amber-800 font-mono">
              {project.metrics.value}
            </span>
          </div>
        )}
      </div>

      <div>
        {/* Technology Tags */}
        <div className="flex flex-wrap gap-1.5 pt-4 border-t border-stone-200/70">
          {project.tech.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 rounded-lg glass-card bg-white/90 text-stone-700 text-[10px] font-mono font-medium border border-stone-200/80 group-hover:border-stone-400/80 transition-colors shadow-xs"
            >
              {tag}
            </span>
          ))}
          {project.tech.length > 4 && (
            <span className="px-2 py-1 rounded-lg glass-card bg-stone-100 text-stone-500 text-[10px] font-mono border border-stone-200">
              +{project.tech.length - 4}
            </span>
          )}
        </div>

        {/* Bottom CTA indicator */}
        <div className="mt-4 flex items-center justify-between text-xs font-mono font-medium text-stone-600 group-hover:text-stone-950 transition-colors pt-3 border-t border-stone-200/50">
          <span className="flex items-center gap-1.5 text-stone-700">
            <Sparkles className="w-3.5 h-3.5 text-amber-600 opacity-70 group-hover:opacity-100 group-hover:rotate-12 transition-all" />
            <span>Case Study</span>
          </span>
          <div className="flex items-center gap-2">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="px-3 py-1 rounded-full bg-stone-900 hover:bg-stone-800 text-stone-100 text-[11px] font-mono font-semibold transition-all hover:scale-105 shadow-sm cursor-pointer z-10"
              >
                Live Site ↗
              </a>
            )}
            <span className="text-amber-800 font-bold group-hover:translate-x-1 transition-transform">
              Details →
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
