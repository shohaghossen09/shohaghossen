"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sparkles, ArrowUpRight } from "lucide-react";
import { PERSONAL_INFO } from "@/data/portfolioData";

interface NavbarProps {
  currentChapterId?: string;
  onNavigateChapter?: (chapterId: string) => void;
  onOpenContactModal?: () => void;
  reducedMotion?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  onNavigateChapter,
  onOpenContactModal,
}) => {
  const pathname = usePathname();

  return (
    <>
      {/* Top Header Bar: Glass Brand Pill on Left, Glass CTA on Right */}
      <header className="fixed top-0 left-0 right-0 z-50 px-4 md:px-8 py-4 pointer-events-none">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Frosted Glass Brand Logo Pill (Left Side) */}
          <Link
            href="/"
            className="pointer-events-auto flex items-center gap-3 cursor-pointer group glass-card bg-white/70 hover:bg-white/90 border border-white/80 shadow-lg hover:shadow-xl backdrop-blur-xl px-3.5 py-2 rounded-full transition-all duration-300"
            aria-label="Home"
            onClick={() => {
              if (pathname === "/" && onNavigateChapter) {
                onNavigateChapter("hero");
              }
            }}
          >
            <div className="w-8 h-8 rounded-full bg-stone-900 text-stone-100 flex items-center justify-center font-mono text-xs font-semibold tracking-wider group-hover:scale-105 transition-transform duration-300 shadow-md">
              SH
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-xs tracking-widest uppercase text-stone-900 flex items-center gap-2">
                {PERSONAL_INFO.name}
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
              </span>
              <span className="text-[10px] font-mono text-stone-600 tracking-wider hidden sm:inline">
                FULL-STACK DEV
              </span>
            </div>
          </Link>

          {/* Frosted Glass Action CTA with Pure Black Text (Right Side) */}
          <div className="pointer-events-auto flex items-center gap-2 md:gap-3">
            <button
              onClick={onOpenContactModal}
              className="flex items-center gap-1.5 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full glass-card bg-white/80 hover:bg-white text-stone-950 border border-white/90 text-xs font-bold tracking-wide transition-all duration-300 shadow-lg hover:shadow-xl backdrop-blur-xl cursor-pointer group"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-600 group-hover:rotate-12 transition-transform" />
              <span className="text-stone-950 font-bold">LET&apos;S TALK</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-stone-950 opacity-70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </header>

      {/* Pages Link Area Only - Positioned on Bottom Center in Luxury Frosted Glass */}
      <nav
        aria-label="Page Navigation"
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-auto flex items-center gap-1.5 p-1.5 rounded-full glass-card bg-white/75 hover:bg-white/85 border border-white/90 shadow-2xl backdrop-blur-2xl text-xs transition-all duration-300"
        style={{
          boxShadow:
            "0 20px 40px -15px rgba(0,0,0,0.15), 0 0 0 1px rgba(255,255,255,0.7) inset",
        }}
      >
        <Link
          href="/"
          className={`px-4 sm:px-5 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 ${
            pathname === "/"
              ? "bg-stone-900 text-stone-50 shadow-md font-bold"
              : "text-stone-700 hover:text-stone-950 hover:bg-white/60"
          }`}
        >
          Home
        </Link>
        <Link
          href="/about"
          className={`px-4 sm:px-5 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 ${
            pathname === "/about"
              ? "bg-stone-900 text-stone-50 shadow-md font-bold"
              : "text-stone-700 hover:text-stone-950 hover:bg-white/60"
          }`}
        >
          About
        </Link>
        <Link
          href="/work"
          className={`px-4 sm:px-5 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 ${
            pathname === "/work"
              ? "bg-stone-900 text-stone-50 shadow-md font-bold"
              : "text-stone-700 hover:text-stone-950 hover:bg-white/60"
          }`}
        >
          Work
        </Link>
        <Link
          href="/cv"
          className={`px-4 sm:px-5 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 ${
            pathname === "/cv"
              ? "bg-stone-900 text-stone-50 shadow-md font-bold"
              : "text-stone-700 hover:text-stone-950 hover:bg-white/60"
          }`}
        >
          CV
        </Link>
      </nav>
    </>
  );
};
