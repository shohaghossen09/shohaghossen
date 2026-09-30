"use client";

import React from "react";
import { CheckCircle2 } from "lucide-react";
import { PROCESS_STEPS } from "@/data/portfolioData";

interface ProcessSectionProps {
  progress: number; // 0.0 to 1.0 overall progress
}

export const ProcessSection: React.FC<ProcessSectionProps> = ({ progress }) => {
  // Active range: 0.66 to 0.80
  let opacity = 0;
  if (progress >= 0.65 && progress <= 0.81) {
    if (progress < 0.68) {
      opacity = (progress - 0.65) / 0.03;
    } else if (progress > 0.77) {
      opacity = 1 - (progress - 0.77) / 0.04;
    } else {
      opacity = 1;
    }
  }

  const sectionRange = 0.80 - 0.66;
  const localProg = Math.max(0, Math.min(0.999, (progress - 0.66) / sectionRange));
  const activeStepIdx = Math.min(PROCESS_STEPS.length - 1, Math.floor(localProg * PROCESS_STEPS.length));
  const currentStep = PROCESS_STEPS[activeStepIdx];

  if (opacity <= 0.01) return null;

  const leftSteps = PROCESS_STEPS.slice(0, 3);
  const rightSteps = PROCESS_STEPS.slice(3, 6);

  return (
    <section
      className="fixed inset-0 pointer-events-none flex flex-col justify-end lg:justify-center px-4 sm:px-8 md:px-12 xl:px-16 pb-24 sm:pb-20 lg:pb-0 z-20 transition-opacity duration-300"
      style={{ opacity }}
    >
      {/* Mobile View: Active Process Step Card at Bottom */}
      <div className="lg:hidden flex flex-col gap-2.5 pointer-events-auto w-full max-w-md mx-auto">
        <div className="p-4 rounded-2xl glass-card border border-white/80 shadow-xl">
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-amber-600 text-white font-mono text-xs font-bold flex items-center justify-center">
                {currentStep.number}
              </div>
              <h3 className="font-bold text-xs sm:text-sm text-stone-900">
                {currentStep.title}
              </h3>
            </div>
            <span className="text-[10px] font-mono text-stone-500">
              {currentStep.phase}
            </span>
          </div>

          <p className="text-xs text-stone-600 leading-relaxed mb-2.5">
            {currentStep.description}
          </p>

          <div className="flex flex-wrap gap-1">
            {currentStep.deliverables.map((d) => (
              <span
                key={d}
                className="text-[10px] font-mono text-stone-700 bg-white/80 px-2 py-0.5 rounded border border-stone-200"
              >
                ✓ {d}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Desktop View: Flanking Left & Right with 100% Clear Center Corridor */}
      <div className="hidden lg:flex w-full items-center justify-between gap-6">
        {/* Left Flank: Header + Steps 01-03 */}
        <div className="w-full max-w-sm xl:max-w-md flex flex-col gap-3 pointer-events-auto">
          <div className="mb-1">

            <h2 className="text-xl xl:text-3xl font-extrabold tracking-tight text-stone-950 uppercase leading-tight">
              HOW I TURN IDEAS INTO
              <span className="block text-amber-800 italic font-serif lowercase text-xl xl:text-2xl">
                digital experiences.
              </span>
            </h2>
          </div>

          {leftSteps.map((step, idx) => {
            const isActive = activeStepIdx === idx;
            const isPast = activeStepIdx > idx;

            return (
              <div
                key={step.number}
                className={`p-3.5 rounded-2xl glass-card transition-all duration-300 border ${
                  isActive
                    ? "border-amber-400 bg-white/85 shadow-xl scale-[1.01]"
                    : isPast
                    ? "border-emerald-300/60 bg-white/60 opacity-90"
                    : "border-white/50 opacity-70 hover:opacity-100"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center font-mono text-[10px] font-bold transition-colors ${
                        isActive
                          ? "bg-amber-600 text-white"
                          : isPast
                          ? "bg-emerald-600 text-white"
                          : "bg-stone-200 text-stone-700"
                      }`}
                    >
                      {isPast ? <CheckCircle2 className="w-3 h-3" /> : step.number}
                    </div>
                    <h3 className="font-bold text-xs sm:text-sm text-stone-900 tracking-tight">
                      {step.title}
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono text-stone-500">
                    {step.phase}
                  </span>
                </div>

                <p className="text-xs text-stone-600 leading-relaxed mb-1.5">
                  {step.description}
                </p>

                {isActive && (
                  <div className="flex flex-wrap gap-1 pt-1 border-t border-stone-200/60 animate-fade-in">
                    {step.deliverables.map((d) => (
                      <span
                        key={d}
                        className="text-[10px] font-mono text-stone-700 bg-stone-100/90 px-1.5 py-0.5 rounded border border-stone-200"
                      >
                        {d}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Right Flank: Steps 04-06 + Progress Tracker */}
        <div className="w-full max-w-sm xl:max-w-md flex flex-col gap-3 pointer-events-auto items-end">
          {rightSteps.map((step, idx) => {
            const actualIdx = idx + 3;
            const isActive = activeStepIdx === actualIdx;
            const isPast = activeStepIdx > actualIdx;

            return (
              <div
                key={step.number}
                className={`w-full p-3.5 rounded-2xl glass-card transition-all duration-300 border ${
                  isActive
                    ? "border-amber-400 bg-white/85 shadow-xl scale-[1.01]"
                    : isPast
                    ? "border-emerald-300/60 bg-white/60 opacity-90"
                    : "border-white/50 opacity-70 hover:opacity-100"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center font-mono text-[10px] font-bold transition-colors ${
                        isActive
                          ? "bg-amber-600 text-white"
                          : isPast
                          ? "bg-emerald-600 text-white"
                          : "bg-stone-200 text-stone-700"
                      }`}
                    >
                      {isPast ? <CheckCircle2 className="w-3 h-3" /> : step.number}
                    </div>
                    <h3 className="font-bold text-xs sm:text-sm text-stone-900 tracking-tight">
                      {step.title}
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono text-stone-500">
                    {step.phase}
                  </span>
                </div>

                <p className="text-xs text-stone-600 leading-relaxed mb-1.5">
                  {step.description}
                </p>

                {isActive && (
                  <div className="flex flex-wrap gap-1 pt-1 border-t border-stone-200/60 animate-fade-in">
                    {step.deliverables.map((d) => (
                      <span
                        key={d}
                        className="text-[10px] font-mono text-stone-700 bg-stone-100/90 px-1.5 py-0.5 rounded border border-stone-200"
                      >
                        {d}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          {/* Stage Tracker Pill */}
          <div className="w-full glass-card p-3 rounded-2xl border border-white/70 shadow-sm flex flex-col gap-1.5">
            <div className="flex items-center justify-between text-[11px] font-mono text-stone-600">
              <span>STAGE 0{activeStepIdx + 1} OF 06</span>
              <span className="font-semibold text-stone-900">
                {currentStep.title}
              </span>
            </div>
            <div className="w-full h-1.5 bg-stone-300/70 rounded-full overflow-hidden">
              <div
                className="h-full bg-amber-600 transition-all duration-200 rounded-full"
                style={{
                  width: `${((activeStepIdx + 1) / PROCESS_STEPS.length) * 100}%`,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
