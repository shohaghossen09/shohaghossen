"use client";

import React, { useEffect } from "react";
import { X, ExternalLink, Award, Layers } from "lucide-react";
import { Project } from "@/types/portfolio";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (project) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-stone-900/60 backdrop-blur-md animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl bg-stone-50/95 border border-white/80 p-6 sm:p-8 md:p-10 shadow-2xl text-stone-900"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close Case Study"
          className="absolute top-6 right-6 p-2 rounded-full bg-stone-200/70 hover:bg-stone-300 text-stone-700 hover:text-stone-950 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-stone-500 uppercase tracking-widest mb-3">
          <span className="px-2.5 py-1 rounded-full bg-stone-200/60 font-semibold text-stone-800">
            {project.category}
          </span>
          <span>•</span>
          <span>{project.client}</span>
          <span>•</span>
          <span>{project.year}</span>
        </div>

        <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-stone-950 mb-3">
          {project.title}
        </h2>
        <p className="text-base sm:text-lg text-stone-700 leading-relaxed mb-6 font-medium">
          {project.tagline}
        </p>

        <div className="p-4 sm:p-5 rounded-2xl bg-amber-50 border border-amber-200/60 flex items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-600 text-white">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider font-mono text-amber-800">
                Key Performance Impact
              </div>
              <div className="text-xs text-amber-900/80">
                {project.metrics.label}
              </div>
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-bold font-mono text-amber-700">
            {project.metrics.value}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="p-5 rounded-2xl bg-white/70 border border-stone-200/70 shadow-sm">
            <h3 className="text-xs font-mono uppercase tracking-wider text-stone-500 mb-2 font-semibold">
              01 / The Challenge
            </h3>
            <p className="text-sm text-stone-700 leading-relaxed">
              {project.details.challenge}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white/70 border border-stone-200/70 shadow-sm">
            <h3 className="text-xs font-mono uppercase tracking-wider text-stone-500 mb-2 font-semibold">
              02 / The Engineered Solution
            </h3>
            <p className="text-sm text-stone-700 leading-relaxed">
              {project.details.solution}
            </p>
          </div>
        </div>

        <div className="border-t border-stone-200 pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-[11px] font-mono text-stone-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-stone-600" />
              <span>Core Stack</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="px-2.5 py-1 rounded-md bg-stone-200/70 text-stone-800 text-[11px] font-mono"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <button
            onClick={() => alert(`Navigating to live demonstration for ${project.title}`)}
            className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-stone-950 text-stone-100 hover:bg-stone-800 text-xs font-semibold tracking-wide transition-all shadow-md cursor-pointer self-start sm:self-auto"
          >
            <span>LIVE DEMO</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
