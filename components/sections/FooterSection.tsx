"use client";

import React from "react";
import { ArrowUp } from "lucide-react";
import { PERSONAL_INFO } from "@/data/portfolioData";

interface FooterSectionProps {
  progress: number; // 0.0 to 1.0 overall progress
  onNavigateChapter: (chapterId: string) => void;
  onOpenContactModal: () => void;
}

export const FooterSection: React.FC<FooterSectionProps> = ({
  progress,
  onNavigateChapter,
}) => {
  let opacity = 0;
  if (progress >= 0.96) {
    opacity = Math.min(1, (progress - 0.96) / 0.03);
  }

  if (opacity <= 0.01) return null;

  return (
    <footer
      className="fixed inset-0 pointer-events-none flex flex-col justify-end px-4 sm:px-8 md:px-16 pb-16 pt-10 z-30 transition-opacity duration-300"
      style={{ opacity }}
    >
      <div className="max-w-7xl w-full mx-auto glass-card p-5 sm:p-7 rounded-3xl border border-white/80 shadow-2xl pointer-events-auto backdrop-blur-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-stone-200/70">
          <div>
            <div className="flex items-center gap-2.5 mb-1">
              <span className="font-extrabold text-sm sm:text-base tracking-widest text-stone-950 uppercase">
                {PERSONAL_INFO.name}
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-stone-200/80 text-stone-700">
                PORTFOLIO 2026
              </span>
            </div>
            <p className="text-xs text-stone-600 font-medium">
              {PERSONAL_INFO.role}
            </p>
          </div>

          <div className="flex flex-wrap gap-3 text-xs font-mono font-medium text-stone-700">
            <button
              onClick={() => onNavigateChapter("hero")}
              className="hover:text-stone-950 transition-colors cursor-pointer"
            >
              // 01 HERO
            </button>
            <button
              onClick={() => onNavigateChapter("about")}
              className="hover:text-stone-950 transition-colors cursor-pointer"
            >
              // 02 ABOUT
            </button>
            <button
              onClick={() => onNavigateChapter("services")}
              className="hover:text-stone-950 transition-colors cursor-pointer"
            >
              // 03 SERVICES
            </button>
            <button
              onClick={() => onNavigateChapter("work")}
              className="hover:text-stone-950 transition-colors cursor-pointer"
            >
              // 04 WORK
            </button>
            <button
              onClick={() => onNavigateChapter("process")}
              className="hover:text-stone-950 transition-colors cursor-pointer"
            >
              // 05 PROCESS
            </button>
            <button
              onClick={() => onNavigateChapter("contact")}
              className="hover:text-stone-950 transition-colors cursor-pointer"
            >
              // 06 CONTACT
            </button>
          </div>

          <button
            onClick={() => onNavigateChapter("hero")}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-stone-900 text-stone-100 hover:bg-stone-800 text-xs font-mono font-semibold transition-all shadow-md cursor-pointer"
          >
            <span>TOP</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="pt-3 flex flex-col sm:flex-row items-center justify-between text-[10px] font-mono text-stone-500 gap-1.5">
          <div>
            &copy; {new Date().getFullYear()} {PERSONAL_INFO.name}. All rights reserved.
          </div>
          <div className="flex items-center gap-1.5">
            <span>Synchronized Scroll Engine</span>
            <span>•</span>
            <span className="text-amber-800 font-semibold">480 FPS</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
