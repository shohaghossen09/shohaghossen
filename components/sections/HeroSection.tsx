"use client";

import React from "react";
import { ArrowDown, Sparkles, Star, ShieldCheck, CheckCircle2 } from "lucide-react";
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

        {/* Right Flank: Client Satisfaction & 5-Star Rating Artifacts (Desktop) */}
        <div className="hidden lg:flex w-full max-w-xs xl:max-w-sm flex-col gap-3.5 items-end pointer-events-auto">
          {/* Artifact 1: Client Satisfaction Card */}
          <div className="w-full glass-card p-4 sm:p-5 rounded-2xl border border-white/75 shadow-xl transition-all duration-300 hover:scale-[1.02]">
            <div className="flex items-center justify-between text-[11px] font-mono text-stone-600 mb-2">
              <span className="flex items-center gap-1.5 font-bold text-stone-900">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>CLIENT SATISFACTION</span>
              </span>
              <span className="text-emerald-700 font-semibold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                100% VERIFIED
              </span>
            </div>
            <div className="text-xl sm:text-2xl font-extrabold text-stone-950 mb-1 font-mono tracking-tight flex items-baseline gap-2">
              <span>100%</span>
              <span className="text-xs font-sans text-stone-600 font-semibold uppercase">Client Happiness</span>
            </div>
            <p className="text-[11px] text-stone-600 leading-relaxed mb-3">
              Delivering high-performance, robust web and mobile applications with 100% on-time completion and dedicated post-launch support.
            </p>
            <div className="flex items-center gap-2 pt-2 border-t border-stone-200/60 text-[10px] font-mono text-stone-700">
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                On-Time Delivery
              </span>
              <span className="text-stone-300">•</span>
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                Flawless QA
              </span>
            </div>
          </div>

          {/* Artifact 2: 5-Star Rating & Review Card */}
          <div className="w-full glass-card p-4 rounded-2xl border border-white/75 shadow-lg transition-all duration-300 hover:scale-[1.02]">
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-1 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-[11px] font-mono font-bold text-stone-900 bg-amber-100/80 px-2 py-0.5 rounded-full">
                5.0 / 5.0 RATING
              </span>
            </div>
            <div className="text-xs font-bold text-stone-900 mb-0.5 uppercase tracking-wide">
              Top Rated Full-Stack Developer
            </div>
            <div className="text-[11px] text-stone-600 leading-snug">
              Consistent 5-star feedback from global founders, product managers, and enterprise clients.
            </div>
          </div>

          {/* Artifact 3: Quick Metric Badge */}
          <div className="w-full glass-card px-4 py-2 rounded-xl border border-white/70 shadow-md flex items-center justify-between text-stone-700 text-xs font-mono">
            <span className="font-semibold text-stone-900">35+ Projects Shipped</span>
            <span className="text-stone-300">•</span>
            <span className="text-amber-800 font-semibold">4+ Yrs Experience</span>
          </div>
        </div>
      </div>
    </section>
  );
};
