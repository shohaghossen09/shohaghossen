"use client";

import React, { useState } from "react";
import { ShieldCheck, Eye, TrendingUp, Sparkles, Scale } from "lucide-react";
import { VALUE_PILLARS } from "@/data/portfolioData";

interface ValueSectionProps {
  progress: number; // 0.0 to 1.0 overall progress
}

const PILLAR_ICONS = {
  attention: Eye,
  trust: ShieldCheck,
  conversions: Sparkles,
  growth: TrendingUp,
};

export const ValueSection: React.FC<ValueSectionProps> = ({ progress }) => {
  // Active range: 0.80 to 0.90
  let opacity = 0;
  if (progress >= 0.79 && progress <= 0.91) {
    if (progress < 0.82) {
      opacity = (progress - 0.79) / 0.03;
    } else if (progress > 0.88) {
      opacity = 1 - (progress - 0.88) / 0.03;
    } else {
      opacity = 1;
    }
  }

  const [activePillarId, setActivePillarId] = useState<string>(VALUE_PILLARS[0].id);

  if (opacity <= 0.01) return null;

  const leftPillars = VALUE_PILLARS.slice(0, 2);
  const rightPillars = VALUE_PILLARS.slice(2, 4);
  const activePillar = VALUE_PILLARS.find((p) => p.id === activePillarId) || VALUE_PILLARS[0];
  const ActiveIcon = PILLAR_ICONS[activePillar.id as keyof typeof PILLAR_ICONS] || Sparkles;

  return (
    <section
      className="fixed inset-0 pointer-events-none flex flex-col justify-end lg:justify-center px-4 sm:px-8 md:px-12 xl:px-16 pb-24 sm:pb-20 lg:pb-0 z-20 transition-opacity duration-300"
      style={{ opacity }}
    >
      {/* Mobile View: Active Value Pillar Card at Bottom */}
      <div className="lg:hidden flex flex-col gap-2.5 pointer-events-auto w-full max-w-md mx-auto">
        <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {VALUE_PILLARS.map((p) => (
            <button
              key={p.id}
              onClick={() => setActivePillarId(p.id)}
              className={`px-3 py-1 rounded-full text-xs font-mono shrink-0 transition-all ${
                activePillarId === p.id
                  ? "bg-stone-900 text-white font-bold"
                  : "glass-card text-stone-700"
              }`}
            >
              {p.title}
            </button>
          ))}
        </div>

        <div className="p-4 rounded-2xl glass-card border border-white/80 shadow-xl">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-amber-600 text-white flex items-center justify-center">
                <ActiveIcon className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-stone-900">{activePillar.title}</h3>
                <span className="text-[10px] font-mono text-stone-500 uppercase">{activePillar.subtitle}</span>
              </div>
            </div>
            <div className="text-right">
              <span className="font-mono text-sm font-bold text-amber-800">{activePillar.metric}</span>
            </div>
          </div>
          <p className="text-xs text-stone-600 leading-relaxed mb-2">
            {activePillar.description}
          </p>
          <div className="text-[10px] text-stone-500 font-mono">
            {activePillar.metricLabel}
          </div>
        </div>
      </div>

      {/* Desktop View: Flanking Columns with 100% Clear Center Corridor */}
      <div className="hidden lg:flex w-full items-center justify-between gap-6">
        {/* Left Flank: Header + Attention & Trust */}
        <div className="w-full max-w-sm xl:max-w-md flex flex-col gap-3.5 pointer-events-auto">
          <div className="mb-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-pill text-stone-800 text-[11px] font-mono mb-2 shadow-sm border border-white/60">
              <Scale className="w-3.5 h-3.5 text-stone-600" />
              <span className="font-semibold tracking-wider uppercase">
                06 / CORE IMPACT &amp; VALUE
              </span>
            </div>

            <h2 className="text-xl xl:text-3xl font-extrabold tracking-tight text-stone-950 uppercase leading-tight mb-1">
              IT&apos;S NOT JUST ABOUT
              <span className="block text-amber-800 italic font-serif lowercase text-xl xl:text-2xl">
                building a website.
              </span>
            </h2>

            <p className="text-xs text-stone-700 leading-relaxed font-normal">
              It&apos;s about creating a digital experience that helps your business communicate clearly, build trust and convert attention into action.
            </p>
          </div>

          {leftPillars.map((pillar) => {
            const IconComp = PILLAR_ICONS[pillar.id as keyof typeof PILLAR_ICONS] || Sparkles;
            const isSelected = activePillarId === pillar.id;

            return (
              <div
                key={pillar.id}
                onMouseEnter={() => setActivePillarId(pillar.id)}
                className={`p-4 rounded-2xl glass-card transition-all duration-300 cursor-pointer border ${
                  isSelected
                    ? "border-amber-400 bg-white/90 shadow-xl scale-[1.01]"
                    : "border-white/60 hover:bg-white/70 opacity-85 hover:opacity-100"
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${
                        isSelected
                          ? "bg-amber-600 text-white"
                          : "bg-stone-200 text-stone-700"
                      }`}
                    >
                      <IconComp className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-xs sm:text-sm text-stone-950 tracking-tight">
                        {pillar.title}
                      </h3>
                      <span className="text-[10px] font-mono text-stone-500 uppercase tracking-wider">
                        {pillar.subtitle}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-stone-600 leading-relaxed mb-2">
                  {pillar.description}
                </p>

                <div className="pt-1.5 border-t border-stone-200/60 flex items-center justify-between">
                  <span className="text-[10px] text-stone-500 font-mono">
                    {pillar.metricLabel}
                  </span>
                  <span className="font-mono text-xs font-bold text-amber-800">
                    {pillar.metric}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Flank: Conversions & Growth */}
        <div className="w-full max-w-sm xl:max-w-md flex flex-col gap-3.5 pointer-events-auto items-end">
          {rightPillars.map((pillar) => {
            const IconComp = PILLAR_ICONS[pillar.id as keyof typeof PILLAR_ICONS] || Sparkles;
            const isSelected = activePillarId === pillar.id;

            return (
              <div
                key={pillar.id}
                onMouseEnter={() => setActivePillarId(pillar.id)}
                className={`w-full p-4 rounded-2xl glass-card transition-all duration-300 cursor-pointer border ${
                  isSelected
                    ? "border-amber-400 bg-white/90 shadow-xl scale-[1.01]"
                    : "border-white/60 hover:bg-white/70 opacity-85 hover:opacity-100"
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${
                        isSelected
                          ? "bg-amber-600 text-white"
                          : "bg-stone-200 text-stone-700"
                      }`}
                    >
                      <IconComp className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-xs sm:text-sm text-stone-950 tracking-tight">
                        {pillar.title}
                      </h3>
                      <span className="text-[10px] font-mono text-stone-500 uppercase tracking-wider">
                        {pillar.subtitle}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-stone-600 leading-relaxed mb-2">
                  {pillar.description}
                </p>

                <div className="pt-1.5 border-t border-stone-200/60 flex items-center justify-between">
                  <span className="text-[10px] text-stone-500 font-mono">
                    {pillar.metricLabel}
                  </span>
                  <span className="font-mono text-xs font-bold text-amber-800">
                    {pillar.metric}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
