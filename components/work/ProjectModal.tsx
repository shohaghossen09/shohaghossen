"use client";

import React, { useEffect, useRef } from "react";
import {
  X,
  ExternalLink,
  CheckCircle2,
  Calendar,
  Sparkles,
  ArrowUpRight,
  Layers,
  Award,
  Zap,
} from "lucide-react";
import { Project } from "@/types/portfolio";
import { ProjectVisual } from "./ProjectVisual";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onOpenContact: (projectName?: string) => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  onOpenContact,
}) => {
  const modalContentRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (project) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
      setTimeout(() => {
        closeBtnRef.current?.focus();
      }, 50);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-10 bg-stone-900/60 backdrop-blur-md animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
    >
      <div
        ref={modalContentRef}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-3xl glass-card bg-stone-50/95 border border-white/90 p-5 sm:p-8 md:p-10 shadow-2xl text-stone-900 scrollbar-thin scrollbar-thumb-stone-300 scrollbar-track-transparent transition-all duration-300 backdrop-blur-2xl"
        style={{
          boxShadow:
            "0 25px 60px -15px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.9) inset",
        }}
      >
        {/* Close Button */}
        <button
          ref={closeBtnRef}
          onClick={onClose}
          aria-label="Close Project Details Dialog"
          className="absolute top-5 right-5 z-20 p-2.5 rounded-full bg-stone-200/80 hover:bg-stone-300 text-stone-700 hover:text-stone-950 border border-stone-300/80 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-stone-900"
        >
          <X className="w-5 h-5" />
        </button>

        {/* 1. Large Project Preview Visual Header */}
        <div className="mb-6 overflow-hidden rounded-2xl border border-stone-200 shadow-md">
          <ProjectVisual
            projectId={project.id}
            color={project.color}
            title={project.title}
            isLarge={true}
          />
        </div>

        {/* 2. Project Metadata Badges */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span
            className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider text-white shadow-sm"
            style={{ backgroundColor: project.color }}
          >
            {project.category}
          </span>
          {project.badge && (
            <span className="px-3 py-1 rounded-full text-xs font-mono text-stone-700 glass-card bg-stone-200/80 border border-stone-300">
              {project.badge}
            </span>
          )}
          <span className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-mono text-stone-600 glass-card bg-white/80 border border-stone-200">
            <Calendar className="w-3 h-3 text-stone-500" />
            <span>{project.year}</span>
          </span>
          {project.role && (
            <span className="px-3 py-1 rounded-full text-xs font-mono text-amber-900 bg-amber-100 border border-amber-300 font-semibold">
              {project.role}
            </span>
          )}
        </div>

        {/* 3. Title & Tagline */}
        <h2
          id="project-modal-title"
          className="text-2xl sm:text-4xl font-extrabold text-stone-950 tracking-tight mb-2"
        >
          {project.title}
        </h2>
        <p className="text-base sm:text-lg text-stone-700 font-medium mb-6 leading-relaxed">
          {project.tagline}
        </p>

        {/* 4. Action Buttons (Visit Website & GitHub) */}
        <div className="flex flex-wrap items-center gap-3 pb-8 mb-8 border-b border-stone-200/80">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold font-mono tracking-wider uppercase text-white bg-stone-950 hover:bg-stone-800 transition-all duration-300 hover:scale-[1.02] shadow-xl cursor-pointer"
            >
              <span>Visit Website</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          )}

          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-3 rounded-full glass-card bg-white hover:bg-stone-100 text-stone-800 border border-stone-300 text-xs font-bold font-mono tracking-wider uppercase transition-all duration-300 hover:border-stone-400 cursor-pointer shadow-sm"
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-4 h-4"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                />
              </svg>
              <span>Source Repository</span>
            </a>
          )}

          <button
            onClick={() => {
              onClose();
              onOpenContact(project.title);
            }}
            className="flex items-center gap-1.5 px-5 py-3 rounded-full bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold tracking-wider transition-all duration-300 cursor-pointer ml-auto shadow-md"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-200" />
            <span>Build Similar Project</span>
          </button>
        </div>

        {/* 5. Key Metrics & Client Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
          <div className="p-4 rounded-2xl glass-card bg-white/80 border border-stone-200/80 shadow-sm">
            <span className="text-[11px] font-mono text-stone-500 uppercase tracking-wider block mb-1">
              Client / Organization
            </span>
            <span className="text-sm font-semibold text-stone-900">
              {project.client}
            </span>
          </div>

          <div className="p-4 rounded-2xl glass-card bg-white/80 border border-stone-200/80 shadow-sm">
            <span className="text-[11px] font-mono text-stone-500 uppercase tracking-wider block mb-1">
              {project.metrics.label}
            </span>
            <span
              className="text-lg font-bold font-mono"
              style={{ color: project.color }}
            >
              {project.metrics.value}
            </span>
          </div>

          <div className="p-4 rounded-2xl glass-card bg-white/80 border border-stone-200/80 shadow-sm">
            <span className="text-[11px] font-mono text-stone-500 uppercase tracking-wider block mb-1">
              Architecture Delivery
            </span>
            <span className="text-sm font-semibold text-emerald-700 flex items-center gap-1">
              <Zap className="w-3.5 h-3.5" />
              100% Production Ready
            </span>
          </div>
        </div>

        {/* 6. Deep Technical Description & Case Study Breakdown */}
        <div className="space-y-6 mb-8 text-stone-800 text-sm leading-relaxed">
          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-amber-800 font-bold mb-2">
              Overview
            </h3>
            <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
              {project.description}
            </p>
          </div>

          {project.details && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-5 rounded-2xl glass-card bg-rose-50/60 border border-rose-200/80">
                <h4 className="text-xs font-mono text-rose-800 uppercase tracking-wider font-bold mb-2 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-rose-500" />
                  Engineering Challenge
                </h4>
                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                  {project.details.challenge}
                </p>
              </div>

              <div className="p-5 rounded-2xl glass-card bg-emerald-50/60 border border-emerald-200/80">
                <h4 className="text-xs font-mono text-emerald-800 uppercase tracking-wider font-bold mb-2 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-600" />
                  Engineered Solution
                </h4>
                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                  {project.details.solution}
                </p>
              </div>
            </div>
          )}

          {project.details?.impact && (
            <div className="p-4 rounded-xl glass-card bg-amber-50/90 border border-amber-200">
              <span className="text-xs font-mono text-amber-900 uppercase tracking-wider font-bold block mb-1">
                Measured Real-World Impact
              </span>
              <p className="text-xs sm:text-sm text-amber-900 leading-relaxed font-medium">
                {project.details.impact}
              </p>
            </div>
          )}

          {project.details?.testimonial && (
            <blockquote className="p-5 rounded-2xl glass-card bg-white/90 border-l-4 border-amber-600 italic text-stone-700 text-xs sm:text-sm shadow-sm">
              &ldquo;{project.details.testimonial.quote}&rdquo;
              <cite className="block mt-2 font-mono text-xs font-semibold not-italic text-stone-500">
                — {project.details.testimonial.author},{" "}
                {project.details.testimonial.role}
              </cite>
            </blockquote>
          )}
        </div>

        {/* 7. Key Features List */}
        {project.features && project.features.length > 0 && (
          <div className="mb-8">
            <h3 className="text-xs font-mono uppercase tracking-wider text-stone-600 font-bold mb-3 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Key Features &amp; Capabilities</span>
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {project.features.map((feature, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2.5 p-3 rounded-xl glass-card bg-white/80 border border-stone-200 text-xs text-stone-700 leading-relaxed shadow-xs"
                >
                  <CheckCircle2
                    className="w-4 h-4 shrink-0 mt-0.5"
                    style={{ color: project.color }}
                  />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* 8. Technologies Used */}
        <div className="mb-8">
          <h3 className="text-xs font-mono uppercase tracking-wider text-stone-600 font-bold mb-3 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-stone-600" />
            <span>Technologies &amp; Architecture</span>
          </h3>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span
                key={t}
                className="px-3 py-1.5 rounded-xl glass-card bg-white text-stone-800 border border-stone-300 text-xs font-mono font-medium shadow-xs"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* 9. Deliverables List */}
        {project.deliverables && (
          <div className="mb-8">
            <h3 className="text-xs font-mono uppercase tracking-wider text-stone-600 font-bold mb-3 flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-amber-600" />
              <span>Shipped Deliverables</span>
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.deliverables.map((item) => (
                <span
                  key={item}
                  className="px-3 py-1 rounded-full glass-card bg-stone-100 text-stone-700 border border-stone-200 text-xs font-mono"
                >
                  ✓ {item}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* 10. Bottom Footer Action */}
        <div className="pt-6 border-t border-stone-200 flex flex-wrap items-center justify-between gap-4">
          <div className="text-xs font-mono text-stone-500">
            Project ID: <span className="text-stone-900 font-bold">{project.id}</span>
          </div>

          <div className="flex items-center gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-full font-mono text-xs font-bold uppercase transition-all shadow-md cursor-pointer text-white bg-stone-950 hover:bg-stone-800"
              >
                Visit Live Site ↗
              </a>
            )}
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-full glass-card bg-stone-200/80 hover:bg-stone-300 text-stone-800 text-xs font-semibold font-mono tracking-wider transition-colors cursor-pointer border border-stone-300"
            >
              CLOSE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
