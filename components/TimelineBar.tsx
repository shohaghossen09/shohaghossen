"use client";

import React, { useRef } from "react";
import { ChevronDown, Sliders } from "lucide-react";
import { CHAPTERS } from "@/data/portfolioData";

interface TimelineBarProps {
  scrollProgress: number; // 0.0 to 1.0
  currentTime: number;
  duration: number;
  currentChapterId: string;
  onSeekProgress: (progress: number) => void;
  reducedMotion?: boolean;
}

export const TimelineBar: React.FC<TimelineBarProps> = ({
  scrollProgress,
  currentTime,
  duration,
  currentChapterId,
  onSeekProgress,
}) => {
  const progressBarRef = useRef<HTMLDivElement>(null);
  const activeChapter =
    CHAPTERS.find((c) => c.id === currentChapterId) || CHAPTERS[0];
  const activeIndex = CHAPTERS.findIndex((c) => c.id === currentChapterId);

  const handleBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressBarRef.current) return;
    const rect = progressBarRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const progress = Math.max(0, Math.min(1, clickX / rect.width));
    onSeekProgress(progress);
  };

  const formattedTime = currentTime.toFixed(1).padStart(4, "0");
  const formattedDuration = (duration || 16.0).toFixed(1).padStart(4, "0");
  const percent = Math.round(scrollProgress * 100);

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-40 px-4 md:px-8 py-3 pointer-events-none">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2.5">
        {/* Left: Scroll Hint or Chapter Status */}
        <div className="pointer-events-auto flex items-center gap-3">
          {scrollProgress < 0.04 ? (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full glass-card border border-white/60 text-stone-800 text-xs shadow-sm animate-pulse">
              <ChevronDown className="w-3.5 h-3.5 text-stone-700 animate-bounce" />
              <span className="font-medium tracking-wide">
                SCROLL TO EXPLORE THE STORY
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-2.5 px-3 py-1 rounded-full glass-card border border-white/60 text-stone-800 text-xs shadow-sm font-mono">
              <span className="w-2 h-2 rounded-full bg-amber-600" />
              <span className="font-semibold text-stone-900">
                0{activeIndex + 1}
              </span>
              <span className="text-stone-400">/</span>
              <span className="uppercase tracking-wider font-semibold text-stone-800">
                {activeChapter.label}
              </span>
            </div>
          )}
        </div>

        {/* Center: Interactive Timeline Scrubber */}
        <div className="pointer-events-auto w-full md:w-80 lg:w-96 flex flex-col gap-1 glass-card border border-white/60 px-4 py-2 rounded-2xl shadow-lg">
          <div className="flex items-center justify-between text-[11px] font-mono text-stone-600">
            <span className="flex items-center gap-1.5">
              <Sliders className="w-3 h-3 text-stone-500" />
              <span>TIMELINE</span>
            </span>
            <span className="font-semibold text-stone-900">
              {formattedTime}s / {formattedDuration}s
            </span>
            <span className="text-stone-500">{percent}%</span>
          </div>

          <div
            ref={progressBarRef}
            onClick={handleBarClick}
            className="group relative w-full h-2 bg-stone-300/60 rounded-full cursor-pointer overflow-hidden transition-all duration-200 hover:h-2.5"
            role="slider"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={percent}
            tabIndex={0}
            aria-label="Story Timeline Scrubber"
          >
            <div
              className="h-full bg-gradient-to-r from-amber-600 to-stone-900 rounded-full transition-all duration-75 relative"
              style={{ width: `${Math.max(1, percent)}%` }}
            />
          </div>
        </div>

        {/* Right: Technical Spec Pill (Updated to 480 FPS) */}
        <div className="pointer-events-auto hidden md:flex items-center gap-2">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full glass-card border border-white/60 text-[11px] font-mono text-stone-600 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span>1920×1080</span>
            <span className="text-stone-300">|</span>
            <span className="text-amber-800 font-semibold">480 FPS SCROLL-SYNC</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
