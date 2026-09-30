"use client";

import React, { useState } from "react";
import { Wrench, ArrowUpRight, Palette, Code, Layout, Layers, Sparkles, Zap, Check } from "lucide-react";
import { SERVICES } from "@/data/portfolioData";

interface ServicesSectionProps {
  progress: number; // 0.0 to 1.0 overall progress
  onOpenContact: () => void;
}

const ICONS = {
  palette: Palette,
  code: Code,
  layout: Layout,
  layers: Layers,
  sparkles: Sparkles,
  zap: Zap,
};

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  progress,
  onOpenContact,
}) => {
  // Active range: 0.32 to 0.48
  let opacity = 0;
  if (progress >= 0.30 && progress <= 0.49) {
    if (progress < 0.35) {
      opacity = (progress - 0.30) / 0.05;
    } else if (progress > 0.44) {
      opacity = 1 - (progress - 0.44) / 0.05;
    } else {
      opacity = 1;
    }
  }

  const [activeServiceId, setActiveServiceId] = useState<string>(SERVICES[0].id);

  if (opacity <= 0.01) return null;

  const leftServices = SERVICES.slice(0, 3);
  const rightServices = SERVICES.slice(3, 6);
  const activeService = SERVICES.find((s) => s.id === activeServiceId) || SERVICES[0];
  const ActiveIcon = ICONS[activeService.icon as keyof typeof ICONS] || Palette;

  return (
    <section
      className="fixed inset-0 pointer-events-none flex flex-col justify-end lg:justify-center px-4 sm:px-8 md:px-12 xl:px-16 pb-24 sm:pb-20 lg:pb-0 z-20 transition-opacity duration-300"
      style={{ opacity }}
    >
      {/* Mobile Layout: Active Service Drawer */}
      <div className="lg:hidden flex flex-col gap-2.5 pointer-events-auto w-full max-w-md mx-auto">
        <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {SERVICES.map((svc) => (
            <button
              key={svc.id}
              onClick={() => setActiveServiceId(svc.id)}
              className={`px-3 py-1 rounded-full text-xs font-mono shrink-0 transition-all ${
                activeServiceId === svc.id
                  ? "bg-stone-900 text-white font-bold"
                  : "glass-card text-stone-700"
              }`}
            >
              0{svc.number} {svc.title.split(" ")[0]}
            </button>
          ))}
        </div>

        <div className="p-4 rounded-2xl glass-card border border-white/80 shadow-xl">
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-amber-600 text-white flex items-center justify-center">
                <ActiveIcon className="w-3.5 h-3.5" />
              </div>
              <h3 className="font-bold text-xs sm:text-sm text-stone-900">
                {activeService.title}
              </h3>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-stone-200 text-stone-800">
              {activeService.badge}
            </span>
          </div>
          <p className="text-xs text-stone-600 mb-2 leading-relaxed">
            {activeService.shortDesc}
          </p>
          <div className="flex flex-wrap gap-1">
            {activeService.deliverables.map((item) => (
              <span
                key={item}
                className="text-[10px] font-mono text-stone-700 bg-white/80 px-1.5 py-0.5 rounded border border-stone-200"
              >
                ✓ {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Desktop Layout: Flanking Columns with 100% Unobstructed Center Corridor */}
      <div className="hidden lg:flex w-full items-center justify-between gap-6">
        {/* Left Flank: Header + Services 01-03 */}
        <div className="w-full max-w-sm xl:max-w-md flex flex-col gap-3 pointer-events-auto">
          {/* Section Header sitting cleanly on the left */}
          <div className="mb-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-pill text-stone-800 text-[11px] font-mono mb-2 shadow-sm border border-white/60">
              <Wrench className="w-3.5 h-3.5 text-stone-600" />
              <span className="font-semibold tracking-wider uppercase">03 / CAPABILITIES</span>
            </div>

            <h2 className="text-xl xl:text-3xl font-extrabold tracking-tight text-stone-950 uppercase leading-tight">
              WHAT I DO TO MOVE YOUR
              <span className="block text-amber-800 italic font-serif lowercase text-xl xl:text-2xl">
                business forward.
              </span>
            </h2>
          </div>

          {leftServices.map((svc) => {
            const IconComp = ICONS[svc.icon as keyof typeof ICONS] || Palette;
            const isActive = activeServiceId === svc.id;

            return (
              <div
                key={svc.id}
                onClick={() => setActiveServiceId(svc.id)}
                className={`group p-3.5 rounded-2xl glass-card transition-all duration-300 cursor-pointer ${
                  isActive
                    ? "border-amber-400 bg-white/85 shadow-xl scale-[1.01]"
                    : "hover:bg-white/60 border-white/60 opacity-85 hover:opacity-100"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-6 h-6 rounded-lg flex items-center justify-center transition-colors ${
                        isActive
                          ? "bg-amber-600 text-white"
                          : "bg-stone-200 text-stone-700 group-hover:bg-stone-300"
                      }`}
                    >
                      <IconComp className="w-3 h-3" />
                    </div>
                    <span className="font-mono text-xs font-bold text-stone-500">
                      {svc.number}
                    </span>
                    <h3 className="font-bold text-xs sm:text-sm text-stone-900 tracking-tight">
                      {svc.title}
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-stone-200/70 text-stone-700">
                    {svc.badge}
                  </span>
                </div>

                <p className="text-xs text-stone-600 leading-relaxed mb-1.5">
                  {svc.shortDesc}
                </p>

                {isActive && (
                  <div className="flex flex-wrap gap-1 pt-1 border-t border-stone-200/60 animate-fade-in">
                    {svc.deliverables.map((item) => (
                      <span
                        key={item}
                        className="inline-flex items-center gap-1 text-[10px] font-mono text-stone-700 bg-white/80 px-1.5 py-0.5 rounded border border-stone-200"
                      >
                        <Check className="w-2.5 h-2.5 text-amber-600" />
                        {item}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Right Flank: Services 04-06 + Custom Scope CTA */}
        <div className="w-full max-w-sm xl:max-w-md flex flex-col gap-3 pointer-events-auto items-end">
          {rightServices.map((svc) => {
            const IconComp = ICONS[svc.icon as keyof typeof ICONS] || Palette;
            const isActive = activeServiceId === svc.id;

            return (
              <div
                key={svc.id}
                onClick={() => setActiveServiceId(svc.id)}
                className={`w-full group p-3.5 rounded-2xl glass-card transition-all duration-300 cursor-pointer ${
                  isActive
                    ? "border-amber-400 bg-white/85 shadow-xl scale-[1.01]"
                    : "hover:bg-white/60 border-white/60 opacity-85 hover:opacity-100"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-6 h-6 rounded-lg flex items-center justify-center transition-colors ${
                        isActive
                          ? "bg-amber-600 text-white"
                          : "bg-stone-200 text-stone-700 group-hover:bg-stone-300"
                      }`}
                    >
                      <IconComp className="w-3 h-3" />
                    </div>
                    <span className="font-mono text-xs font-bold text-stone-500">
                      {svc.number}
                    </span>
                    <h3 className="font-bold text-xs sm:text-sm text-stone-900 tracking-tight">
                      {svc.title}
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-stone-200/70 text-stone-700">
                    {svc.badge}
                  </span>
                </div>

                <p className="text-xs text-stone-600 leading-relaxed mb-1.5">
                  {svc.shortDesc}
                </p>

                {isActive && (
                  <div className="flex flex-wrap gap-1 pt-1 border-t border-stone-200/60 animate-fade-in">
                    {svc.deliverables.map((item) => (
                      <span
                        key={item}
                        className="inline-flex items-center gap-1 text-[10px] font-mono text-stone-700 bg-white/80 px-1.5 py-0.5 rounded border border-stone-200"
                      >
                        <Check className="w-2.5 h-2.5 text-amber-600" />
                        {item}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          <button
            onClick={onOpenContact}
            className="flex items-center gap-2 px-4 py-2 rounded-full glass-card hover:bg-white text-stone-900 text-xs font-semibold tracking-wide border border-white/70 shadow-md cursor-pointer group mt-1 self-end"
          >
            <span>DISCUSS A CUSTOM SCOPE</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-amber-700 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};
