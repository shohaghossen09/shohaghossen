"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  Code2,
  Palette,
  Terminal,
  ChevronDown,
  Briefcase,
  Sliders,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { ContactModal } from "@/components/modals/ContactModal";
import { PERSONAL_INFO, PROJECTS, PROCESS_STEPS } from "@/data/portfolioData";
import { audioEngine } from "@/utils/audio";

interface Station {
  id: string;
  label: string;
  coordX: number;
  coordY: number;
  side: "left" | "right";
}

// 6 Stations strictly flanking the winding highway (road is 100% unobstructed)
const STATIONS: Station[] = [
  { id: "origin", label: "Origin & Vision", coordX: 220, coordY: 520, side: "left" },
  { id: "craft", label: "Architecture & UI", coordX: 780, coordY: 1350, side: "right" },
  { id: "tech", label: "Full-Stack Tech", coordX: 220, coordY: 2200, side: "left" },
  { id: "track-record", label: "Featured Work", coordX: 780, coordY: 3050, side: "right" },
  { id: "methodology", label: "Project Leadership", coordX: 220, coordY: 3900, side: "left" },
  { id: "destination", label: "Parking Bay", coordX: 220, coordY: 4650, side: "left" },
];

export default function AboutPage() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [activeStationIndex, setActiveStationIndex] = useState(0);
  const [activeProjectIdx, setActiveProjectIdx] = useState(0);
  const [activeStepIdx, setActiveStepIdx] = useState(0);
  const [activeTypographyStyle, setActiveTypographyStyle] = useState<"editorial" | "brutalist" | "modern">("editorial");
  const [isParked, setIsParked] = useState(false);

  // Strictly silence and stop all ambient audio on the About page
  useEffect(() => {
    if (audioEngine) {
      audioEngine.stop();
    }
  }, []);

  // Direct DOM Refs for 120 FPS zero-lag hardware-accelerated movement
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const progressTrailRef = useRef<SVGPathElement>(null);
  const carGroupRef = useRef<SVGGElement>(null);
  const frontLeftWheelRef = useRef<SVGGElement>(null);
  const frontRightWheelRef = useRef<SVGGElement>(null);
  const brakeLightLeftRef = useRef<SVGCircleElement>(null);
  const brakeLightRightRef = useRef<SVGCircleElement>(null);
  const sideNavProgressRef = useRef<HTMLSpanElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Animation calculation state kept in refs (ZERO React re-renders while scrolling)
  const smoothProgressRef = useRef(0);
  const targetProgressRef = useRef(0);
  const currentAngleRef = useRef(90);
  const currentSteerRef = useRef(0);
  const pathLengthRef = useRef(0);
  const lastStationIndexRef = useRef(0);
  const lastParkedStateRef = useRef(false);

  // SVG coordinate dimensions
  const SVG_WIDTH = 1000;
  const SVG_HEIGHT = 4900;

  // Precision Bezier Winding Route that connects all checkpoints cleanly
  // Starts directly under the elevated header at (500, 40)
  // Left highway lane is at X = 220, Right highway lane is at X = 780.
  // Terminating smoothly into the Station 6 Parking Bay at (220, 4650).
  const pathD = `
    M 500 40
    C 500 240, 220 320, 220 520
    L 220 850
    C 220 1060, 780 1140, 780 1350
    L 780 1700
    C 780 1910, 220 1990, 220 2200
    L 220 2550
    C 220 2760, 780 2840, 780 3050
    L 780 3400
    C 780 3610, 220 3690, 220 3900
    L 220 4350
    C 220 4480, 220 4560, 220 4650
  `;

  // Measure path length on mount
  useEffect(() => {
    if (pathRef.current) {
      const len = pathRef.current.getTotalLength();
      pathLengthRef.current = len;
      if (progressTrailRef.current) {
        progressTrailRef.current.style.strokeDasharray = `${len}`;
        progressTrailRef.current.style.strokeDashoffset = `${len}`;
      }
    }
  }, []);

  // Ambient Floating Dust Particles on Canvas matching Home page
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const particleCount = 28;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2 + 1,
      speedX: (Math.random() - 0.5) * 0.35,
      speedY: -(Math.random() * 0.45 + 0.15),
      alpha: Math.random() * 0.25 + 0.08,
    }));

    let animId: number;
    const renderParticles = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX;
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        ctx.fillStyle = `rgba(252, 249, 244, ${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animId = requestAnimationFrame(renderParticles);
    };
    renderParticles();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  // High-performance 120 FPS animation loop with ZERO React state updates
  useEffect(() => {
    let rafId: number;

    const onScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      targetProgressRef.current = Math.max(0, Math.min(1, scrollY / maxScroll));
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    const loop = () => {
      // Responsive, snappy lerp (0.32 gives instant response without floating delay)
      const target = targetProgressRef.current;
      const current = smoothProgressRef.current;
      const diff = target - current;

      if (Math.abs(diff) < 0.0001) {
        smoothProgressRef.current = target;
      } else {
        smoothProgressRef.current += diff * 0.32;
      }

      const p = smoothProgressRef.current;
      const path = pathRef.current;
      const pathLength = pathLengthRef.current;

      if (path && pathLength > 0) {
        const targetDist = p * pathLength;
        const pt = path.getPointAtLength(targetDist);

        // Calculate tangent angle
        const delta = 2.0;
        const ptNext = path.getPointAtLength(Math.min(pathLength, targetDist + delta));
        const ptPrev = path.getPointAtLength(Math.max(0, targetDist - delta));
        const dx = ptNext.x - ptPrev.x;
        const dy = ptNext.y - ptPrev.y;
        const targetAngle = Math.atan2(dy, dx) * (180 / Math.PI);

        // Shortest arc angle interpolation
        let angleDiff = targetAngle - currentAngleRef.current;
        while (angleDiff < -180) angleDiff += 360;
        while (angleDiff > 180) angleDiff -= 360;
        currentAngleRef.current += angleDiff * 0.4;

        // Front wheels dynamic steering angle
        const targetSteer = Math.max(-20, Math.min(20, angleDiff * 1.5));
        currentSteerRef.current += (targetSteer - currentSteerRef.current) * 0.35;

        // DIRECT DOM MUTATION (Zero React re-render, 120 FPS smooth GPU transform)
        if (carGroupRef.current) {
          carGroupRef.current.setAttribute(
            "transform",
            `translate(${pt.x}, ${pt.y}) rotate(${currentAngleRef.current})`
          );
        }

        if (frontLeftWheelRef.current) {
          frontLeftWheelRef.current.setAttribute(
            "transform",
            `translate(14, -17) rotate(${currentSteerRef.current})`
          );
        }

        if (frontRightWheelRef.current) {
          frontRightWheelRef.current.setAttribute(
            "transform",
            `translate(14, 17) rotate(${currentSteerRef.current})`
          );
        }

        // Active brake lights when decelerating or stopping
        const isBraking = diff < -0.001 || p >= 0.98;
        if (brakeLightLeftRef.current && brakeLightRightRef.current) {
          const fill = isBraking ? "#ef4444" : "#991b1b";
          const r = isBraking ? "3" : "2";
          brakeLightLeftRef.current.setAttribute("fill", fill);
          brakeLightLeftRef.current.setAttribute("r", r);
          brakeLightRightRef.current.setAttribute("fill", fill);
          brakeLightRightRef.current.setAttribute("r", r);
        }

        // Direct update of the glowing progress path trail
        if (progressTrailRef.current) {
          progressTrailRef.current.style.strokeDashoffset = `${pathLength * (1 - p)}`;
        }

        // Direct update of side nav percent counter
        if (sideNavProgressRef.current) {
          sideNavProgressRef.current.textContent = `${Math.round(p * 100)}%`;
        }
      }

      // Station milestones: ONLY update React state when station actually changes
      const breakpoints = [0.08, 0.26, 0.46, 0.66, 0.84, 0.98];
      let newIdx = 0;
      for (let i = breakpoints.length - 1; i >= 0; i--) {
        if (p >= breakpoints[i] - 0.05) {
          newIdx = i;
          break;
        }
      }
      if (newIdx !== lastStationIndexRef.current) {
        lastStationIndexRef.current = newIdx;
        setActiveStationIndex(newIdx);
      }

      // Parking state: ONLY update React state on transition
      const parked = p >= 0.96;
      if (parked !== lastParkedStateRef.current) {
        lastParkedStateRef.current = parked;
        setIsParked(parked);
      }

      rafId = requestAnimationFrame(loop);
    };

    rafId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const scrollToStation = (index: number) => {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const progressTargets = [0.08, 0.26, 0.46, 0.66, 0.84, 0.99];
    const targetY = (progressTargets[index] || 0) * maxScroll;
    window.scrollTo({ top: targetY, behavior: "smooth" });
  };

  return (
    <main
      ref={containerRef}
      className="relative w-full min-h-screen text-stone-900 selection:bg-stone-900 selection:text-white overflow-x-hidden font-sans"
      style={{
        background: "radial-gradient(ellipse at 50% 45%, #b8aca0 0%, #aa9e92 50%, #998e83 100%)",
      }}
    >
      {/* CSS Keyframe Animations for Living Landscape (River, Boat, Train, Turbines, Clouds, Buoys, Sparks) */}
      <style jsx global>{`
        @keyframes riverWaterFlow1 {
          0% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: -160; }
        }
        @keyframes riverWaterFlow2 {
          0% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: -110; }
        }
        @keyframes riverWaterFlow3 {
          0% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: -220; }
        }
        @keyframes cloudDriftSlow1 {
          0% { transform: translateX(-350px); }
          100% { transform: translateX(1350px); }
        }
        @keyframes cloudDriftSlow2 {
          0% { transform: translateX(1350px); }
          100% { transform: translateX(-350px); }
        }
        @keyframes cloudDriftSlow3 {
          0% { transform: translateX(-320px); }
          100% { transform: translateX(1300px); }
        }
        @keyframes turbineRotorSpin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes boatSway {
          0%, 100% { transform: rotate(0deg) translateY(0); }
          30% { transform: rotate(1.8deg) translateY(-1.2px); }
          70% { transform: rotate(-1.5deg) translateY(1.2px); }
        }
        @keyframes radarSpin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes buoyBob {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3.5px); }
        }
        @keyframes beaconBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.15; }
        }
        @keyframes pantographSpark {
          0%, 86%, 100% { opacity: 0; }
          89% { opacity: 0.95; }
          91% { opacity: 0.2; }
          93% { opacity: 1; }
        }
        .anim-river-flow-1 {
          stroke-dasharray: 26 18;
          animation: riverWaterFlow1 2.2s linear infinite;
        }
        .anim-river-flow-2 {
          stroke-dasharray: 20 14;
          animation: riverWaterFlow2 3.2s linear infinite;
        }
        .anim-river-flow-3 {
          stroke-dasharray: 32 24;
          animation: riverWaterFlow3 1.8s linear infinite;
        }
        .anim-cloud-top-1 {
          animation: cloudDriftSlow1 60s linear infinite;
        }
        .anim-cloud-top-2 {
          animation: cloudDriftSlow2 75s linear infinite;
        }
        .anim-cloud-top-3 {
          animation: cloudDriftSlow3 90s linear infinite;
        }
        .anim-turbine {
          animation: turbineRotorSpin 4.2s linear infinite;
          transform-origin: 0px 0px;
        }
        .anim-boat-body {
          animation: boatSway 3.6s ease-in-out infinite;
          transform-origin: 0px 0px;
        }
        .anim-radar {
          animation: radarSpin 2.4s linear infinite;
          transform-origin: 0px 0px;
        }
        .anim-buoy {
          animation: buoyBob 2.8s ease-in-out infinite;
        }
        .anim-beacon {
          animation: beaconBlink 1.4s steps(2, start) infinite;
        }
        .anim-spark {
          animation: pantographSpark 3.8s ease-in-out infinite;
        }
      `}</style>

      {/* Fixed Ambient Particles Canvas matching Home page */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full pointer-events-none z-0 opacity-40"
        aria-hidden="true"
      />

      {/* Top Header & Bottom Center Page Navigation */}
      <Navbar
        currentChapterId="about"
        onNavigateChapter={() => {}}
        onOpenContactModal={() => setIsContactModalOpen(true)}
      />

      {/* Floating Side Route Station Tracker (Desktop) */}
      <aside
        aria-label="Journey Milestones"
        className="fixed left-6 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col gap-3 p-3.5 rounded-2xl glass-card border border-white/70 shadow-2xl backdrop-blur-xl bg-white/80"
      >
        <div className="text-[10px] font-mono font-bold tracking-widest text-stone-500 px-2 uppercase">
          ROUTE STATIONS
        </div>
        <div className="flex flex-col gap-1.5">
          {STATIONS.map((station, idx) => {
            const isActive = activeStationIndex === idx;
            return (
              <button
                key={station.id}
                onClick={() => scrollToStation(idx)}
                className={`flex items-center gap-2.5 px-3 py-1.5 rounded-xl text-xs font-mono text-left transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-stone-900 text-stone-50 font-semibold shadow-md"
                    : "text-stone-700 hover:text-stone-950 hover:bg-white/60"
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full transition-colors ${
                    isActive ? "bg-amber-500" : "bg-stone-400"
                  }`}
                />
                <span>{station.label}</span>
              </button>
            );
          })}
        </div>
        <div className="pt-2 border-t border-stone-200/60 px-2 flex items-center justify-between text-[10px] font-mono text-stone-600">
          <span>PROGRESS</span>
          <span ref={sideNavProgressRef} className="font-semibold text-stone-900">
            0%
          </span>
        </div>
      </aside>

      {/* Floating Route Milestone Tracker Chip for Mobile/Tablet (< xl) */}
      <div className="xl:hidden fixed top-16 sm:top-20 left-1/2 -translate-x-1/2 z-40 pointer-events-auto max-w-[94vw] transition-all duration-300">
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-card bg-white/90 border border-white/95 shadow-xl backdrop-blur-xl text-[11px] font-mono">
          <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
          <span className="text-stone-900 font-bold uppercase truncate max-w-[170px] sm:max-w-none">
            {STATIONS[activeStationIndex]?.label || "Highway Route"}
          </span>
          <span className="text-stone-300">•</span>
          <span className="text-amber-800 font-semibold">{activeStationIndex + 1}/6</span>
        </div>
      </div>

      {/* Main 2D Highway Route & Checkpoints Layer */}
      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-36 z-10">
        {/* Route Intro Header: Clean & Editorial, matching Home page aesthetic */}
        <section className="text-center max-w-3xl mx-auto pt-2 pb-6 sm:pb-8">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-stone-950 uppercase leading-tight mb-3">
            THE JOURNEY BEHIND
            <span className="block text-amber-900 italic font-serif lowercase text-3xl sm:text-5xl lg:text-6xl">
              full-stack engineering.
            </span>
          </h1>

          <p className="text-xs sm:text-sm text-stone-800 leading-relaxed font-normal max-w-xl mx-auto mb-3">
            Drive through the milestones below. Each card sits cleanly on the roadside, leaving the highway corridor 100% unobstructed for the car to navigate toward the final parking stall.
          </p>

          <div className="flex items-center justify-center gap-2 text-stone-800 text-[11px] font-mono animate-bounce font-medium">
            <ChevronDown className="w-3.5 h-3.5 text-stone-900" />
            <span>SCROLL DOWN TO DRIVE</span>
          </div>
        </section>

        {/* SVG Route Geometry & Living Landscape Layer (River, Boat, Railway, Train, Windmills, Clouds, Realistic Car) */}
        <div className="relative w-full" style={{ height: `${SVG_HEIGHT}px` }}>
          <svg
            viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
            preserveAspectRatio="none"
            className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
            aria-hidden="true"
          >
            <defs>
              {/* Active Golden Energy Gradient */}
              <linearGradient id="routeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#fbbf24" />
                <stop offset="35%" stopColor="#f59e0b" />
                <stop offset="70%" stopColor="#d97706" />
                <stop offset="100%" stopColor="#92400e" />
              </linearGradient>

              {/* Realistic Headlight Beam Projection with soft falloff */}
              <linearGradient id="headlightBeam" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#fef08a" stopOpacity="0.9" />
                <stop offset="30%" stopColor="#fef9c3" stopOpacity="0.45" />
                <stop offset="70%" stopColor="#fef9c3" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#fef9c3" stopOpacity="0" />
              </linearGradient>

              {/* Bullet Train High-Power Xenon Headlight Beam */}
              <linearGradient id="trainHeadlightCone" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
                <stop offset="25%" stopColor="#e0f2fe" stopOpacity="0.5" />
                <stop offset="65%" stopColor="#38bdf8" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
              </linearGradient>

              {/* River Shoreline Sand & Earth Gradient */}
              <linearGradient id="riverBankSand" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#8c8072" />
                <stop offset="50%" stopColor="#756b5e" />
                <stop offset="100%" stopColor="#8c8072" />
              </linearGradient>

              {/* River Shallow Water Gradient */}
              <linearGradient id="riverShallows" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#0284c7" stopOpacity="0.75" />
              </linearGradient>

              {/* Deep Water Channel Gradient */}
              <linearGradient id="riverWater" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.9" />
                <stop offset="35%" stopColor="#0284c7" stopOpacity="0.95" />
                <stop offset="75%" stopColor="#0369a1" stopOpacity="0.98" />
                <stop offset="100%" stopColor="#075985" stopOpacity="1" />
              </linearGradient>

              {/* High-Speed Bullet Train Aerodynamic Metallic Body */}
              <linearGradient id="bulletTrainBody" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="35%" stopColor="#f8fafc" />
                <stop offset="48%" stopColor="#0284c7" />
                <stop offset="55%" stopColor="#0369a1" />
                <stop offset="85%" stopColor="#0f172a" />
                <stop offset="100%" stopColor="#020617" />
              </linearGradient>

              {/* Steel Rail Polished Specular Shine */}
              <linearGradient id="railSteelSpecular" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#334155" />
                <stop offset="35%" stopColor="#f8fafc" />
                <stop offset="65%" stopColor="#cbd5e1" />
                <stop offset="100%" stopColor="#1e293b" />
              </linearGradient>

              {/* Architectural Concrete Structure Gradient */}
              <linearGradient id="concreteStructure" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#78716c" />
                <stop offset="25%" stopColor="#d6d3d1" />
                <stop offset="75%" stopColor="#e7e5e4" />
                <stop offset="100%" stopColor="#78716c" />
              </linearGradient>

              {/* Hyper-Realistic Metallic Car Chassis Gradient */}
              <linearGradient id="carBodyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#2b2825" />
                <stop offset="25%" stopColor="#443e39" />
                <stop offset="50%" stopColor="#1e1c1a" />
                <stop offset="75%" stopColor="#38322c" />
                <stop offset="100%" stopColor="#181615" />
              </linearGradient>

              {/* Windshield Glass Reflection Gradient */}
              <linearGradient id="windshieldGlass" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0284c7" stopOpacity="0.85" />
                <stop offset="45%" stopColor="#38bdf8" stopOpacity="0.75" />
                <stop offset="55%" stopColor="#ffffff" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#0369a1" stopOpacity="0.85" />
              </linearGradient>

              {/* Alloy Wheel Rim Radial Gradient */}
              <radialGradient id="alloyRim" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#f5f5f4" />
                <stop offset="55%" stopColor="#78716c" />
                <stop offset="100%" stopColor="#1c1917" />
              </radialGradient>

              {/* Shadow Filters for Realistic 2D Depth */}
              <filter id="carRealisticShadow" x="-50%" y="-50%" width="200%" height="200%">
                <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="#000000" floodOpacity="0.45" />
              </filter>

              <filter id="landscapeShadow" x="-30%" y="-30%" width="160%" height="160%">
                <feDropShadow dx="0" dy="4" stdDeviation="5" floodColor="#000000" floodOpacity="0.25" />
              </filter>

              <filter id="bridgeDeepShadow" x="-40%" y="-40%" width="180%" height="180%">
                <feDropShadow dx="6" dy="10" stdDeviation="8" floodColor="#000000" floodOpacity="0.55" />
              </filter>

              <filter id="cloudShadow" x="-30%" y="-30%" width="160%" height="160%">
                <feDropShadow dx="0" dy="12" stdDeviation="14" floodColor="#1c1917" floodOpacity="0.22" />
              </filter>
            </defs>

            {/* ============================================================== */}
            {/* 1. SCENIC WINDING RIVER & SMOOTH CRUISING YACHT                */}
            {/* ============================================================== */}
            <g id="scenic-river">
              {/* Riverbed Shoreline (Sandy Earth Banks) */}
              <path
                d="M 1050 1695 C 820 1725, 680 1795, 480 1805 C 300 1815, 160 1855, -50 1865 L -50 1980 C 160 1970, 300 1930, 480 1920 C 680 1910, 820 1840, 1050 1810 Z"
                fill="url(#riverBankSand)"
                opacity="0.8"
              />
              {/* River Shallows / Sand Shelf */}
              <path
                d="M 1050 1710 C 820 1740, 680 1810, 480 1820 C 300 1830, 160 1870, -50 1880 L -50 1965 C 160 1955, 300 1915, 480 1905 C 680 1895, 820 1825, 1050 1795 Z"
                fill="url(#riverShallows)"
              />
              {/* Deep Water Channel */}
              <path
                d="M 1050 1720 C 820 1750, 680 1820, 480 1830 C 300 1840, 160 1880, -50 1890 L -50 1950 C 160 1940, 300 1900, 480 1890 C 680 1880, 820 1810, 1050 1780 Z"
                fill="url(#riverWater)"
                filter="url(#landscapeShadow)"
              />

              {/* Natural Riverbank Rocks and Boulders */}
              <g id="river-rocks">
                <circle cx="210" cy="1860" r="7" fill="#57534e" />
                <circle cx="212" cy="1858" r="4" fill="#78716c" />
                <circle cx="340" cy="1825" r="9" fill="#44403c" />
                <circle cx="342" cy="1822" r="5" fill="#78716c" />
                <circle cx="610" cy="1805" r="8" fill="#57534e" />
                <circle cx="612" cy="1803" r="4.5" fill="#a8a29e" />
                <circle cx="920" cy="1735" r="10" fill="#44403c" />
                <circle cx="923" cy="1732" r="6" fill="#78716c" />
                {/* Shoreline Reeds & Grass */}
                <line x1="280" y1="1832" x2="276" y2="1822" stroke="#4d7c0f" strokeWidth="2" strokeLinecap="round" />
                <line x1="284" y1="1833" x2="283" y2="1820" stroke="#65a30d" strokeWidth="1.8" strokeLinecap="round" />
                <line x1="288" y1="1834" x2="291" y2="1823" stroke="#365314" strokeWidth="1.6" strokeLinecap="round" />
                <line x1="560" y1="1814" x2="557" y2="1804" stroke="#4d7c0f" strokeWidth="2" strokeLinecap="round" />
                <line x1="565" y1="1815" x2="567" y2="1803" stroke="#65a30d" strokeWidth="1.8" strokeLinecap="round" />
              </g>

              {/* Multi-Layer Flowing Water Currents (Keyframe Animated) */}
              <path
                d="M 1030 1738 C 810 1768, 670 1838, 470 1848 C 290 1858, 150 1898, -30 1908"
                fill="none"
                stroke="#e0f2fe"
                strokeWidth="2.8"
                strokeLinecap="round"
                opacity="0.9"
                className="anim-river-flow-1"
              />
              <path
                d="M 1010 1756 C 790 1786, 650 1856, 450 1866 C 270 1876, 130 1916, -30 1926"
                fill="none"
                stroke="#bae6fd"
                strokeWidth="2"
                strokeLinecap="round"
                opacity="0.8"
                className="anim-river-flow-2"
              />
              <path
                d="M 990 1772 C 770 1802, 630 1872, 430 1882 C 250 1892, 110 1932, -30 1942"
                fill="none"
                stroke="#7dd3fc"
                strokeWidth="2.2"
                strokeLinecap="round"
                opacity="0.65"
                className="anim-river-flow-3"
              />

              {/* Moored Navigational Channel Buoys */}
              {/* Starboard Green Conical Buoy */}
              <g transform="translate(390, 1850)" className="anim-buoy">
                <circle cx="0" cy="1" r="5" fill="#000000" opacity="0.25" />
                <polygon points="0,-12 -4,0 4,0" fill="#10b981" stroke="#047857" strokeWidth="0.8" />
                <circle cx="0" cy="-12" r="2.2" fill="#34d399" className="anim-beacon" />
              </g>
              {/* Port Red Cylindrical Buoy */}
              <g transform="translate(630, 1865)" className="anim-buoy" style={{ animationDelay: "1.4s" }}>
                <circle cx="0" cy="1" r="5" fill="#000000" opacity="0.25" />
                <rect x="-4" y="-10" width="8" height="10" rx="1.5" fill="#ef4444" stroke="#b91c1c" strokeWidth="0.8" />
                <circle cx="0" cy="-11" r="2.2" fill="#f87171" className="anim-beacon" />
              </g>

              {/* PURE SVG NATIVE ANIMATEMOTION: Boat follows the EXACT River Bezier Path with Auto-Rotation */}
              <g>
                <animateMotion
                  path="M 1050 1750 C 820 1780, 680 1850, 480 1860 C 300 1870, 160 1910, -70 1920"
                  rotate="auto"
                  dur="22s"
                  repeatCount="indefinite"
                />
                {/* Luxury Motor Yacht Cruiser */}
                <g className="anim-boat-body" transform="scale(-1, 1)">
                  {/* Expanding Stern V-Wake Water Wash */}
                  <g id="boat-wake" opacity="0.85">
                    {/* Primary V-lines */}
                    <path
                      d="M 24 -5 L 68 -22 M 24 5 L 68 22"
                      stroke="#ffffff"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                    />
                    <path
                      d="M 38 -8 L 88 -30 M 38 8 L 88 30"
                      stroke="#e0f2fe"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      opacity="0.7"
                    />
                    {/* Churning Propeller Wash Ellipses */}
                    <ellipse cx="30" cy="0" rx="8" ry="4" fill="#ffffff" opacity="0.75" />
                    <ellipse cx="46" cy="0" rx="11" ry="5.5" fill="#e0f2fe" opacity="0.5" />
                    <ellipse cx="66" cy="0" rx="14" ry="7" fill="#bae6fd" opacity="0.3" />
                  </g>

                  {/* Boat Shadow in Water */}
                  <ellipse cx="0" cy="4" rx="30" ry="11" fill="#000000" opacity="0.32" filter="url(#landscapeShadow)" />

                  {/* Hydrodynamic Cruiser Hull with Royal Navy Waterline Stripe */}
                  <path
                    d="M -30 0 C -24 -11, 16 -11, 28 -8 L 28 8 C 16 11, -24 11, -30 0 Z"
                    fill="#ffffff"
                    stroke="#0284c7"
                    strokeWidth="1.8"
                  />
                  {/* Navy Blue Waterline Accent Accent */}
                  <path
                    d="M -26 -1 C -18 -8, 16 -8, 26 -6 L 26 6 C 16 8, -18 8, -26 1 Z"
                    fill="#0369a1"
                    opacity="0.35"
                  />

                  {/* Teak Wood Aft Deck & Swim Platform */}
                  <rect x="18" y="-7" width="9" height="14" rx="2" fill="#d97706" />
                  <line x1="21" y1="-6" x2="21" y2="6" stroke="#92400e" strokeWidth="0.8" />
                  <line x1="24" y1="-6" x2="24" y2="6" stroke="#92400e" strokeWidth="0.8" />

                  {/* Teak Wood Foredeck Inlay */}
                  <path d="M -22 0 C -16 -6, -2 -6, 0 -6 L 0 6 C -2 6, -16 6, -22 0 Z" fill="#b45309" opacity="0.85" />

                  {/* Aerodynamic Bridge Superstructure with Tinted Windshield */}
                  <path d="M -18 -5 L -2 -5 L 14 -3 L 14 3 L -2 5 L -18 5 Z" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
                  {/* Tinted Panoramic Solar Glass Windshield */}
                  <path d="M -16 -4 L -3 -4 L 8 -2.5 L 8 2.5 L -3 4 L -16 4 Z" fill="#0f172a" />
                  <path d="M -14 -3.5 L -4 -3.5 L 4 -2 L 4 2 L -4 3.5 L -14 3.5 Z" fill="#0284c7" opacity="0.75" />

                  {/* Stainless Steel Radar Arch with Rotating Radar Scanner */}
                  <g transform="translate(6, 0)">
                    <rect x="-1.5" y="-6" width="3" height="12" rx="1" fill="#e2e8f0" stroke="#64748b" strokeWidth="0.8" />
                    <g className="anim-radar">
                      <line x1="-5" y1="0" x2="5" y2="0" stroke="#f8fafc" strokeWidth="2.2" strokeLinecap="round" />
                      <circle cx="0" cy="0" r="1.5" fill="#0284c7" />
                    </g>
                  </g>

                  {/* Stainless Steel Bow Railing & Nav Light */}
                  <circle cx="-28" cy="0" r="2" fill="#f59e0b" />
                  {/* Starboard Green Nav Light */}
                  <circle cx="26" cy="-6" r="1.6" fill="#10b981" />
                  {/* Port Red Nav Light */}
                  <circle cx="26" cy="6" r="1.6" fill="#ef4444" />
                </g>
              </g>
            </g>

            {/* ============================================================== */}
            {/* 2. SCENIC RAILWAY TRACK & SMOOTH SHINKANSEN BULLET TRAIN       */}
            {/* ============================================================== */}
            <g id="scenic-railway">
              {/* Ballast Stone Bed with Textured Edges */}
              <line x1="-90" y1="2640" x2="1090" y2="2520" stroke="#44403c" strokeWidth="24" strokeLinecap="round" />
              <line x1="-90" y1="2640" x2="1090" y2="2520" stroke="#292524" strokeWidth="18" strokeLinecap="round" />

              {/* Concrete Railroad Ties / Sleepers with Tie-Plate Fasteners */}
              {Array.from({ length: 60 }).map((_, i) => {
                const t = i / 59;
                const x = -70 + t * 1140;
                const y = 2638 - t * 120;
                return (
                  <g key={`tie-${i}`}>
                    {/* Concrete Sleeper Bar */}
                    <line
                      x1={x - 1}
                      y1={y - 10}
                      x2={x + 1}
                      y2={y + 10}
                      stroke="#78716c"
                      strokeWidth="4.5"
                      strokeLinecap="round"
                    />
                    {/* Iron Tie Plates at Rail Contacts */}
                    <circle cx={x - 0.5} cy={y - 4.5} r="1.8" fill="#1c1917" />
                    <circle cx={x + 0.5} cy={y + 4.5} r="1.8" fill="#1c1917" />
                  </g>
                );
              })}

              {/* Polished Continuous Welded Steel Twin Rails with Chrome Specular Highlight */}
              {/* Rail 1 (Top) */}
              <line x1="-90" y1="2635" x2="1090" y2="2515" stroke="#1e293b" strokeWidth="3" />
              <line x1="-90" y1="2634.5" x2="1090" y2="2514.5" stroke="#ffffff" strokeWidth="1.2" opacity="0.9" />

              {/* Rail 2 (Bottom) */}
              <line x1="-90" y1="2645" x2="1090" y2="2525" stroke="#1e293b" strokeWidth="3" />
              <line x1="-90" y1="2644.5" x2="1090" y2="2524.5" stroke="#ffffff" strokeWidth="1.2" opacity="0.9" />

              {/* Overhead Catenary Electric Gantry Poles (Spaced along track) */}
              {[180, 520, 860].map((poleX, pIdx) => {
                const poleY = 2638 - ((poleX + 70) / 1140) * 120;
                return (
                  <g key={`catenary-${pIdx}`} transform={`translate(${poleX}, ${poleY})`}>
                    {/* Steel Lattice Mast Foundation */}
                    <rect x="-3" y="-18" width="6" height="5" fill="#44403c" rx="1" />
                    {/* Vertical Mast Pole */}
                    <line x1="0" y1="-18" x2="0" y2="-28" stroke="#cbd5e1" strokeWidth="2.5" />
                    {/* Cantilever Cross Arm */}
                    <line x1="-2" y1="-28" x2="10" y2="-26" stroke="#e2e8f0" strokeWidth="2" />
                    <circle cx="10" cy="-26" r="1.2" fill="#ef4444" />
                    {/* Drop Insulator */}
                    <line x1="10" y1="-26" x2="10" y2="-22" stroke="#64748b" strokeWidth="1.5" />
                  </g>
                );
              })}

              {/* PURE SVG NATIVE ANIMATEMOTION: High-Speed Bullet Train locked onto Rail Track */}
              <g>
                <animateMotion
                  path="M -230 2655 L 1230 2505"
                  rotate="auto"
                  dur="9.5s"
                  repeatCount="indefinite"
                />
                {/* High-Speed Bullet Train Consist (Locomotive + Coaches + Tail) */}
                <g>
                  {/* High-Speed Ground Cast Shadow */}
                  <rect
                    x="-180"
                    y="-9"
                    width="360"
                    height="18"
                    rx="8"
                    fill="#000000"
                    opacity="0.4"
                    filter="url(#landscapeShadow)"
                  />

                  {/* Forward Xenon Projector Light Beam Cone */}
                  <polygon
                    points="180,-4 270,-18 270,18 180,4"
                    fill="url(#trainHeadlightCone)"
                  />

                  {/* Aerodynamic Shinkansen Lead Locomotive */}
                  <path
                    d="M 120 -7.5 L 175 -3.5 C 188 0, 188 0, 175 3.5 L 120 7.5 Z"
                    fill="url(#bulletTrainBody)"
                    stroke="#0284c7"
                    strokeWidth="1.4"
                  />
                  {/* Driver Cockpit Windshield with Cyan Instrument Glow */}
                  <path d="M 142 -5 L 168 -2 L 168 2 L 142 5 Z" fill="#0f172a" stroke="#0284c7" strokeWidth="0.8" />
                  <circle cx="152" cy="0" r="1.5" fill="#38bdf8" opacity="0.8" />

                  {/* High-Intensity Twin Projector Xenon Headlights */}
                  <circle cx="178" cy="-2" r="2.4" fill="#ffffff" />
                  <circle cx="178" cy="2" r="2.4" fill="#ffffff" />
                  <circle cx="178" cy="0" r="3" fill="#fde047" opacity="0.9" />

                  {/* Coach 1 (Forward Passenger Car) */}
                  <rect x="35" y="-7.5" width="80" height="15" rx="3" fill="url(#bulletTrainBody)" stroke="#38bdf8" strokeWidth="1" />
                  {/* Dark Window Tint Strip */}
                  <rect x="42" y="-4" width="66" height="8" rx="2" fill="#0f172a" />
                  {/* Warm Passenger Cabin Glow */}
                  <line x1="45" y1="0" x2="105" y2="0" stroke="#fef08a" strokeWidth="3" opacity="0.9" />
                  {/* Inter-Car Aerodynamic Gangway Diaphragm */}
                  <rect x="28" y="-6" width="7" height="12" rx="1.5" fill="#1e293b" />

                  {/* Coach 2 (Center Passenger Car with High-Speed Pantograph) */}
                  <rect x="-55" y="-7.5" width="80" height="15" rx="3" fill="url(#bulletTrainBody)" stroke="#38bdf8" strokeWidth="1" />
                  <rect x="-48" y="-4" width="66" height="8" rx="2" fill="#0f172a" />
                  <line x1="-45" y1="0" x2="15" y2="0" stroke="#fef08a" strokeWidth="3" opacity="0.9" />
                  {/* Aerodynamic Single-Arm Pantograph */}
                  <g transform="translate(-20, -8.5)">
                    <rect x="-6" y="-2" width="12" height="2" rx="0.5" fill="#d97706" />
                    <line x1="-3" y1="-2" x2="2" y2="-6" stroke="#f8fafc" strokeWidth="1.4" />
                    <line x1="2" y1="-6" x2="8" y2="-6" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" />
                    {/* Intermittent Pantograph Electric Contact Spark */}
                    <circle cx="8" cy="-6" r="3.5" fill="#38bdf8" className="anim-spark" />
                  </g>
                  {/* Inter-Car Diaphragm */}
                  <rect x="-62" y="-6" width="7" height="12" rx="1.5" fill="#1e293b" />

                  {/* Coach 3 (Rear Locomotive / Tail Coach) */}
                  <rect x="-145" y="-7.5" width="80" height="15" rx="3" fill="url(#bulletTrainBody)" stroke="#38bdf8" strokeWidth="1" />
                  <rect x="-138" y="-4" width="66" height="8" rx="2" fill="#0f172a" />
                  <line x1="-135" y1="0" x2="-75" y2="0" stroke="#fef08a" strokeWidth="3" opacity="0.9" />
                  {/* Rear Tail Nose Taper */}
                  <path d="M -145 -7.5 L -165 -3.5 L -165 3.5 L -145 7.5 Z" fill="url(#bulletTrainBody)" stroke="#0284c7" strokeWidth="1.2" />
                  {/* Ruby Red LED Tail Marker Lights */}
                  <circle cx="-166" cy="-3.5" r="2.4" fill="#ef4444" />
                  <circle cx="-166" cy="3.5" r="2.4" fill="#ef4444" />
                  <circle cx="-168" cy="0" r="4" fill="#ef4444" opacity="0.5" />
                </g>
              </g>
            </g>

            {/* ============================================================== */}
            {/* 3. SCENIC ROTATING WIND TURBINES (Windmills)                   */}
            {/* ============================================================== */}
            <g id="wind-turbines">
              {/* Wind Turbine 1 (Left flank at Y=1080) */}
              <g transform="translate(100, 1080)">
                <ellipse cx="0" cy="20" rx="18" ry="7" fill="#000000" opacity="0.2" />
                {/* Tapered White Tubular Steel Mast Tower */}
                <polygon points="-4.5,20 4.5,20 2,0 -2,0" fill="#f5f5f4" stroke="#a8a29e" strokeWidth="1" />
                {/* Nacelle Generator Hub */}
                <circle cx="0" cy="0" r="5.5" fill="#e7e5e4" stroke="#78716c" strokeWidth="1.2" />
                {/* Red Aviation Obstruction Warning Strobe Light */}
                <circle cx="0" cy="-6" r="2.2" fill="#ef4444" className="anim-beacon" />
                {/* Spinning 3 Rotor Blades with Red Warning Tips */}
                <g className="anim-turbine">
                  <path d="M 0 0 L 2.8 -40 L -2.8 -40 Z" fill="#ffffff" stroke="#e2e8f0" strokeWidth="0.6" />
                  <rect x="-2.8" y="-40" width="5.6" height="7" fill="#ef4444" />

                  <path d="M 0 0 L 37 20 L 34 25 Z" fill="#ffffff" stroke="#e2e8f0" strokeWidth="0.6" />
                  <circle cx="36" cy="22" r="2.8" fill="#ef4444" />

                  <path d="M 0 0 L -39 20 L -36 25 Z" fill="#ffffff" stroke="#e2e8f0" strokeWidth="0.6" />
                  <circle cx="-38" cy="22" r="2.8" fill="#ef4444" />

                  <circle cx="0" cy="0" r="3.2" fill="#ef4444" />
                </g>
              </g>

              {/* Wind Turbine 2 (Right flank at Y=3550) */}
              <g transform="translate(890, 3550)">
                <ellipse cx="0" cy="20" rx="18" ry="7" fill="#000000" opacity="0.2" />
                <polygon points="-4.5,20 4.5,20 2,0 -2,0" fill="#f5f5f4" stroke="#a8a29e" strokeWidth="1" />
                <circle cx="0" cy="0" r="5.5" fill="#e7e5e4" stroke="#78716c" strokeWidth="1.2" />
                <circle cx="0" cy="-6" r="2.2" fill="#ef4444" className="anim-beacon" style={{ animationDelay: "0.7s" }} />
                <g className="anim-turbine" style={{ animationDuration: "5.2s" }}>
                  <path d="M 0 0 L 2.8 -40 L -2.8 -40 Z" fill="#ffffff" stroke="#e2e8f0" strokeWidth="0.6" />
                  <rect x="-2.8" y="-40" width="5.6" height="7" fill="#ef4444" />

                  <path d="M 0 0 L 37 20 L 34 25 Z" fill="#ffffff" stroke="#e2e8f0" strokeWidth="0.6" />
                  <circle cx="36" cy="22" r="2.8" fill="#ef4444" />

                  <path d="M 0 0 L -39 20 L -36 25 Z" fill="#ffffff" stroke="#e2e8f0" strokeWidth="0.6" />
                  <circle cx="-38" cy="22" r="2.8" fill="#ef4444" />

                  <circle cx="0" cy="0" r="3.2" fill="#ef4444" />
                </g>
              </g>
            </g>

            {/* ============================================================== */}
            {/* 4. ROADSIDE SCENIC TREES & FOLIAGE                             */}
            {/* ============================================================== */}
            <g id="roadside-trees">
              {/* Tree clusters near Station 1 (Left flank) */}
              <g transform="translate(130, 480)" filter="url(#landscapeShadow)">
                <circle cx="0" cy="0" r="19" fill="#4d7c0f" />
                <circle cx="-4" cy="-4" r="14" fill="#365314" />
                <circle cx="3" cy="3" r="8" fill="#65a30d" />
              </g>
              <g transform="translate(90, 560)" filter="url(#landscapeShadow)">
                <circle cx="0" cy="0" r="23" fill="#b45309" />
                <circle cx="-5" cy="-5" r="16" fill="#78350f" />
                <circle cx="4" cy="2" r="9" fill="#d97706" />
              </g>

              {/* Tree clusters near River (Right flank) */}
              <g transform="translate(890, 1680)" filter="url(#landscapeShadow)">
                <circle cx="0" cy="0" r="25" fill="#365314" />
                <circle cx="-6" cy="-6" r="17" fill="#14532d" />
                <circle cx="4" cy="3" r="10" fill="#4d7c0f" />
              </g>
              <g transform="translate(930, 1750)" filter="url(#landscapeShadow)">
                <circle cx="0" cy="0" r="21" fill="#4d7c0f" />
                <circle cx="-4" cy="-3" r="13" fill="#15803d" />
              </g>

              {/* Tree clusters near Railway (Left flank) */}
              <g transform="translate(80, 2480)" filter="url(#landscapeShadow)">
                <circle cx="0" cy="0" r="23" fill="#ca8a04" />
                <circle cx="-5" cy="-4" r="15" fill="#854d0e" />
              </g>

              {/* Tree clusters near Destination (Left flank) */}
              <g transform="translate(120, 4520)" filter="url(#landscapeShadow)">
                <circle cx="0" cy="0" r="25" fill="#14532d" />
                <circle cx="-5" cy="-5" r="17" fill="#052e16" />
                <circle cx="4" cy="2" r="9" fill="#166534" />
              </g>
            </g>

            {/* ============================================================== */}
            {/* 5. HIGHWAY ROADWAY, OVERPASSES & CAR PARKING BAY               */}
            {/* ============================================================== */}

            {/* Roadbed Outer Curb / Shoulder */}
            <path
              d={pathD}
              fill="none"
              stroke="#524a42"
              strokeWidth="48"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Concrete Road Edges */}
            <path
              d={pathD}
              fill="none"
              stroke="#38322c"
              strokeWidth="40"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Dark Asphalt Highway Corridor */}
            <path
              d={pathD}
              fill="none"
              stroke="#181615"
              strokeWidth="34"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Solid White Outer Lane Margins */}
            <path
              d={pathD}
              fill="none"
              stroke="#ffffff"
              strokeWidth="1.4"
              strokeOpacity="0.8"
            />
            {/* White Center Dashed Lane Divider */}
            <path
              d={pathD}
              fill="none"
              stroke="#f5f5f4"
              strokeWidth="2.5"
              strokeDasharray="16 14"
              strokeLinecap="round"
            />

            {/* ============================================================== */}
            {/* 6. GRAND ARCHITECTURAL RIVER VIADUCT BRIDGE (X=780, Y=1715-1845)*/}
            {/* ============================================================== */}
            <g id="river-viaduct-bridge">
              {/* Heavy Cast Shadow from Elevated Bridge Deck onto River Water */}
              <rect
                x="758"
                y="1725"
                width="62"
                height="105"
                rx="6"
                fill="#000000"
                opacity="0.45"
                filter="url(#bridgeDeepShadow)"
              />

              {/* Concrete Bridge Abutments on Riverbanks */}
              {/* North Bank Abutment (Y=1715) */}
              <rect x="746" y="1710" width="68" height="12" rx="3" fill="url(#concreteStructure)" stroke="#57534e" strokeWidth="1" />
              {/* South Bank Abutment (Y=1835) */}
              <rect x="746" y="1832" width="68" height="12" rx="3" fill="url(#concreteStructure)" stroke="#57534e" strokeWidth="1" />

              {/* Heavy Concrete Piers Rooted in the River Water */}
              {/* Pier 1 (Water entry at Y=1755) */}
              <g transform="translate(780, 1755)">
                {/* Water wake foam around pier base */}
                <ellipse cx="0" cy="0" rx="32" ry="8" fill="#e0f2fe" opacity="0.6" />
                <rect x="-26" y="-5" width="52" height="10" rx="5" fill="#44403c" stroke="#292524" strokeWidth="1.2" />
                <rect x="-24" y="-4" width="48" height="8" rx="4" fill="url(#concreteStructure)" />
              </g>

              {/* Pier 2 (Water entry at Y=1800) */}
              <g transform="translate(780, 1800)">
                <ellipse cx="0" cy="0" rx="32" ry="8" fill="#e0f2fe" opacity="0.6" />
                <rect x="-26" y="-5" width="52" height="10" rx="5" fill="#44403c" stroke="#292524" strokeWidth="1.2" />
                <rect x="-24" y="-4" width="48" height="8" rx="4" fill="url(#concreteStructure)" />
              </g>

              {/* Elevated Bridge Road Deck Slab with Concrete Curbs */}
              <rect x="752" y="1714" width="56" height="130" rx="4" fill="#292524" stroke="#78716c" strokeWidth="1" />
              <rect x="756" y="1714" width="48" height="130" fill="#181615" />
              {/* Bridge Deck Center Line */}
              <line x1="780" y1="1714" x2="780" y2="1844" stroke="#ffffff" strokeWidth="2.5" strokeDasharray="16 14" />

              {/* Steel Safety Railing Balusters (Left & Right Sides) */}
              {Array.from({ length: 14 }).map((_, i) => (
                <React.Fragment key={`viaduct-baluster-${i}`}>
                  {/* Left Baluster Post */}
                  <line x1="752" y1={1718 + i * 9.5} x2="755" y2={1718 + i * 9.5} stroke="#f8fafc" strokeWidth="2" strokeLinecap="round" />
                  {/* Right Baluster Post */}
                  <line x1="805" y1={1718 + i * 9.5} x2="808" y2={1718 + i * 9.5} stroke="#f8fafc" strokeWidth="2" strokeLinecap="round" />
                </React.Fragment>
              ))}
              {/* Continuous Top Handrails */}
              <line x1="752" y1="1714" x2="752" y2="1844" stroke="#e2e8f0" strokeWidth="3" strokeLinecap="round" />
              <line x1="808" y1="1714" x2="808" y2="1844" stroke="#e2e8f0" strokeWidth="3" strokeLinecap="round" />

              {/* Maritime River Clearance Beacon Lights on Bridge Underside */}
              <circle cx="750" cy="1775" r="2.5" fill="#ef4444" className="anim-beacon" />
              <circle cx="810" cy="1775" r="2.5" fill="#10b981" className="anim-beacon" />
            </g>

            {/* ============================================================== */}
            {/* 7. HIGHWAY RAILWAY FLYOVER OVERPASS (X=220, Y=2540-2645)        */}
            {/* ============================================================== */}
            <g id="rail-flyover-overpass">
              {/* Heavy Cast Shadow across Ballast and Rails */}
              <rect
                x="198"
                y="2545"
                width="64"
                height="100"
                rx="6"
                fill="#000000"
                opacity="0.55"
                filter="url(#bridgeDeepShadow)"
              />

              {/* Reinforced Concrete Abutment Walls */}
              <rect x="186" y="2536" width="68" height="12" rx="3" fill="url(#concreteStructure)" stroke="#44403c" strokeWidth="1" />
              <rect x="186" y="2638" width="68" height="12" rx="3" fill="url(#concreteStructure)" stroke="#44403c" strokeWidth="1" />

              {/* Center Pier Column with Black & Yellow Chevron Hazard Striping */}
              <g transform="translate(220, 2590)">
                <rect x="-18" y="-4" width="36" height="8" rx="2" fill="#18181b" />
                <rect x="-16" y="-3" width="32" height="6" rx="1.5" fill="#eab308" />
                {/* Hazard Warning Stripes */}
                <line x1="-12" y1="-3" x2="-8" y2="3" stroke="#000000" strokeWidth="2.5" />
                <line x1="-4" y1="-3" x2="0" y2="3" stroke="#000000" strokeWidth="2.5" />
                <line x1="4" y1="-3" x2="8" y2="3" stroke="#000000" strokeWidth="2.5" />
                <line x1="12" y1="-3" x2="16" y2="3" stroke="#000000" strokeWidth="2.5" />
              </g>

              {/* Elevated Bridge Road Deck Slab */}
              <rect x="192" y="2540" width="56" height="106" rx="4" fill="#292524" stroke="#78716c" strokeWidth="1" />
              <rect x="196" y="2540" width="48" height="106" fill="#181615" />
              <line x1="220" y1="2540" x2="220" y2="2646" stroke="#ffffff" strokeWidth="2.5" strokeDasharray="16 14" />

              {/* Jersey Crash Barriers & Reflectors */}
              <rect x="190" y="2540" width="5" height="106" rx="2" fill="#e2e8f0" stroke="#78716c" strokeWidth="0.8" />
              <rect x="245" y="2540" width="5" height="106" rx="2" fill="#e2e8f0" stroke="#78716c" strokeWidth="0.8" />
              {/* Safety Amber Reflectors */}
              <circle cx="192.5" cy="2565" r="1.5" fill="#f59e0b" />
              <circle cx="192.5" cy="2620" r="1.5" fill="#f59e0b" />
              <circle cx="247.5" cy="2565" r="1.5" fill="#f59e0b" />
              <circle cx="247.5" cy="2620" r="1.5" fill="#f59e0b" />
            </g>

            {/* Reference Path for Length Measurement */}
            <path
              ref={pathRef}
              d={pathD}
              fill="none"
              stroke="transparent"
              strokeWidth="1"
            />

            {/* Dynamic Illuminated Progress Trail */}
            <path
              ref={progressTrailRef}
              d={pathD}
              fill="none"
              stroke="url(#routeGradient)"
              strokeWidth="7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Station Checkpoint Nodes on Path (Stations 1-5) */}
            {STATIONS.map((station, idx) => {
              if (idx === 5) return null; // Station 6 is the Parking Stall
              const isPast = activeStationIndex >= idx;
              const isCurrent = activeStationIndex === idx;

              return (
                <g key={station.id} transform={`translate(${station.coordX}, ${station.coordY})`}>
                  {/* Pulsing ring if active */}
                  {isCurrent && (
                    <circle
                      r="36"
                      fill="none"
                      stroke="#f59e0b"
                      strokeWidth="2.5"
                      className="animate-ping opacity-60"
                    />
                  )}
                  {/* Node Outer Circle */}
                  <circle
                    r="22"
                    fill="#ffffff"
                    stroke={isPast ? "#d97706" : "#a8a29e"}
                    strokeWidth="4"
                    filter="url(#carRealisticShadow)"
                  />
                  {/* Inner Node Core */}
                  <circle
                    r="10"
                    fill={isPast ? "#d97706" : "#78716c"}
                  />
                  {/* Station Number */}
                  <text
                    y="4"
                    textAnchor="middle"
                    fill="#ffffff"
                    fontSize="10"
                    fontFamily="monospace"
                    fontWeight="bold"
                  >
                    {idx + 1}
                  </text>
                </g>
              );
            })}

            {/* 8. Executive Reserved Parking Stall at Destination (coordY ~4650, coordX: 220) */}
            <g transform="translate(220, 4650)">
              {/* Paved Parking Apron */}
              <rect
                x="-55"
                y="-65"
                width="110"
                height="130"
                rx="16"
                fill="#1f1c19"
                stroke="#d97706"
                strokeWidth="2"
              />
              {/* Crisp White Parking Stall Lines */}
              <line x1="-36" y1="-50" x2="-36" y2="45" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
              <line x1="36" y1="-50" x2="36" y2="45" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
              <line x1="-36" y1="45" x2="36" y2="45" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />

              {/* Diagonal Safety Stripes on Stall Wings */}
              <line x1="-48" y1="-30" x2="-38" y2="-20" stroke="#f59e0b" strokeWidth="2" opacity="0.6" />
              <line x1="-48" y1="-10" x2="-38" y2="0" stroke="#f59e0b" strokeWidth="2" opacity="0.6" />
              <line x1="-48" y1="10" x2="-38" y2="20" stroke="#f59e0b" strokeWidth="2" opacity="0.6" />

              <line x1="38" y1="-30" x2="48" y2="-20" stroke="#f59e0b" strokeWidth="2" opacity="0.6" />
              <line x1="38" y1="-10" x2="48" y2="0" stroke="#f59e0b" strokeWidth="2" opacity="0.6" />
              <line x1="38" y1="10" x2="48" y2="20" stroke="#f59e0b" strokeWidth="2" opacity="0.6" />

              {/* Front Parking Concrete Wheel Stop */}
              <rect x="-24" y="32" width="48" height="7" rx="2" fill="#e7e5e4" stroke="#78716c" strokeWidth="1" />

              {/* EV Charging Station Post */}
              <rect x="38" y="24" width="10" height="18" rx="3" fill="#0284c7" />
              <circle cx="43" cy="30" r="2" fill="#38bdf8" className="animate-pulse" />

              {/* Painted Asphalt Text for Shohag Hossen */}
              <text
                x="0"
                y="-25"
                textAnchor="middle"
                fill="#d97706"
                fontSize="8"
                fontFamily="monospace"
                fontWeight="bold"
                letterSpacing="1"
              >
                RESERVED
              </text>
              <text
                x="0"
                y="-12"
                textAnchor="middle"
                fill="#ffffff"
                fontSize="9"
                fontFamily="monospace"
                fontWeight="bold"
                letterSpacing="1"
              >
                SHOHAG HOSSEN
              </text>

              {/* Parking Space Badge */}
              <rect x="-14" y="2" width="28" height="14" rx="4" fill="#d97706" />
              <text
                x="0"
                y="12"
                textAnchor="middle"
                fill="#ffffff"
                fontSize="9"
                fontFamily="monospace"
                fontWeight="bold"
              >
                P-01
              </text>

              {/* Parking Status Beacon */}
              <circle
                cx="0"
                cy="54"
                r="4"
                fill={isParked ? "#10b981" : "#f59e0b"}
                className={isParked ? "animate-pulse" : ""}
              />
            </g>

            {/* ============================================================== */}
            {/* 9. HYPER-REALISTIC 2D TOP-DOWN GT SPORTS COUPE (120fps Ref)    */}
            {/* ============================================================== */}
            <g
              ref={carGroupRef}
              transform="translate(500, 40) rotate(90)"
              filter="url(#carRealisticShadow)"
            >
              {/* Volumetric Dual Forward Headlight Beam Cones */}
              <polygon
                points="28,-10 110,-34 110,34 28,10"
                fill="url(#headlightBeam)"
              />

              {/* Forward Navigation Guidance Arrow (Mounted ahead of bumper) */}
              <g transform="translate(46, 0)">
                <polygon
                  points="14,0 0,-8 3.5,0 0,8"
                  fill="#f59e0b"
                  stroke="#ffffff"
                  strokeWidth="1.2"
                />
              </g>

              {/* 4 Performance Wheels with Steerable Front Wheels */}
              {/* Front-Left Wheel (Rotates dynamically with steering angle via ref) */}
              <g ref={frontLeftWheelRef} transform="translate(14, -17)">
                <rect x="-10" y="-3" width="20" height="6" rx="2" fill="#090807" />
                <rect x="-7" y="-2" width="14" height="4" rx="1.5" fill="url(#alloyRim)" />
                <rect x="-2" y="-2.5" width="4" height="1.5" fill="#f59e0b" />
              </g>
              {/* Front-Right Wheel (Rotates dynamically with steering angle via ref) */}
              <g ref={frontRightWheelRef} transform="translate(14, 17)">
                <rect x="-10" y="-3" width="20" height="6" rx="2" fill="#090807" />
                <rect x="-7" y="-2" width="14" height="4" rx="1.5" fill="url(#alloyRim)" />
                <rect x="-2" y="1" width="4" height="1.5" fill="#f59e0b" />
              </g>
              {/* Rear-Left Wheel */}
              <g transform="translate(-16, -17)">
                <rect x="-10" y="-3" width="20" height="6" rx="2" fill="#090807" />
                <rect x="-7" y="-2" width="14" height="4" rx="1.5" fill="url(#alloyRim)" />
                <rect x="-2" y="-2.5" width="4" height="1.5" fill="#f59e0b" />
              </g>
              {/* Rear-Right Wheel */}
              <g transform="translate(-16, 17)">
                <rect x="-10" y="-3" width="20" height="6" rx="2" fill="#090807" />
                <rect x="-7" y="-2" width="14" height="4" rx="1.5" fill="url(#alloyRim)" />
                <rect x="-2" y="1" width="4" height="1.5" fill="#f59e0b" />
              </g>

              {/* Aerodynamic GT Chassis Body */}
              <path
                d="M 30 0
                   C 30 -8, 26 -14, 16 -14
                   L -22 -14
                   C -28 -14, -30 -8, -30 0
                   C -30 8, -28 14, -22 14
                   L 16 14
                   C 26 14, 30 8, 30 0 Z"
                fill="url(#carBodyGrad)"
                stroke="#d97706"
                strokeWidth="1.6"
              />

              {/* Side Aero Mirrors with micro-indicator LEDs */}
              <rect x="5" y="-18" width="5" height="3" rx="1.5" fill="#292524" stroke="#d97706" strokeWidth="0.8" />
              <circle cx="9" cy="-16.5" r="0.8" fill="#f59e0b" />
              <rect x="5" y="15" width="5" height="3" rx="1.5" fill="#292524" stroke="#d97706" strokeWidth="0.8" />
              <circle cx="9" cy="16.5" r="0.8" fill="#f59e0b" />

              {/* Sculpted Hood Power Lines */}
              <line x1="8" y1="-7" x2="26" y2="-4" stroke="#44403c" strokeWidth="1.2" />
              <line x1="8" y1="7" x2="26" y2="4" stroke="#44403c" strokeWidth="1.2" />
              <line x1="18" y1="0" x2="28" y2="0" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" />

              {/* Curved Panoramic Cockpit & Windshield */}
              <path
                d="M 12 0 C 12 -7, 8 -10, 2 -10 L -14 -10 C -18 -10, -20 -7, -20 0 C -20 7, -18 10, -14 10 L 2 10 C 8 10, 12 7, 12 0 Z"
                fill="#0c0a09"
                stroke="#44403c"
                strokeWidth="1"
              />

              {/* Front Windshield Glass Reflection */}
              <path
                d="M 11 0 C 11 -6, 8 -9, 4 -9 L 2 -9 C 6 -9, 8 -6, 8 0 C 8 6, 6 9, 2 9 L 4 9 C 8 9, 11 6, 11 0 Z"
                fill="url(#windshieldGlass)"
              />

              {/* Rear Window Glass Reflection */}
              <path
                d="M -13 0 C -13 -6, -15 -8, -19 -8 L -20 -8 C -16 -8, -14 -6, -14 0 C -14 6, -16 8, -20 8 L -19 8 C -15 8, -13 6, -13 0 Z"
                fill="url(#windshieldGlass)"
              />

              {/* Center Carbon Fiber Roof Rib */}
              <rect x="-14" y="-7" width="16" height="14" rx="2" fill="#1c1917" stroke="#292524" strokeWidth="0.8" />

              {/* Front Quad LED Projector Headlights */}
              <rect x="27" y="-10" width="3" height="4" rx="1" fill="#fef08a" />
              <rect x="27" y="6" width="3" height="4" rx="1" fill="#fef08a" />

              {/* Rear LED Brake Lights (Dynamic intensity via refs) */}
              <circle ref={brakeLightLeftRef} cx="-29" cy="-9" r="2.5" fill="#ef4444" />
              <circle ref={brakeLightRightRef} cx="-29" cy="9" r="2.5" fill="#ef4444" />

              {/* Dual Exhaust Tips */}
              <circle cx="-30" cy="-5" r="1.2" fill="#78716c" stroke="#1c1917" strokeWidth="0.6" />
              <circle cx="-30" cy="5" r="1.2" fill="#78716c" stroke="#1c1917" strokeWidth="0.6" />
            </g>

            {/* ============================================================== */}
            {/* 10. CLOUDS MOVING ON TOP OF EVERY OBJECT (Top Layer)           */}
            {/* ============================================================== */}
            <g id="clouds-top-overlay" opacity="0.8">
              {/* Cloud 1 - Top Sky High Layer */}
              <g className="anim-cloud-top-1">
                <path
                  d="M 120 220 Q 150 180 190 195 Q 240 170 280 205 Q 320 190 340 230 Q 350 270 310 285 Q 260 295 200 285 Q 140 295 110 260 Q 95 235 120 220 Z"
                  fill="#ffffff"
                  filter="url(#cloudShadow)"
                />
              </g>

              {/* Cloud 2 - Mid Landscape High Layer (Crossing over river & viaduct) */}
              <g className="anim-cloud-top-2">
                <path
                  d="M 680 1950 Q 720 1910 760 1925 Q 810 1900 850 1935 Q 890 1920 910 1960 Q 920 2000 880 2015 Q 830 2025 770 2015 Q 710 2025 680 1990 Q 665 1965 680 1950 Z"
                  fill="#ffffff"
                  filter="url(#cloudShadow)"
                />
              </g>

              {/* Cloud 3 - Lower Route High Layer (Crossing over rail & overpass) */}
              <g className="anim-cloud-top-3">
                <path
                  d="M 220 3350 Q 260 3310 300 3325 Q 350 3300 390 3335 Q 430 3320 450 3360 Q 460 3400 420 3415 Q 370 3425 310 3415 Q 250 3425 220 3390 Q 205 3365 220 3350 Z"
                  fill="#ffffff"
                  filter="url(#cloudShadow)"
                />
              </g>
            </g>
          </svg>

          {/* ============================================================== */}
          {/* 6 STATIONS CONTENT CARDS: STRICTLY ON THE ROADSIDE             */}
          {/* ============================================================== */}

          {/* STATION 1: ORIGIN NARRATIVE (Road is on Left at X=220, Card is on RIGHT flank) */}
          <div
            className="absolute left-[26%] sm:left-[30%] lg:left-[44%] right-2 sm:right-6 max-w-xl pointer-events-auto transition-all duration-300"
            style={{ top: "420px" }}
          >
            <div className="glass-card p-4 sm:p-7 lg:p-8 rounded-2xl sm:rounded-3xl border border-white/70 shadow-2xl backdrop-blur-xl bg-white/85">
              <div className="flex items-center gap-2 mb-2 text-stone-700 text-xs font-mono font-semibold">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                <span>ROOTS &amp; FOUNDATIONS</span>
              </div>

              <h2 className="text-lg sm:text-2xl font-extrabold uppercase text-stone-950 mb-3 leading-tight">
                Engineering scalable solutions
                <span className="block text-amber-900 font-serif lowercase italic text-xl sm:text-2xl">
                  from concept to high-volume production.
                </span>
              </h2>

              <p className="text-xs sm:text-sm text-stone-800 leading-relaxed mb-4 sm:mb-5">
                B.Sc. in Computer Science &amp; Engineering graduate from Dhaka International University. Proven track record leading projects across web, mobile, e-commerce, and cybersecurity threat detection platforms.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
                <div className="p-2.5 sm:p-3 rounded-2xl bg-white/85 border border-stone-200/70 text-center shadow-sm">
                  <span className="block text-lg sm:text-xl font-bold text-stone-900">4+</span>
                  <span className="text-[10px] sm:text-[11px] font-mono text-stone-500">Years Experience</span>
                </div>
                <div className="p-2.5 sm:p-3 rounded-2xl bg-white/85 border border-stone-200/70 text-center shadow-sm">
                  <span className="block text-lg sm:text-xl font-bold text-amber-800">35+</span>
                  <span className="text-[10px] sm:text-[11px] font-mono text-stone-500">Projects Shipped</span>
                </div>
                <div className="p-2.5 sm:p-3 rounded-2xl bg-white/85 border border-stone-200/70 text-center shadow-sm">
                  <span className="block text-lg sm:text-xl font-bold text-stone-900">100%</span>
                  <span className="text-[10px] sm:text-[11px] font-mono text-stone-500">Client Satisfaction</span>
                </div>
              </div>
            </div>
          </div>

          {/* STATION 2: PHILOSOPHY & ART DIRECTION (Road is on Right at X=780, Card is on LEFT flank) */}
          <div
            className="absolute left-2 sm:left-6 right-[26%] sm:right-[30%] lg:right-[44%] max-w-xl pointer-events-auto transition-all duration-300"
            style={{ top: "1180px" }}
          >
            <div className="glass-card p-4 sm:p-7 lg:p-8 rounded-2xl sm:rounded-3xl border border-white/70 shadow-2xl backdrop-blur-xl bg-white/85">
              <div className="flex items-center gap-2 mb-2 text-amber-900 text-xs font-mono font-semibold">
                <Palette className="w-4 h-4" />
                <span>DESIGN SYSTEMS &amp; ARCHITECTURE</span>
              </div>

              <h2 className="text-lg sm:text-2xl font-extrabold uppercase text-stone-950 mb-3 leading-tight">
                Clean code meets intuitive UI.
                <span className="block text-amber-900 font-serif lowercase italic text-xl sm:text-2xl">
                  Built for performance, clarity and scale.
                </span>
              </h2>

              <p className="text-xs sm:text-sm text-stone-800 leading-relaxed mb-4 sm:mb-5">
                Every interface is crafted with pixel precision in Figma, engineered with modern component architectures, and optimized for sub-second load times across mobile and desktop devices.
              </p>

              {/* Interactive Typography Playground Fragment */}
              <div className="p-3 sm:p-4 rounded-2xl bg-white/95 border border-stone-200 shadow-sm mb-4">
                <div className="flex items-center justify-between text-xs font-mono text-stone-500 mb-2">
                  <span>UI TYPOGRAPHY PREVIEW</span>
                  <div className="flex gap-1">
                    {(["editorial", "brutalist", "modern"] as const).map((style) => (
                      <button
                        key={style}
                        onClick={() => setActiveTypographyStyle(style)}
                        className={`px-2 py-0.5 rounded text-[10px] uppercase font-mono transition-colors cursor-pointer ${
                          activeTypographyStyle === style
                            ? "bg-stone-900 text-white font-bold"
                            : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                        }`}
                      >
                        {style}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="py-2 border-t border-stone-100">
                  {activeTypographyStyle === "editorial" && (
                    <div className="font-serif italic text-base sm:text-xl text-stone-900 leading-snug">
                      &ldquo;Form follows purpose. Crafting memorable, high-converting digital products.&rdquo;
                    </div>
                  )}
                  {activeTypographyStyle === "brutalist" && (
                    <div className="font-mono text-xs sm:text-base font-bold text-stone-950 tracking-tighter uppercase leading-tight">
                      [FAST_EXECUTION :: FULL_STACK_AGILITY // SCALABLE_SYSTEMS]
                    </div>
                  )}
                  {activeTypographyStyle === "modern" && (
                    <div className="font-sans font-extrabold text-sm sm:text-lg text-stone-900 tracking-tight leading-snug">
                      Responsive multi-device interfaces with zero layout shifts and seamless animations.
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {["Responsive Web Design", "Figma Design Systems", "API Architecture", "SEO Optimization"].map(
                  (tag) => (
                    <span
                      key={tag}
                      className="text-[10px] sm:text-[11px] font-mono px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-stone-100/90 text-stone-700 border border-stone-200/80"
                    >
                      ✓ {tag}
                    </span>
                  )
                )}
              </div>
            </div>
          </div>

          {/* STATION 3: CREATIVE ENGINEERING (Road is on Left at X=220, Card is on RIGHT flank) */}
          <div
            className="absolute left-[26%] sm:left-[30%] lg:left-[44%] right-2 sm:right-6 max-w-xl pointer-events-auto transition-all duration-300"
            style={{ top: "2020px" }}
          >
            <div className="glass-card p-4 sm:p-7 lg:p-8 rounded-2xl sm:rounded-3xl border border-white/70 shadow-2xl backdrop-blur-xl bg-white/85">
              <div className="flex items-center gap-2 mb-2 text-emerald-800 text-xs font-mono font-semibold">
                <Code2 className="w-4 h-4" />
                <span>FULL-STACK TECH STACK</span>
              </div>

              <h2 className="text-lg sm:text-2xl font-extrabold uppercase text-stone-950 mb-3 leading-tight">
                Modern full-stack engines.
                <span className="block text-amber-900 font-serif lowercase italic text-xl sm:text-2xl">
                  React, Node.js, Laravel &amp; Flutter.
                </span>
              </h2>

              <p className="text-xs sm:text-sm text-stone-800 leading-relaxed mb-4 sm:mb-5">
                From high-concurrency Node.js and Laravel backends to fluid React frontends and cross-platform Flutter apps. End-to-end integration with payment gateways, automated booking engines, and security monitoring.
              </p>

              {/* Live Architecture Matrix */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 mb-4 sm:mb-5">
                <div className="p-3 rounded-2xl bg-white/95 border border-stone-200 shadow-sm flex flex-col gap-1">
                  <span className="text-[10px] sm:text-[11px] font-mono text-stone-500">FRONT-END &amp; MOBILE</span>
                  <span className="text-xs font-bold text-stone-900">React, Next.js, Flutter</span>
                  <span className="text-[10px] text-stone-600">TypeScript, Flutter Flow, Tailwind CSS</span>
                </div>
                <div className="p-3 rounded-2xl bg-white/95 border border-stone-200 shadow-sm flex flex-col gap-1">
                  <span className="text-[10px] sm:text-[11px] font-mono text-stone-500">BACK-END &amp; CMS</span>
                  <span className="text-xs font-bold text-stone-900">Node.js, Laravel, WordPress</span>
                  <span className="text-[10px] text-stone-600">REST APIs, Shopify, Joomla, MySQL</span>
                </div>
                <div className="p-3 rounded-2xl bg-white/95 border border-stone-200 shadow-sm flex flex-col gap-1">
                  <span className="text-[10px] sm:text-[11px] font-mono text-stone-500">SECURITY &amp; DEVOPS</span>
                  <span className="text-xs font-bold text-stone-900">Threat Detection, CI/CD</span>
                  <span className="text-[10px] text-stone-600">Malware &amp; Phishing defense, Cloud deploy</span>
                </div>
                <div className="p-3 rounded-2xl bg-white/95 border border-stone-200 shadow-sm flex flex-col gap-1">
                  <span className="text-[10px] sm:text-[11px] font-mono text-stone-500">PRODUCTIVITY &amp; TOOLS</span>
                  <span className="text-xs font-bold text-emerald-800">Figma, VS Code, Git</span>
                  <span className="text-[10px] text-stone-600">Photoshop, Project Scheduling, SEO</span>
                </div>
              </div>

              {/* Terminal Code Snippet */}
              <div className="glass-dark p-3 sm:p-4 rounded-2xl font-mono text-[11px] sm:text-xs shadow-inner overflow-x-auto">
                <div className="flex items-center gap-1.5 text-stone-400 text-[10px] sm:text-[11px] pb-2 border-b border-stone-700/80 mb-2">
                  <Terminal className="w-3.5 h-3.5" />
                  <span>shohag-hossen/fullstack.config.ts</span>
                </div>
                <div className="text-emerald-400">
                  <span className="text-stone-400">// Lead Developer &amp; Project Manager</span>
                </div>
                <div className="text-stone-200">
                  const engineer = <span className="text-amber-300">createFullStackProfile</span>&#40;&#123;
                </div>
                <div className="text-stone-300 pl-4">
                  developer: <span className="text-amber-400">&quot;Shohag Hossen&quot;</span>,
                </div>
                <div className="text-stone-300 pl-4">
                  degree: <span className="text-cyan-400">&quot;B.Sc. in CSE, DIU&quot;</span>,
                </div>
                <div className="text-stone-300 pl-4">
                  focus: <span className="text-emerald-400">&quot;Full-Stack Dev + Cyber Threat Detection&quot;</span>,
                </div>
                <div className="text-stone-200">&#125;&#41;;</div>
              </div>
            </div>
          </div>

          {/* STATION 4: PROVEN TRACK RECORD & FLAGSHIPS (Road is on Right at X=780, Card is on LEFT flank) */}
          <div
            className="absolute left-2 sm:left-6 right-[26%] sm:right-[30%] lg:right-[44%] max-w-xl pointer-events-auto transition-all duration-300"
            style={{ top: "2880px" }}
          >
            <div className="glass-card p-4 sm:p-7 lg:p-8 rounded-2xl sm:rounded-3xl border border-white/70 shadow-2xl backdrop-blur-xl bg-white/85">
              <div className="flex items-center gap-2 mb-2 text-stone-700 text-xs font-mono font-semibold">
                <Briefcase className="w-4 h-4 text-amber-700" />
                <span>FLAGSHIP DELIVERABLES &amp; APPS</span>
              </div>

              <h2 className="text-lg sm:text-2xl font-extrabold uppercase text-stone-950 mb-3 leading-tight">
                Delivered across industries.
                <span className="block text-amber-900 font-serif lowercase italic text-xl sm:text-2xl">
                  Agency platforms, apps &amp; cyber systems.
                </span>
              </h2>

              <p className="text-xs sm:text-sm text-stone-800 leading-relaxed mb-4 sm:mb-5">
                Demonstrated success in launching complex booking platforms, responsive agency portals, e-commerce storefronts, and research thesis cybersecurity platforms.
              </p>

              {/* Interactive Project Switcher */}
              <div className="flex gap-1.5 overflow-x-auto pb-2 mb-4 scrollbar-none">
                {PROJECTS.map((proj, idx) => (
                  <button
                    key={proj.id}
                    onClick={() => setActiveProjectIdx(idx)}
                    className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-mono shrink-0 transition-all cursor-pointer ${
                      activeProjectIdx === idx
                        ? "bg-stone-900 text-white font-bold shadow-md"
                        : "bg-white/80 text-stone-700 hover:bg-stone-100 border border-stone-200"
                    }`}
                  >
                    {proj.title}
                  </button>
                ))}
              </div>

              {/* Active Project Highlight Card */}
              {(() => {
                const proj = PROJECTS[activeProjectIdx] || PROJECTS[0];
                return (
                  <div className="p-3.5 sm:p-5 rounded-2xl bg-white/95 border border-stone-200/90 shadow-md">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-xs font-bold text-stone-900 uppercase">
                        {proj.title}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[10px] font-mono font-semibold">
                        {proj.metrics.label}: {proj.metrics.value}
                      </span>
                    </div>

                    <p className="text-xs text-stone-700 mb-3 leading-relaxed">
                      {proj.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {proj.tech.map((t) => (
                        <span
                          key={t}
                          className="text-[10px] font-mono px-2 py-0.5 rounded bg-stone-100 text-stone-700"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    {proj.details?.testimonial && (
                      <div className="pt-3 border-t border-stone-100">
                        <p className="italic font-serif text-xs text-stone-800 leading-snug mb-1">
                          &ldquo;{proj.details.testimonial.quote}&rdquo;
                        </p>
                        <span className="text-[10px] font-mono text-stone-500">
                          — {proj.details.testimonial.author}, {proj.details.testimonial.role}
                        </span>
                      </div>
                    )}
                  </div>
                );
              })()}
            </div>
          </div>

          {/* STATION 5: WORK METHODOLOGY (Road is on Left at X=220, Card is on RIGHT flank) */}
          <div
            className="absolute left-[26%] sm:left-[30%] lg:left-[44%] right-2 sm:right-6 max-w-xl pointer-events-auto transition-all duration-300"
            style={{ top: "3720px" }}
          >
            <div className="glass-card p-4 sm:p-7 lg:p-8 rounded-2xl sm:rounded-3xl border border-white/70 shadow-2xl backdrop-blur-xl bg-white/85">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 text-stone-800 text-xs font-mono font-semibold">
                  <Sliders className="w-4 h-4 text-amber-700" />
                  <span>LEADERSHIP &amp; SPRINT DISCIPLINE</span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 font-semibold">
                  STEP {activeStepIdx + 1} OF {PROCESS_STEPS.length}
                </span>
              </div>

              <h2 className="text-lg sm:text-2xl font-extrabold uppercase text-stone-950 mb-2 leading-tight">
                From technical scoping
                <span className="block text-amber-900 font-serif lowercase italic text-xl sm:text-2xl">
                  to secure, on-time launch.
                </span>
              </h2>

              <p className="text-xs sm:text-sm text-stone-800 leading-relaxed mb-4">
                Managing developer task allocation, code reviews, backend integrations, and stakeholder alignment under tight sprint deadlines.
              </p>

              {/* Interactive Step Switcher Tabs */}
              <div className="flex items-center gap-1.5 p-1 rounded-full glass-card border border-stone-200/70 text-xs font-mono mb-4 overflow-x-auto scrollbar-none">
                {PROCESS_STEPS.map((step, idx) => (
                  <button
                    key={step.number}
                    onClick={() => setActiveStepIdx(idx)}
                    className={`px-2 sm:px-2.5 py-1 rounded-full transition-all duration-200 cursor-pointer shrink-0 text-[10px] sm:text-[11px] ${
                      activeStepIdx === idx
                        ? "bg-stone-900 text-white font-bold shadow-sm"
                        : "text-stone-600 hover:text-stone-900 hover:bg-white/60"
                    }`}
                  >
                    {step.number} {step.title}
                  </button>
                ))}
              </div>

              {/* Active Step Card */}
              {(() => {
                const step = PROCESS_STEPS[activeStepIdx];
                return (
                  <div className="p-3.5 sm:p-4 rounded-2xl bg-white/95 border border-stone-200/80 shadow-md">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2 sm:gap-2.5">
                        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-stone-900 text-white font-mono text-xs font-bold flex items-center justify-center shrink-0">
                          {step.number}
                        </div>
                        <div>
                          <div className="font-bold text-xs sm:text-sm text-stone-900 uppercase">
                            {step.title}
                          </div>
                          <div className="text-[9px] sm:text-[10px] font-mono text-stone-500">
                            {step.phase}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => setActiveStepIdx((prev) => (prev > 0 ? prev - 1 : PROCESS_STEPS.length - 1))}
                          className="px-2 py-1 rounded-lg text-[10px] sm:text-xs font-mono text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-colors cursor-pointer"
                          aria-label="Previous step"
                        >
                          ‹ PREV
                        </button>
                        <button
                          onClick={() => setActiveStepIdx((prev) => (prev < PROCESS_STEPS.length - 1 ? prev + 1 : 0))}
                          className="px-2 py-1 rounded-lg text-[10px] sm:text-xs font-mono text-stone-900 font-bold hover:bg-stone-100 transition-colors cursor-pointer"
                          aria-label="Next step"
                        >
                          NEXT ›
                        </button>
                      </div>
                    </div>

                    <p className="text-xs text-stone-700 leading-relaxed mb-3">
                      {step.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-2 border-t border-stone-100">
                      {step.deliverables.map((d) => (
                        <span
                          key={d}
                          className="text-[9px] sm:text-[10px] font-mono text-stone-700 bg-stone-100/90 px-2 py-0.5 rounded-md"
                        >
                          ✓ {d}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>

          {/* STATION 6: FINAL DESTINATION CARD (Road & Parking Stall on Left at X=220, Card is on RIGHT flank beside Parking Stall) */}
          <div
            className="absolute left-[26%] sm:left-[30%] lg:left-[44%] right-2 sm:right-6 max-w-xl pointer-events-auto transition-all duration-300"
            style={{ top: "4460px" }}
          >
            <div className="glass-card p-4 sm:p-8 lg:p-10 rounded-2xl sm:rounded-3xl border border-white/70 shadow-2xl backdrop-blur-xl bg-white/85 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-900 text-stone-100 text-xs font-mono mb-4 shadow-md">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>{isParked ? "DESTINATION REACHED • PARKED" : "DESTINATION AHEAD"}</span>
              </div>

              <h2 className="text-xl sm:text-4xl font-extrabold uppercase text-stone-950 mb-3 tracking-tight leading-tight">
                PARKED &amp; READY TO
                <span className="block text-amber-900 font-serif lowercase italic text-2xl sm:text-5xl">
                  build your next flagship.
                </span>
              </h2>

              <p className="text-xs sm:text-sm text-stone-800 leading-relaxed mb-6 font-normal">
                You&apos;ve completed the journey through my engineering stack, track record, and methodology. Explore my interactive CV or start a direct conversation below.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-3 mb-8">
                <button
                  onClick={() => setIsContactModalOpen(true)}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-stone-950 text-stone-50 hover:bg-stone-800 text-xs font-semibold tracking-wider transition-all duration-300 shadow-xl hover:shadow-2xl cursor-pointer group"
                >
                  <Sparkles className="w-4 h-4 text-amber-400 group-hover:rotate-12 transition-transform" />
                  <span>START A CONVERSATION</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <Link
                  href="/cv"
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold tracking-wider transition-all shadow-md cursor-pointer"
                >
                  <span>VIEW MY CV</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/"
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-full glass-card hover:bg-white text-stone-900 text-xs font-semibold tracking-wider transition-all border border-stone-200/80 shadow-md cursor-pointer bg-white/70"
                >
                  <span>HOME</span>
                </Link>
              </div>

              <div className="pt-6 border-t border-stone-200/80 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-stone-800">
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="hover:text-stone-950 transition-colors underline decoration-amber-600 underline-offset-4"
                >
                  {PERSONAL_INFO.email}
                </a>
                <span className="flex items-center gap-1.5 text-emerald-800 font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  +880 1646-679-886 • Dhaka, Bangladesh
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Global Interactive Contact Modal */}
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </main>
  );
}
