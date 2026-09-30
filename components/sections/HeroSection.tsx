"use client";

import React from "react";
import { ArrowDown, Sparkles, Compass, Code2 } from "lucide-react";
import { PERSONAL_INFO } from "@/data/portfolioData";

interface HeroSectionProps {
  progress: number; // 0.0 to 1.0 overall progress
  onViewWork: () => void;
  onOpenContact: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  progress,
  onViewWork,
  onOpenContact,
}) => {
  // Active range: 0.00 to 0.14
  const opacity = Math.max(0, Math.min(1, 1 - (progress - 0.07) / 0.06));
  const translateY = progress * 100;

  if (opacity <= 0.01) return null;

  return (
    <section
      className="fixed inset-0 pointer-events-none flex flex-col justify-end lg:justify-center px-4 sm:px-8 md:px-12 xl:px-16 pb-24 sm:pb-20 lg:pb-0 z-20 transition-opacity duration-300"
      style={{
        opacity,
        transform: `translate3d(0, -${translateY}px, 0)`,
      }}
    >
      <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-6">
        {/* Left Flank: Big Editorial Headline & Benefit */}
        <div className="w-full max-w-sm sm:max-w-md xl:max-w-lg flex flex-col justify-center pointer-events-auto p-4 sm:p-5 lg:p-0 rounded-2xl glass-card lg:glass-card-none lg:bg-transparent lg:border-none lg:shadow-none">
          {/* Status Pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-pill text-stone-800 text-[11px] font-mono mb-2 sm:mb-4 self-start shadow-sm border border-white/60">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-medium tracking-wide">
              AVAILABLE FOR SELECT ENGAGEMENTS
            </span>
          </div>

          {/* Primary Editorial Headline */}
          <h1 className="text-xl sm:text-3xl lg:text-4xl xl:text-5xl font-extrabold tracking-tight text-stone-950 uppercase leading-[1.08] mb-2 sm:mb-4">
            BUILD DIGITAL EXPERIENCES
            <span className="block text-stone-700 font-light mt-0.5 sm:mt-1">
              THAT HELP BUSINESSES
            </span>
            <span className="block text-stone-900 mt-0.5 sm:mt-1">
              GET NOTICED, TRUSTED
            </span>
            <span className="block text-amber-800 italic font-serif lowercase text-2xl sm:text-4xl xl:text-5xl">
              &amp; chosen.
            </span>
          </h1>

          {/* Benefit Supporting Subtitle */}
          <p className="text-xs sm:text-sm text-stone-700 leading-relaxed mb-4 sm:mb-6 font-normal">
            {PERSONAL_INFO.heroSubtitle}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onViewWork}
              className="flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-full bg-stone-950 text-stone-50 hover:bg-stone-800 text-xs font-semibold tracking-wider transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer group"
            >
              <span>VIEW MY WORK</span>
              <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
            </button>

            <button
              onClick={onOpenContact}
              className="flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-full glass-card hover:bg-white text-stone-900 text-xs font-semibold tracking-wider transition-all duration-300 border border-white/80 shadow-md cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>LET&apos;S TALK</span>
            </button>
          </div>
        </div>

        {/* Right Flank: Floating UI Artifacts (Desktop) */}
        <div className="hidden lg:flex w-full max-w-xs xl:max-w-sm flex-col gap-3.5 items-end pointer-events-auto">
          {/* Artifact 1: Studio Spec Card */}
          <div className="w-full glass-card p-4 rounded-2xl border border-white/70 shadow-xl transition-all duration-300 hover:scale-[1.02]">
            <div className="flex items-center justify-between text-[11px] font-mono text-stone-500 mb-2">
              <span className="flex items-center gap-1.5">
                <Compass className="w-3 h-3 text-stone-700" />
                <span>STUDIO DISPATCH</span>
              </span>
              <span className="text-emerald-700 font-semibold">ONLINE</span>
            </div>
            <div className="text-xs font-semibold text-stone-900 mb-1">
              Alexander Chen Studio
            </div>
            <div className="text-[11px] text-stone-600 font-mono mb-2">
              {PERSONAL_INFO.coordinates}
            </div>
            <div className="text-[10px] text-stone-500 pt-2 border-t border-stone-200/60 flex items-center justify-between">
              <span>{PERSONAL_INFO.status}</span>
            </div>
          </div>

          {/* Artifact 2: Craft Focus Card */}
          <div className="w-full glass-card px-4 py-2.5 rounded-xl border border-white/70 shadow-md flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-stone-100 flex items-center justify-center text-stone-800 shrink-0">
              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            </div>
            <div className="flex flex-col">
              <span className="text-[11px] font-mono text-stone-800 font-semibold uppercase">
                Design &amp; Engineering
              </span>
              <span className="text-[10px] text-stone-500">
                Editorial art direction meets high performance
              </span>
            </div>
          </div>

          {/* Artifact 3: Modern Tech Fragment */}
          <div className="w-full glass-card px-4 py-2 rounded-xl border border-white/70 shadow-md flex items-center gap-2.5 text-stone-700 text-xs font-mono">
            <Code2 className="w-3.5 h-3.5 text-stone-500" />
            <span>React 19 • Next.js • GSAP</span>
          </div>
        </div>
      </div>
    </section>
  );
};
