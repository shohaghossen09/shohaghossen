"use client";

import React from "react";
import { Sparkles, ArrowDown, Layers, Terminal, Cpu, Award } from "lucide-react";
import { PROJECT_CATEGORIES, ALL_PROJECTS } from "@/data/projectsData";

interface WorkHeroProps {
  activeCategory: string;
  onSelectCategory: (categoryId: string) => void;
  projectCount: number;
}

export const WorkHero: React.FC<WorkHeroProps> = ({
  activeCategory,
  onSelectCategory,
  projectCount,
}) => {
  const scrollToProjects = () => {
    const el = document.getElementById("projects-grid");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-[70vh] lg:min-h-[80vh] flex flex-col justify-center items-center text-center px-4 sm:px-6 lg:px-8 pt-28 pb-14 z-10">
      {/* Top Floating Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card bg-white/80 border border-white/90 text-stone-800 text-xs font-mono font-medium mb-6 shadow-xl backdrop-blur-xl animate-fade-in hover:scale-105 transition-transform duration-300">
        <Sparkles className="w-3.5 h-3.5 text-amber-600 animate-spin-slow" />
        <span className="tracking-wider uppercase font-semibold">FEATURED PORTFOLIO 2026</span>
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
      </div>

      {/* Main Title: MY WORK matching Home & About editorial design */}
      <h1 className="text-5xl sm:text-7xl lg:text-8xl font-extrabold tracking-tight text-stone-950 uppercase mb-5 leading-[1.05]">
        MY{" "}
        <span className="text-amber-800 font-serif italic lowercase text-5xl sm:text-7xl lg:text-8xl tracking-normal">
          work.
        </span>
      </h1>

      {/* Short Subtitle */}
      <p className="max-w-2xl text-sm sm:text-base lg:text-lg text-stone-700 font-normal leading-relaxed mb-10">
        A curated selection of digital products, scalable web architectures, and interactive experiences crafted with precision, performance, and attention to detail.
      </p>

      {/* Frosted Glass Credibility Metrics Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-5 max-w-3xl w-full mb-10">
        <div className="p-4 rounded-2xl glass-card bg-white/70 hover:bg-white/90 border border-white/80 shadow-lg hover:shadow-xl backdrop-blur-xl transition-all duration-300 hover:-translate-y-1">
          <div className="text-2xl sm:text-3xl font-extrabold font-mono text-amber-700">
            35+
          </div>
          <div className="text-[11px] font-mono uppercase tracking-wider text-stone-600 mt-1 font-semibold">
            Projects Shipped
          </div>
        </div>

        <div className="p-4 rounded-2xl glass-card bg-white/70 hover:bg-white/90 border border-white/80 shadow-lg hover:shadow-xl backdrop-blur-xl transition-all duration-300 hover:-translate-y-1">
          <div className="text-2xl sm:text-3xl font-extrabold font-mono text-emerald-700">
            100%
          </div>
          <div className="text-[11px] font-mono uppercase tracking-wider text-stone-600 mt-1 font-semibold">
            Production Ready
          </div>
        </div>

        <div className="p-4 rounded-2xl glass-card bg-white/70 hover:bg-white/90 border border-white/80 shadow-lg hover:shadow-xl backdrop-blur-xl transition-all duration-300 hover:-translate-y-1">
          <div className="text-2xl sm:text-3xl font-extrabold font-mono text-indigo-700">
            93.4%
          </div>
          <div className="text-[11px] font-mono uppercase tracking-wider text-stone-600 mt-1 font-semibold">
            ML Model Accuracy
          </div>
        </div>

        <div className="p-4 rounded-2xl glass-card bg-white/70 hover:bg-white/90 border border-white/80 shadow-lg hover:shadow-xl backdrop-blur-xl transition-all duration-300 hover:-translate-y-1">
          <div className="text-2xl sm:text-3xl font-extrabold font-mono text-rose-700">
            4+ Yrs
          </div>
          <div className="text-[11px] font-mono uppercase tracking-wider text-stone-600 mt-1 font-semibold">
            Full-Stack Lead
          </div>
        </div>
      </div>

      {/* Interactive Frosted Glass Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 max-w-4xl mb-8 p-1.5 rounded-full glass-card bg-white/60 border border-white/80 shadow-xl backdrop-blur-xl">
        {PROJECT_CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.id;
          const count =
            cat.id === "all"
              ? ALL_PROJECTS.length
              : ALL_PROJECTS.filter((p) => p.category === cat.id).length;

          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono font-medium transition-all duration-300 cursor-pointer ${
                isActive
                  ? "bg-stone-900 text-stone-50 font-bold shadow-lg scale-105"
                  : "text-stone-700 hover:text-stone-950 hover:bg-white/60"
              }`}
            >
              <span>{cat.name}</span>
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                  isActive
                    ? "bg-white/20 text-white"
                    : "bg-stone-200 text-stone-700"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Scroll Down Cue */}
      <button
        onClick={scrollToProjects}
        aria-label="Scroll to projects grid"
        className="group flex flex-col items-center gap-2 text-stone-600 hover:text-stone-950 transition-colors cursor-pointer"
      >
        <span className="text-[10px] font-mono uppercase tracking-widest font-semibold">
          Explore {projectCount} Selected Case Studies
        </span>
        <div className="w-8 h-8 rounded-full glass-card bg-white/70 border border-white/80 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
          <ArrowDown className="w-4 h-4 text-stone-700 group-hover:translate-y-0.5 transition-transform" />
        </div>
      </button>
    </section>
  );
};
