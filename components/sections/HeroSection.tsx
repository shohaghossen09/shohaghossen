"use client";

import React from "react";
import { ArrowDown, Sparkles, Star, ShieldCheck, CheckCircle2, Award, Rocket, ThumbsUp } from "lucide-react";
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
        {/* Left Flank: Pure Editorial Floating Typography (Card Background Completely Removed) */}
        <div className="w-full max-w-sm sm:max-w-md xl:max-w-lg flex flex-col justify-center pointer-events-auto bg-transparent border-none shadow-none p-0">
          {/* Primary Editorial Headline */}
          <h1 className="text-2xl sm:text-4xl lg:text-5xl xl:text-[54px] font-extrabold tracking-tight text-stone-950 uppercase leading-[1.06] mb-2 sm:mb-4">
            BUILD DIGITAL EXPERIENCES
            <span className="block text-stone-700 font-light mt-0.5 sm:mt-1">
              THAT HELP BUSINESSES
            </span>
            <span className="block text-stone-900 mt-0.5 sm:mt-1">
              GET NOTICED, TRUSTED
            </span>
            <span className="block text-amber-900 italic font-serif lowercase text-3xl sm:text-4xl xl:text-5xl">
              &amp; chosen.
            </span>
          </h1>

          {/* Benefit Supporting Subtitle */}
          <p className="text-xs sm:text-sm text-stone-800 leading-relaxed mb-4 sm:mb-6 font-normal max-w-md">
            {PERSONAL_INFO.heroSubtitle}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 mb-4 lg:mb-0">
            <button
              onClick={onViewWork}
              className="flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-stone-950 text-stone-50 hover:bg-stone-800 text-xs font-semibold tracking-wider transition-all duration-300 shadow-xl hover:shadow-2xl cursor-pointer group"
            >
              <span>VIEW MY WORK</span>
              <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
            </button>

            <button
              onClick={onOpenContact}
              className="flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-full glass-card bg-white/70 hover:bg-white text-stone-950 text-xs font-bold tracking-wider transition-all duration-300 border border-white/90 shadow-md cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>LET&apos;S TALK</span>
            </button>
          </div>

          {/* Mobile Proof Pill Bar (Visible on mobile/tablet so ratings & satisfaction are immediately seen) */}
          <div className="flex lg:hidden items-center gap-2 pt-2 text-[10px] sm:text-xs font-mono font-semibold text-stone-900">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/80 border border-white/90 shadow-sm">
              <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
              <span>5.0 Rating</span>
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/80 border border-white/90 shadow-sm">
              <ShieldCheck className="w-3 h-3 text-emerald-600" />
              <span>100% Satisfaction</span>
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/80 border border-white/90 shadow-sm">
              <Rocket className="w-3 h-3 text-amber-700" />
              <span>35+ Shipped</span>
            </span>
          </div>
        </div>

        {/* Right Flank: Ultra-Attractive Credibility & Social Proof Cards (Desktop) */}
        <div className="hidden lg:flex w-full max-w-xs xl:max-w-sm flex-col gap-3 items-end pointer-events-auto">
          {/* Card 1: 5.0 Star Rating & Top Rated Badge with Shimmer Glow */}
          <div className="w-full glass-card p-4 sm:p-5 rounded-2xl border border-white/85 shadow-2xl backdrop-blur-xl bg-white/80 transition-all duration-300 hover:scale-[1.02] hover:bg-white/90 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-amber-400/10 rounded-full blur-2xl pointer-events-none group-hover:bg-amber-400/20 transition-all" />

            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400 drop-shadow-sm" />
                ))}
              </div>
              <span className="text-[11px] font-mono font-bold text-amber-950 bg-amber-100/90 border border-amber-300/60 px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping" />
                5.0 / 5.0 RATING
              </span>
            </div>

            <div className="text-sm font-extrabold text-stone-950 mb-1 uppercase tracking-wide flex items-center gap-1.5">
              <span>TOP-RATED DEVELOPER</span>
              <Award className="w-4 h-4 text-amber-600" />
            </div>

            <p className="text-[11px] text-stone-600 leading-relaxed italic font-serif mb-2.5">
              &ldquo;Clean code, pixel-perfect UI execution, and seamless communication from day one.&rdquo;
            </p>

            <div className="text-[10px] font-mono text-stone-500 flex items-center justify-between pt-2 border-t border-stone-200/70">
              <span className="font-semibold text-stone-800">100% 5-Star Reviews</span>
              <span className="text-emerald-700 font-semibold">Worldwide Founders</span>
            </div>
          </div>

          {/* Card 2: 100% Client Satisfaction & Trust Card */}
          <div className="w-full glass-card p-4 sm:p-5 rounded-2xl border border-white/85 shadow-2xl backdrop-blur-xl bg-white/80 transition-all duration-300 hover:scale-[1.02] hover:bg-white/90 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-400/10 rounded-full blur-2xl pointer-events-none group-hover:bg-emerald-400/20 transition-all" />

            <div className="flex items-center justify-between text-[11px] font-mono mb-2">
              <span className="flex items-center gap-1.5 font-bold text-stone-900">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>CLIENT SATISFACTION</span>
              </span>
              <span className="text-emerald-700 font-semibold flex items-center gap-1 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                100% GUARANTEED
              </span>
            </div>

            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-3xl font-extrabold text-stone-950 font-mono tracking-tight">
                100%
              </span>
              <span className="text-xs font-semibold text-emerald-800 uppercase tracking-wide">
                Satisfaction Rate
              </span>
            </div>

            <p className="text-[11px] text-stone-600 leading-relaxed mb-3">
              Zero-defect engineering with rigorous cross-browser QA, extreme speed optimization, and on-time milestones.
            </p>

            <div className="flex items-center gap-2 pt-2 border-t border-stone-200/70 text-[10px] font-mono text-stone-700">
              <span className="flex items-center gap-1 text-stone-800 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                On-Time Delivery
              </span>
              <span className="text-stone-300">•</span>
              <span className="flex items-center gap-1 text-stone-800 font-medium">
                <ThumbsUp className="w-3.5 h-3.5 text-emerald-600" />
                Dedicated Support
              </span>
            </div>
          </div>

          {/* Card 3: Projects Shipped & Experience High-Impact Metric Bar */}
          <div className="w-full glass-card px-4 py-3 rounded-2xl border border-white/85 shadow-lg backdrop-blur-xl bg-white/80 flex items-center justify-between text-xs font-mono">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping" />
              <span className="font-bold text-stone-950">35+ Shipped</span>
            </div>
            <span className="text-stone-300">•</span>
            <span className="text-amber-900 font-semibold">4+ Years Exp</span>
            <span className="text-stone-300">•</span>
            <span className="text-emerald-700 font-bold">Dhaka, BD</span>
          </div>
        </div>
      </div>
    </section>
  );
};
