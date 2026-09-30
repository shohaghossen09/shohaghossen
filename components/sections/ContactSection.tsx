"use client";

import React from "react";
import { Sparkles, Mail, ArrowUpRight, Globe } from "lucide-react";
import { PERSONAL_INFO } from "@/data/portfolioData";

interface ContactSectionProps {
  progress: number; // 0.0 to 1.0 overall progress
  onOpenContactModal: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  progress,
  onOpenContactModal,
}) => {
  // Active range: 0.90 to 0.98
  let opacity = 0;
  if (progress >= 0.89 && progress <= 0.99) {
    if (progress < 0.92) {
      opacity = (progress - 0.89) / 0.03;
    } else if (progress > 0.97) {
      opacity = 1 - (progress - 0.97) / 0.02;
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
        {/* Left Flank: High-Impact Editorial Invitation */}
        <div className="w-full max-w-sm sm:max-w-md xl:max-w-lg flex flex-col justify-center pointer-events-auto p-4 sm:p-5 lg:p-0 rounded-2xl glass-card lg:glass-card-none lg:bg-transparent lg:border-none lg:shadow-none">

          <h2 className="text-xl sm:text-3xl lg:text-4xl xl:text-5xl font-extrabold tracking-tight text-stone-950 uppercase leading-[1.08] mb-2 sm:mb-4">
            HAVE AN IDEA
            <span className="block text-amber-800 italic font-serif lowercase text-2xl sm:text-4xl xl:text-5xl">
              worth building?
            </span>
          </h2>

          <p className="text-xs sm:text-sm text-stone-700 leading-relaxed mb-4 sm:mb-6">
            Let&apos;s turn it into a digital experience people remember. Whether you&apos;re launching a brand new category or reimagining an existing flagship.
          </p>

          {/* Primary Action Button */}
          <div className="flex flex-wrap items-center gap-3 mb-3 sm:mb-4">
            <button
              onClick={onOpenContactModal}
              className="flex items-center gap-2.5 px-6 sm:px-7 py-3 rounded-full bg-stone-950 text-stone-50 hover:bg-stone-800 text-xs font-bold tracking-widest uppercase transition-all duration-300 shadow-xl hover:shadow-2xl cursor-pointer group"
            >
              <Sparkles className="w-4 h-4 text-amber-400 group-hover:rotate-12 transition-transform" />
              <span>START A PROJECT</span>
              <ArrowUpRight className="w-4 h-4 opacity-70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>

            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="flex items-center gap-2 px-4 py-3 rounded-full glass-card hover:bg-white text-stone-900 text-xs font-semibold tracking-wider transition-all duration-300 border border-white/80 shadow-md cursor-pointer"
            >
              <Mail className="w-3.5 h-3.5 text-stone-600" />
              <span className="hidden sm:inline">{PERSONAL_INFO.email}</span>
              <span className="sm:hidden">EMAIL</span>
            </a>
          </div>

          {/* Availability Status */}
          <div className="flex items-center gap-2 text-[11px] font-mono text-stone-600">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>Currently scheduling client kickoffs for Q4 2026</span>
          </div>
        </div>

        {/* Right Flank: Direct Channels Card (Desktop) */}
        <div className="hidden lg:flex w-full max-w-xs xl:max-w-sm flex-col gap-3 pointer-events-auto items-end">
          <div className="w-full glass-card p-4 sm:p-5 rounded-2xl border border-white/80 shadow-xl">
            <div className="flex items-center justify-between text-xs font-mono text-stone-500 mb-2.5 border-b border-stone-200/60 pb-2">
              <span className="font-semibold text-stone-800">DIRECT CHANNELS</span>
              <Globe className="w-3.5 h-3.5 text-stone-500" />
            </div>

            <div className="space-y-2 text-xs">
              {PERSONAL_INFO.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2 rounded-xl hover:bg-white/80 transition-colors group text-stone-800"
                >
                  <span className="font-medium text-stone-700 group-hover:text-stone-950">
                    {s.label}
                  </span>
                  <div className="flex items-center gap-1 font-mono text-[11px] text-stone-500 group-hover:text-amber-800">
                    <span>{s.handle}</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
