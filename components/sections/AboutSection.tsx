"use client";

import React from "react";
import { MapPin, Award, Terminal, Heart, Cpu } from "lucide-react";
import { PERSONAL_INFO } from "@/data/portfolioData";

interface AboutSectionProps {
  progress: number; // 0.0 to 1.0 overall progress
}

export const AboutSection: React.FC<AboutSectionProps> = ({ progress }) => {
  // Active range: 0.16 to 0.32
  let opacity = 0;
  if (progress >= 0.15 && progress <= 0.33) {
    if (progress < 0.21) {
      opacity = (progress - 0.15) / 0.06;
    } else if (progress > 0.27) {
      opacity = 1 - (progress - 0.27) / 0.06;
    } else {
      opacity = 1;
    }
  }

  if (opacity <= 0.01) return null;

  return (
    <section
      className="fixed inset-0 pointer-events-none flex flex-col justify-end lg:justify-center px-4 sm:px-8 md:px-12 xl:px-16 pb-24 sm:pb-20 lg:pb-0 z-20 transition-opacity duration-300"
      style={{ opacity }}
    >
      <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-6">
        {/* Left Flank: Who I Am Narrative */}
        <div className="w-full max-w-sm sm:max-w-md xl:max-w-lg flex flex-col justify-center pointer-events-auto p-4 sm:p-5 lg:p-0 rounded-2xl glass-card lg:glass-card-none lg:bg-transparent lg:border-none lg:shadow-none">

          <h2 className="text-xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-stone-950 uppercase leading-[1.1] mb-2 sm:mb-4">
            BEHIND THE WORK
            <span className="block text-stone-700 font-light mt-0.5 sm:mt-1">
              IS A PERSON WHO CARES
            </span>
            <span className="block text-amber-800 italic font-serif lowercase text-2xl sm:text-4xl">
              about the details.
            </span>
          </h2>

          <div className="text-xs sm:text-sm text-stone-700 leading-relaxed space-y-2 mb-4">
            <p className="font-medium text-stone-900">
              I&apos;m <span className="underline decoration-amber-500 decoration-2">{PERSONAL_INFO.name}</span>, a {PERSONAL_INFO.role} focused on creating modern digital experiences that combine strategy, design and technology.
            </p>
            <p className="hidden sm:block">
              {PERSONAL_INFO.aboutBio}
            </p>
          </div>

          {/* Experience Indicators */}
          <div className="grid grid-cols-2 gap-2 sm:gap-3 pt-1">
            <div className="glass-card p-2.5 sm:p-3 rounded-xl border border-white/70 shadow-sm flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-600 shrink-0" />
              <div>
                <div className="text-xs font-bold text-stone-900 font-mono">
                  {PERSONAL_INFO.experienceYears}
                </div>
                <div className="text-[10px] text-stone-500">
                  Crafting Flagships
                </div>
              </div>
            </div>

            <div className="glass-card p-2.5 sm:p-3 rounded-xl border border-white/70 shadow-sm flex items-center gap-2">
              <Cpu className="w-4 h-4 text-stone-600 shrink-0" />
              <div>
                <div className="text-xs font-bold text-stone-900 font-mono">
                  {PERSONAL_INFO.projectsShipped}
                </div>
                <div className="text-[10px] text-stone-500">
                  Shipped Globally
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Flank: Floating Digital Profile Artifacts (Desktop) */}
        <div className="hidden lg:flex w-full max-w-xs xl:max-w-sm flex-col gap-3.5 items-end pointer-events-auto">
          <div className="w-full glass-card p-4 sm:p-5 rounded-2xl border border-white/75 shadow-xl">
            <div className="flex items-center justify-between border-b border-stone-200/70 pb-2.5 mb-2.5">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-stone-900 text-stone-100 flex items-center justify-center text-[10px] font-mono">
                  AC
                </div>
                <span className="text-xs font-mono font-bold text-stone-900">
                  CREATIVE PASSPORT
                </span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-semibold">
                ACTIVE
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-stone-100">
                <span className="text-stone-500 font-mono">DISCIPLINE</span>
                <span className="font-semibold text-stone-900">Design &amp; Dev</span>
              </div>
              <div className="flex justify-between py-1 border-b border-stone-100">
                <span className="text-stone-500 font-mono">LOCATION</span>
                <span className="font-semibold text-stone-900 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-stone-600" />
                  SF / Tokyo
                </span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-stone-500 font-mono">PHILOSOPHY</span>
                <span className="font-semibold text-amber-800">Precision × Emotion</span>
              </div>
            </div>
          </div>

          <div className="w-full glass-card p-3.5 rounded-xl border border-white/70 shadow-md">
            <div className="flex items-center gap-2 text-amber-700 text-xs font-mono mb-1">
              <Heart className="w-3.5 h-3.5 fill-amber-700/20" />
              <span className="font-semibold">CORE CONVICTION</span>
            </div>
            <p className="text-xs text-stone-700 leading-snug italic font-serif">
              &ldquo;Great code without taste is hollow. Great design without performance is unusable.&rdquo;
            </p>
          </div>

          <div className="w-full glass-dark p-3.5 rounded-xl font-mono text-[11px] shadow-lg">
            <div className="flex items-center gap-1.5 text-stone-400 text-[10px] mb-1.5 border-b border-stone-700 pb-1">
              <Terminal className="w-3 h-3" />
              <span>alexander@macbook: ~</span>
            </div>
            <div className="text-stone-300">
              <span className="text-amber-400">$</span> stack --inspect
            </div>
            <div className="text-stone-400 text-[10px] mt-0.5">
              &gt; React 19, Next.js, WebGL, GSAP
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
