"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { CharacterStage } from "@/components/CharacterStage";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { WorkSection } from "@/components/sections/WorkSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { ValueSection } from "@/components/sections/ValueSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { FooterSection } from "@/components/sections/FooterSection";
import { ProjectModal } from "@/components/modals/ProjectModal";
import { ContactModal } from "@/components/modals/ContactModal";
import { CHAPTERS } from "@/data/portfolioData";
import { Project } from "@/types/portfolio";
import { audioEngine } from "@/utils/audio";

export const ScrollStory: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(16.0);
  const [currentChapterId, setCurrentChapterId] = useState<string>("hero");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  const lastScrollYRef = useRef(0);
  const lastChapterRef = useRef("hero");

  // Auto sound on: activate warm ambient audio engine on first interaction
  useEffect(() => {
    const activateAudioOnce = () => {
      if (audioEngine && !audioEngine.getStatus()) {
        audioEngine.start();
      }
    };

    window.addEventListener("scroll", activateAudioOnce, { passive: true, once: true });
    window.addEventListener("wheel", activateAudioOnce, { passive: true, once: true });
    window.addEventListener("touchstart", activateAudioOnce, { passive: true, once: true });
    window.addEventListener("click", activateAudioOnce, { passive: true, once: true });
    window.addEventListener("keydown", activateAudioOnce, { passive: true, once: true });

    return () => {
      window.removeEventListener("scroll", activateAudioOnce);
      window.removeEventListener("wheel", activateAudioOnce);
      window.removeEventListener("touchstart", activateAudioOnce);
      window.removeEventListener("click", activateAudioOnce);
      window.removeEventListener("keydown", activateAudioOnce);
    };
  }, []);

  // Detect prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);

    const listener = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener("change", listener);
    return () => mediaQuery.removeEventListener("change", listener);
  }, []);

  // Central Scroll Handler
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const maxScroll =
            document.documentElement.scrollHeight - window.innerHeight;
          const progress = maxScroll > 0 ? Math.max(0, Math.min(1, scrollY / maxScroll)) : 0;

          setScrollProgress(progress);

          // Audio pitch/filter tracking
          const delta = Math.abs(scrollY - lastScrollYRef.current);
          if (audioEngine && delta > 2) {
            audioEngine.updateFilter(Math.min(1, delta / 60));
          }
          lastScrollYRef.current = scrollY;

          // Determine current active chapter
          const active =
            CHAPTERS.find(
              (c) => progress >= c.range[0] && progress <= c.range[1]
            ) || CHAPTERS[0];

          if (active.id !== lastChapterRef.current) {
            lastChapterRef.current = active.id;
            setCurrentChapterId(active.id);
            if (audioEngine) {
              audioEngine.triggerTick(640);
            }
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Time update callback from video stage
  const handleTimeUpdate = useCallback((curr: number, dur: number) => {
    setCurrentTime(curr);
    if (dur && !isNaN(dur)) setDuration(dur);
  }, []);

  // Navigation jumping
  const navigateToChapter = useCallback((chapterId: string) => {
    const chapter = CHAPTERS.find((c) => c.id === chapterId);
    if (!chapter) return;
    const maxScroll =
      document.documentElement.scrollHeight - window.innerHeight;
    const targetScroll = chapter.range[0] * maxScroll;
    window.scrollTo({
      top: targetScroll,
      behavior: "smooth",
    });
  }, []);

  // Seek bar navigation
  const seekProgress = useCallback((targetProgress: number) => {
    const maxScroll =
      document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({
      top: targetProgress * maxScroll,
      behavior: "smooth",
    });
  }, []);

  return (
    <main className="relative w-full bg-[#aba095] min-h-screen text-stone-900 selection:bg-stone-900 selection:text-white overflow-x-hidden">
      {/* 1. Top Fixed Navigation Bar (Sound button removed, auto sound on) */}
      <Navbar
        currentChapterId={currentChapterId}
        onNavigateChapter={navigateToChapter}
        onOpenContactModal={() => setIsContactModalOpen(true)}
        reducedMotion={reducedMotion}
      />

      {/* 2. Fixed Character Stage (Borderless, Smooth 480fps Video + Ambient Atmosphere) */}
      <CharacterStage
        scrollProgress={scrollProgress}
        onTimeUpdate={handleTimeUpdate}
        reducedMotion={reducedMotion}
      />

      {/* 3. Story Layers (Flanking around the central character with zero occlusion) */}
      <HeroSection
        progress={scrollProgress}
        onViewWork={() => navigateToChapter("work")}
        onOpenContact={() => setIsContactModalOpen(true)}
      />

      <AboutSection progress={scrollProgress} />

      <ServicesSection
        progress={scrollProgress}
        onOpenContact={() => setIsContactModalOpen(true)}
      />

      <WorkSection
        progress={scrollProgress}
        onSelectProject={(proj) => setSelectedProject(proj)}
      />

      <ProcessSection progress={scrollProgress} />

      <ValueSection progress={scrollProgress} />

      <ContactSection
        progress={scrollProgress}
        onOpenContactModal={() => setIsContactModalOpen(true)}
      />

      <FooterSection
        progress={scrollProgress}
        onNavigateChapter={navigateToChapter}
        onOpenContactModal={() => setIsContactModalOpen(true)}
      />

      {/* 5. Modals */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />

      {/* 6. Physical Scroll Runway (850vh smooth scroll) */}
      <div
        className="w-full pointer-events-none opacity-0 select-none"
        style={{ height: "850vh" }}
        aria-hidden="true"
      />
    </main>
  );
};
