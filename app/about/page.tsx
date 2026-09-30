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

interface Station {
  id: string;
  label: string;
  coordX: number;
  coordY: number;
  side: "left" | "right";
}

// 6 Stations strictly flanking the winding highway (road is 100% unobstructed)
const STATIONS: Station[] = [
  { id: "origin", label: "Origin", coordX: 220, coordY: 520, side: "left" },
  { id: "craft", label: "Philosophy & Craft", coordX: 780, coordY: 1350, side: "right" },
  { id: "tech", label: "Creative Engineering", coordX: 220, coordY: 2200, side: "left" },
  { id: "track-record", label: "Flagship Products", coordX: 780, coordY: 3050, side: "right" },
  { id: "methodology", label: "Work Methodology", coordX: 220, coordY: 3900, side: "left" },
  { id: "destination", label: "Parking Bay", coordX: 220, coordY: 4650, side: "left" },
];

export default function AboutPage() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [activeStationIndex, setActiveStationIndex] = useState(0);
  const [activeProjectIdx, setActiveProjectIdx] = useState(0);
  const [activeTypographyStyle, setActiveTypographyStyle] = useState<"editorial" | "brutalist" | "modern">("editorial");
  const [isParked, setIsParked] = useState(false);

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

        ctx.fillStyle = `rgba(180, 160, 140, ${p.alpha})`;
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
        background: "radial-gradient(ellipse at 50% 30%, #faf8f5 0%, #f7f4ee 55%, #ede8de 100%)",
      }}
    >
      {/* CSS Keyframe Animations for Living Landscape (River, Boat, Train, Turbines, Birds, Clouds) */}
      <style jsx global>{`
        @keyframes riverWaterFlow {
          0% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: -140; }
        }
        @keyframes boatCruiseAlongRiver {
          0% { transform: translate(960px, 1720px) rotate(-16deg); }
          50% { transform: translate(500px, 1800px) rotate(-8deg); }
          100% { transform: translate(40px, 1860px) rotate(-4deg); }
        }
        @keyframes expressTrainRun {
          0% { transform: translate(-300px, 2640px) rotate(-7deg); }
          100% { transform: translate(1300px, 2520px) rotate(-7deg); }
        }
        @keyframes cloudDriftSlow1 {
          0% { transform: translateX(-180px); }
          100% { transform: translateX(1180px); }
        }
        @keyframes cloudDriftSlow2 {
          0% { transform: translateX(1180px); }
          100% { transform: translateX(-280px); }
        }
        @keyframes birdFlockFly {
          0% { transform: translate(-100px, 680px); }
          100% { transform: translate(1100px, 600px); }
        }
        @keyframes birdWingFlap {
          0%, 100% { transform: scaleY(1); }
          50% { transform: scaleY(0.35); }
        }
        @keyframes turbineRotorSpin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .anim-river-flow {
          stroke-dasharray: 20 14;
          animation: riverWaterFlow 2.6s linear infinite;
        }
        .anim-boat-cruise {
          animation: boatCruiseAlongRiver 24s linear infinite;
        }
        .anim-train-run {
          animation: expressTrainRun 13s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
        .anim-cloud-1 {
          animation: cloudDriftSlow1 65s linear infinite;
        }
        .anim-cloud-2 {
          animation: cloudDriftSlow2 80s linear infinite;
        }
        .anim-bird-flock {
          animation: birdFlockFly 26s linear infinite;
        }
        .anim-bird-wing {
          animation: birdWingFlap 0.32s ease-in-out infinite;
          transform-origin: center;
        }
        .anim-turbine {
          animation: turbineRotorSpin 4.5s linear infinite;
          transform-origin: 0px 0px;
        }
      `}</style>

      {/* Fixed Ambient Particles Canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full pointer-events-none z-0 opacity-60"
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

      {/* Main 2D Highway Route & Checkpoints Layer */}
      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-36 z-10">
        {/* Route Intro Header: Clean & Bold, matching Home page aesthetic */}
        <section className="text-center max-w-3xl mx-auto pt-2 pb-6 sm:pb-8">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-stone-950 uppercase leading-tight mb-3">
            THE CRAFT BEHIND
            <span className="block text-amber-900 italic font-serif lowercase text-3xl sm:text-5xl lg:text-6xl">
              the digital experience.
            </span>
          </h1>

          <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-normal max-w-xl mx-auto mb-3">
            Drive through the portfolio route below. Each milestone card sits cleanly on the roadside, leaving an unobstructed scenic highway for the car to navigate toward the final parking stall.
          </p>

          <div className="flex items-center justify-center gap-2 text-stone-700 text-[11px] font-mono animate-bounce">
            <ChevronDown className="w-3.5 h-3.5 text-stone-900" />
            <span>SCROLL DOWN TO DRIVE</span>
          </div>
        </section>

        {/* SVG Route Geometry & Living Landscape Layer (River, Boat, Railway, Train, Windmills, Clouds, Birds, Realistic Car) */}
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
                <stop offset="0%" stopColor="#fef08a" stopOpacity="0.85" />
                <stop offset="35%" stopColor="#fef9c3" stopOpacity="0.38" />
                <stop offset="75%" stopColor="#fef9c3" stopOpacity="0.12" />
                <stop offset="100%" stopColor="#fef9c3" stopOpacity="0" />
              </linearGradient>

              {/* River Water Gradient */}
              <linearGradient id="riverWater" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.75" />
                <stop offset="50%" stopColor="#0284c7" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#0369a1" stopOpacity="0.9" />
              </linearGradient>

              {/* High-Speed Train Metallic Body Gradient */}
              <linearGradient id="trainBodyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#f8fafc" />
                <stop offset="45%" stopColor="#e2e8f0" />
                <stop offset="55%" stopColor="#0284c7" />
                <stop offset="100%" stopColor="#0f172a" />
              </linearGradient>

              {/* Hyper-Realistic Metallic Car Chassis Gradient */}
              <linearGradient id="carBodyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#2b2825" />
                <stop offset="25%" stopColor="#3d3733" />
                <stop offset="50%" stopColor="#1e1c1a" />
                <stop offset="75%" stopColor="#2e2a27" />
                <stop offset="100%" stopColor="#1a1816" />
              </linearGradient>

              {/* Windshield Glass Reflection Gradient */}
              <linearGradient id="windshieldGlass" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0284c7" stopOpacity="0.85" />
                <stop offset="45%" stopColor="#38bdf8" stopOpacity="0.7" />
                <stop offset="55%" stopColor="#ffffff" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#0369a1" stopOpacity="0.85" />
              </linearGradient>

              {/* Alloy Wheel Rim Radial Gradient */}
              <radialGradient id="alloyRim" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#d6d3d1" />
                <stop offset="60%" stopColor="#78716c" />
                <stop offset="100%" stopColor="#1c1917" />
              </radialGradient>

              {/* Shadow Filter for 2D Vehicles and Objects */}
              <filter id="carRealisticShadow" x="-50%" y="-50%" width="200%" height="200%">
                <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="#000000" floodOpacity="0.4" />
              </filter>

              <filter id="landscapeShadow" x="-30%" y="-30%" width="160%" height="160%">
                <feDropShadow dx="0" dy="4" stdDeviation="5" floodColor="#000000" floodOpacity="0.2" />
              </filter>
            </defs>

            {/* ============================================================== */}
            {/* LIVING LANDSCAPE LAYER: RIVER, BOAT, RAILWAY, TRAIN, CLOUDS    */}
            {/* ============================================================== */}

            {/* 1. SCENIC RIVER (Winding water body crossing at Y ~ 1700 - 1880) */}
            <g id="scenic-river">
              {/* Riverbed Shoreline (Sand / Mud banks) */}
              <path
                d="M 1040 1710 C 820 1740, 680 1810, 480 1820 C 300 1830, 160 1870, -40 1880 L -40 1960 C 160 1950, 300 1910, 480 1900 C 680 1890, 820 1820, 1040 1790 Z"
                fill="#d8cebf"
                opacity="0.75"
              />
              {/* Deep Water Flow */}
              <path
                d="M 1040 1725 C 820 1755, 680 1825, 480 1835 C 300 1845, 160 1885, -40 1895 L -40 1945 C 160 1935, 300 1895, 480 1885 C 680 1875, 820 1805, 1040 1775 Z"
                fill="url(#riverWater)"
                filter="url(#landscapeShadow)"
              />
              {/* Animated Water Waves Current Lines */}
              <path
                d="M 1020 1745 C 810 1775, 670 1845, 470 1855 C 290 1865, 150 1905, -20 1915"
                fill="none"
                stroke="#e0f2fe"
                strokeWidth="2"
                strokeLinecap="round"
                opacity="0.85"
                className="anim-river-flow"
              />
              <path
                d="M 1000 1765 C 790 1795, 650 1865, 450 1875 C 270 1885, 130 1925, -20 1935"
                fill="none"
                stroke="#bae6fd"
                strokeWidth="1.6"
                strokeLinecap="round"
                opacity="0.7"
                className="anim-river-flow"
              />

              {/* MOVING 2D BOAT ON RIVER with Wake Waves (Continuously cruising) */}
              <g className="anim-boat-cruise">
                {/* Boat Stern V-Wake Water Trail */}
                <path
                  d="M 24 -4 L 55 -14 M 24 4 L 55 14"
                  stroke="#ffffff"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  opacity="0.7"
                />
                <circle cx="28" cy="0" r="4" fill="#e0f2fe" opacity="0.6" />

                {/* Boat Hull Shadow */}
                <ellipse cx="0" cy="2" rx="26" ry="8" fill="#000000" opacity="0.25" filter="url(#landscapeShadow)" />

                {/* Sleek Cruiser Hull */}
                <path
                  d="M -24 0 C -18 -8, 12 -8, 22 -6 L 22 6 C 12 8, -18 8, -24 0 Z"
                  fill="#ffffff"
                  stroke="#0369a1"
                  strokeWidth="1.5"
                />
                {/* Teak Wood Deck Accent */}
                <rect x="-10" y="-4" width="22" height="8" rx="2" fill="#d97706" opacity="0.85" />
                {/* Blue Cabin Windshield Roof */}
                <rect x="-14" y="-3.5" width="10" height="7" rx="1.5" fill="#0284c7" />
                {/* Bow Light */}
                <circle cx="-22" cy="0" r="1.5" fill="#f59e0b" />
              </g>
            </g>

            {/* 2. SCENIC RAILWAY TRACK & MOVING HIGH-SPEED TRAIN (Crossing at Y ~ 2540 - 2640) */}
            <g id="scenic-railway">
              {/* Ballast Gravel Bed */}
              <line x1="-60" y1="2640" x2="1060" y2="2520" stroke="#b0a89d" strokeWidth="20" strokeLinecap="round" />
              
              {/* Wooden Railway Ties */}
              {Array.from({ length: 48 }).map((_, i) => {
                const t = i / 47;
                const x = -40 + t * 1080;
                const y = 2635 - t * 115;
                return (
                  <line
                    key={`tie-${i}`}
                    x1={x - 1}
                    y1={y - 8}
                    x2={x + 1}
                    y2={y + 8}
                    stroke="#44403c"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                );
              })}

              {/* Steel Twin Rail Tracks */}
              <line x1="-60" y1="2636" x2="1060" y2="2516" stroke="#d6d3d1" strokeWidth="2.5" />
              <line x1="-60" y1="2644" x2="1060" y2="2524" stroke="#d6d3d1" strokeWidth="2.5" />

              {/* MOVING HIGH-SPEED MODERN EXPRESS TRAIN */}
              <g className="anim-train-run">
                {/* Train Ground Shadow */}
                <rect x="-170" y="-8" width="340" height="16" rx="6" fill="#000000" opacity="0.3" filter="url(#landscapeShadow)" />

                {/* Locomotive (Front) */}
                <path
                  d="M 120 -6 L 165 -3 C 172 0, 172 0, 165 3 L 120 6 Z"
                  fill="url(#trainBodyGrad)"
                  stroke="#0284c7"
                  strokeWidth="1.2"
                />
                {/* Locomotive Cab Windows */}
                <path d="M 135 -4 L 155 -2 L 155 2 L 135 4 Z" fill="#0f172a" />
                <circle cx="166" cy="0" r="2.5" fill="#fde047" />

                {/* Car 1 */}
                <rect x="35" y="-6" width="80" height="12" rx="3" fill="url(#trainBodyGrad)" stroke="#38bdf8" strokeWidth="1" />
                <rect x="42" y="-3.5" width="66" height="7" rx="1.5" fill="#0f172a" />
                <line x1="30" y1="0" x2="35" y2="0" stroke="#000000" strokeWidth="3" />

                {/* Car 2 (Center Coach) */}
                <rect x="-55" y="-6" width="80" height="12" rx="3" fill="url(#trainBodyGrad)" stroke="#38bdf8" strokeWidth="1" />
                <rect x="-48" y="-3.5" width="66" height="7" rx="1.5" fill="#0f172a" />
                <line x1="-60" y1="0" x2="-55" y2="0" stroke="#000000" strokeWidth="3" />

                {/* Car 3 (Rear Coach) */}
                <rect x="-145" y="-6" width="80" height="12" rx="3" fill="url(#trainBodyGrad)" stroke="#38bdf8" strokeWidth="1" />
                <rect x="-138" y="-3.5" width="66" height="7" rx="1.5" fill="#0f172a" />
                <circle cx="-144" cy="-3" r="1.5" fill="#ef4444" />
                <circle cx="-144" cy="3" r="1.5" fill="#ef4444" />
              </g>
            </g>

            {/* 3. SCENIC ROTATING WIND TURBINES (Windmills) */}
            <g id="wind-turbines">
              {/* Wind Turbine 1 (Left background at Y=1080) */}
              <g transform="translate(100, 1080)">
                <ellipse cx="0" cy="18" rx="14" ry="5" fill="#000000" opacity="0.12" />
                <circle cx="0" cy="0" r="4.5" fill="#d6d3d1" stroke="#a8a29e" strokeWidth="1" />
                <g className="anim-turbine">
                  <path d="M 0 0 L 2 -32 L -2 -32 Z" fill="#ffffff" opacity="0.9" />
                  <path d="M 0 0 L 29 16 L 27 20 Z" fill="#ffffff" opacity="0.9" />
                  <path d="M 0 0 L -31 16 L -29 20 Z" fill="#ffffff" opacity="0.9" />
                  <circle cx="0" cy="0" r="2.5" fill="#ef4444" />
                </g>
              </g>

              {/* Wind Turbine 2 (Right background at Y=3550) */}
              <g transform="translate(890, 3550)">
                <ellipse cx="0" cy="18" rx="14" ry="5" fill="#000000" opacity="0.12" />
                <circle cx="0" cy="0" r="4.5" fill="#d6d3d1" stroke="#a8a29e" strokeWidth="1" />
                <g className="anim-turbine" style={{ animationDuration: "5.2s" }}>
                  <path d="M 0 0 L 2 -32 L -2 -32 Z" fill="#ffffff" opacity="0.9" />
                  <path d="M 0 0 L 29 16 L 27 20 Z" fill="#ffffff" opacity="0.9" />
                  <path d="M 0 0 L -31 16 L -29 20 Z" fill="#ffffff" opacity="0.9" />
                  <circle cx="0" cy="0" r="2.5" fill="#ef4444" />
                </g>
              </g>
            </g>

            {/* 4. ROADSIDE SCENIC TREES & FOLIAGE */}
            <g id="roadside-trees" opacity="0.9">
              {/* Tree clusters near Station 1 (Left flank) */}
              <g transform="translate(130, 480)" filter="url(#landscapeShadow)">
                <circle cx="0" cy="0" r="18" fill="#588157" />
                <circle cx="-4" cy="-4" r="12" fill="#3a5a40" />
                <circle cx="2" cy="2" r="6" fill="#a3b18a" />
              </g>
              <g transform="translate(90, 560)" filter="url(#landscapeShadow)">
                <circle cx="0" cy="0" r="22" fill="#bc6c25" />
                <circle cx="-5" cy="-5" r="14" fill="#99582a" />
              </g>

              {/* Tree clusters near River (Right flank) */}
              <g transform="translate(890, 1680)" filter="url(#landscapeShadow)">
                <circle cx="0" cy="0" r="24" fill="#3a5a40" />
                <circle cx="-6" cy="-6" r="15" fill="#344e41" />
              </g>
              <g transform="translate(930, 1750)" filter="url(#landscapeShadow)">
                <circle cx="0" cy="0" r="20" fill="#588157" />
              </g>

              {/* Tree clusters near Railway (Left flank) */}
              <g transform="translate(80, 2480)" filter="url(#landscapeShadow)">
                <circle cx="0" cy="0" r="22" fill="#dda15e" />
                <circle cx="-5" cy="-4" r="14" fill="#bc6c25" />
              </g>

              {/* Tree clusters near Destination (Left flank) */}
              <g transform="translate(120, 4520)" filter="url(#landscapeShadow)">
                <circle cx="0" cy="0" r="24" fill="#3a5a40" />
                <circle cx="-5" cy="-5" r="16" fill="#283618" />
              </g>
            </g>

            {/* 5. FLOCK OF FLYING BIRDS */}
            <g className="anim-bird-flock">
              <g transform="translate(0, 0)">
                <path d="M -8 0 Q -4 -6 0 0 Q 4 -6 8 0" fill="none" stroke="#292524" strokeWidth="2" strokeLinecap="round" className="anim-bird-wing" />
              </g>
              <g transform="translate(24, 14)">
                <path d="M -6 0 Q -3 -5 0 0 Q 3 -5 6 0" fill="none" stroke="#292524" strokeWidth="1.8" strokeLinecap="round" className="anim-bird-wing" />
              </g>
              <g transform="translate(16, -18)">
                <path d="M -7 0 Q -3.5 -5 0 0 Q 3.5 -5 7 0" fill="none" stroke="#292524" strokeWidth="1.8" strokeLinecap="round" className="anim-bird-wing" />
              </g>
            </g>

            {/* 6. DRIFTING AMBIENT 2D CLOUDS */}
            <g className="anim-cloud-1" opacity="0.6">
              <path
                d="M 120 220 Q 140 190 170 200 Q 210 180 240 210 Q 270 200 280 230 Q 290 260 260 270 Q 230 280 180 270 Q 130 280 110 250 Q 100 230 120 220 Z"
                fill="#ffffff"
                filter="url(#landscapeShadow)"
              />
            </g>
            <g className="anim-cloud-2" opacity="0.55">
              <path
                d="M 680 2850 Q 710 2820 740 2830 Q 780 2810 810 2840 Q 840 2830 850 2860 Q 860 2890 830 2900 Q 790 2910 740 2900 Q 690 2910 670 2880 Q 660 2860 680 2850 Z"
                fill="#ffffff"
                filter="url(#landscapeShadow)"
              />
            </g>

            {/* ============================================================== */}
            {/* HIGHWAY ROADWAY, OVERPASSES & CAR PARKING BAY                   */}
            {/* ============================================================== */}

            {/* Roadbed Outer Gravel / Curbs */}
            <path
              d={pathD}
              fill="none"
              stroke="#b5aba0"
              strokeWidth="48"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Concrete Road Curbs */}
            <path
              d={pathD}
              fill="none"
              stroke="#443e39"
              strokeWidth="40"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Dark Asphalt Driving Highway */}
            <path
              d={pathD}
              fill="none"
              stroke="#181615"
              strokeWidth="34"
              strokeLinecap="round"
              strokeLinejoin="round"
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

            {/* HIGHWAY RIVER BRIDGE OVERPASS (Concrete Barriers where road crosses river) */}
            <g id="river-bridge-barriers">
              <rect x="752" y="1720" width="6" height="75" rx="2" fill="#e7e5e4" stroke="#78716c" strokeWidth="1" />
              <rect x="802" y="1720" width="6" height="75" rx="2" fill="#e7e5e4" stroke="#78716c" strokeWidth="1" />
            </g>

            {/* HIGHWAY RAILWAY FLYOVER OVERPASS (Safety Barriers where road crosses train track) */}
            <g id="rail-bridge-barriers">
              <rect x="192" y="2540" width="6" height="80" rx="2" fill="#e7e5e4" stroke="#78716c" strokeWidth="1" />
              <rect x="242" y="2540" width="6" height="80" rx="2" fill="#e7e5e4" stroke="#78716c" strokeWidth="1" />
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

            {/* 6. Illustrated Car Parking Stall at Destination (coordY ~4650, coordX: 220) */}
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
              {/* White Parking Stall Lines */}
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

              {/* Painted Asphalt Text */}
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
                ALEXANDER CHEN
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
            {/* HYPER-REALISTIC 2D TOP-DOWN GT SPORTS COUPE (Ref-Driven 120fps) */}
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

              {/* Forward Navigation Guidance Arrow (Mounted ahead of the bumper) */}
              <g transform="translate(46, 0)">
                <polygon
                  points="14,0 0,-8 3.5,0 0,8"
                  fill="#f59e0b"
                  stroke="#ffffff"
                  strokeWidth="1.2"
                />
              </g>

              {/* 4 Performance Wheels with Realistic Tires, Alloy Rims, Calipers & Steerable Front Wheels */}
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
          </svg>

          {/* ============================================================== */}
          {/* 6 STATIONS CONTENT CARDS: STRICTLY ON THE ROADSIDE             */}
          {/* ============================================================== */}

          {/* STATION 1: ORIGIN NARRATIVE (Road is on Left at X=220, Card is on RIGHT flank) */}
          <div
            className="absolute left-4 lg:left-[44%] right-4 lg:right-6 max-w-xl pointer-events-auto transition-all duration-300"
            style={{ top: "420px" }}
          >
            <div className="glass-card p-6 sm:p-8 rounded-3xl border border-white/70 shadow-2xl backdrop-blur-xl bg-white/85">
              <div className="flex items-center gap-2 mb-2 text-stone-700 text-xs font-mono font-semibold">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                <span>ROOTS &amp; FOUNDATIONS</span>
              </div>

              <h2 className="text-xl sm:text-2xl font-extrabold uppercase text-stone-950 mb-3 leading-tight">
                Born at the intersection of
                <span className="block text-amber-800 font-serif lowercase italic text-2xl">
                  mathematics and artistic expression.
                </span>
              </h2>

              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed mb-5">
                Over the past 8+ years, I&apos;ve helped venture-backed startups and category-defining leaders turn ambitious visions into fast, fluid, high-converting digital products.
              </p>

              <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
                <div className="p-3 rounded-2xl bg-white/85 border border-stone-200/70 text-center shadow-sm">
                  <span className="block text-xl font-bold text-stone-900">8+</span>
                  <span className="text-[11px] font-mono text-stone-500">Years Crafting</span>
                </div>
                <div className="p-3 rounded-2xl bg-white/85 border border-stone-200/70 text-center shadow-sm">
                  <span className="block text-xl font-bold text-amber-800">100%</span>
                  <span className="text-[11px] font-mono text-stone-500">Core Web Vitals</span>
                </div>
                <div className="p-3 rounded-2xl bg-white/85 border border-stone-200/70 text-center shadow-sm">
                  <span className="block text-xl font-bold text-stone-900">3x</span>
                  <span className="text-[11px] font-mono text-stone-500">Awwwards SOTD</span>
                </div>
              </div>
            </div>
          </div>

          {/* STATION 2: PHILOSOPHY & ART DIRECTION (Road is on Right at X=780, Card is on LEFT flank) */}
          <div
            className="absolute left-4 lg:left-6 right-4 lg:right-[44%] max-w-xl pointer-events-auto transition-all duration-300"
            style={{ top: "1180px" }}
          >
            <div className="glass-card p-6 sm:p-8 rounded-3xl border border-white/70 shadow-2xl backdrop-blur-xl bg-white/85">
              <div className="flex items-center gap-2 mb-2 text-amber-800 text-xs font-mono font-semibold">
                <Palette className="w-4 h-4" />
                <span>CRAFT &amp; ART DIRECTION</span>
              </div>

              <h2 className="text-xl sm:text-2xl font-extrabold uppercase text-stone-950 mb-3 leading-tight">
                Great code without taste is hollow.
                <span className="block text-amber-800 font-serif lowercase italic text-2xl">
                  Great design without speed is unusable.
                </span>
              </h2>

              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed mb-5">
                Every project begins with typographic structure, spatial rhythm, and narrative intent. I never use generic SaaS templates or off-the-shelf themes. Each interface is bespoke, designed to communicate authority and emotional resonance.
              </p>

              {/* Interactive Typography Playground Fragment */}
              <div className="p-4 rounded-2xl bg-white/95 border border-stone-200 shadow-sm mb-4">
                <div className="flex items-center justify-between text-xs font-mono text-stone-500 mb-2">
                  <span>TYPOGRAPHIC ARCHITECTURE</span>
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
                    <div className="font-serif italic text-lg sm:text-xl text-stone-900 leading-snug">
                      &ldquo;Form follows emotional impact. Crafting timeless digital identity.&rdquo;
                    </div>
                  )}
                  {activeTypographyStyle === "brutalist" && (
                    <div className="font-mono text-sm sm:text-base font-bold text-stone-950 tracking-tighter uppercase leading-tight">
                      [STRUCTURAL_MINIMALISM :: MONO_PROPORTIONS // ZERO_FRICTION]
                    </div>
                  )}
                  {activeTypographyStyle === "modern" && (
                    <div className="font-sans font-extrabold text-base sm:text-lg text-stone-900 tracking-tight leading-snug">
                      Fluid typography systems synchronized to viewport geometry and device pixel density.
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {["Editorial Design", "Design Systems & Tokens", "Kinetic Typography", "Sub-Pixel Rendering"].map(
                  (tag) => (
                    <span
                      key={tag}
                      className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-stone-100/90 text-stone-700 border border-stone-200/80"
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
            className="absolute left-4 lg:left-[44%] right-4 lg:right-6 max-w-xl pointer-events-auto transition-all duration-300"
            style={{ top: "2020px" }}
          >
            <div className="glass-card p-6 sm:p-8 rounded-3xl border border-white/70 shadow-2xl backdrop-blur-xl bg-white/85">
              <div className="flex items-center gap-2 mb-2 text-emerald-800 text-xs font-mono font-semibold">
                <Code2 className="w-4 h-4" />
                <span>CREATIVE ENGINEERING</span>
              </div>

              <h2 className="text-xl sm:text-2xl font-extrabold uppercase text-stone-950 mb-3 leading-tight">
                Sub-frame response.
                <span className="block text-amber-800 font-serif lowercase italic text-2xl">
                  Hardware-accelerated motion.
                </span>
              </h2>

              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed mb-5">
                Front-end development isn&apos;t just writing markup — it is choreographing memory, render loops, and network packets. I engineer web experiences that feel physical and instantaneous, targeting 60 to 120 FPS interactions without jank.
              </p>

              {/* Live Architecture Matrix */}
              <div className="grid grid-cols-2 gap-3 mb-5">
                <div className="p-3.5 rounded-2xl bg-white/95 border border-stone-200 shadow-sm flex flex-col gap-1">
                  <span className="text-[11px] font-mono text-stone-500">APPLICATION RUNTIME</span>
                  <span className="text-xs font-bold text-stone-900">Next.js 16 + React 19</span>
                  <span className="text-[10px] text-stone-600">Turbopack, Server Actions, Zero-bundle hydration</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-white/95 border border-stone-200 shadow-sm flex flex-col gap-1">
                  <span className="text-[11px] font-mono text-stone-500">MOTION ENGINE</span>
                  <span className="text-xs font-bold text-stone-900">GSAP + Canvas 2D</span>
                  <span className="text-[10px] text-stone-600">RAF interpolation, hardware rasterization</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-white/95 border border-stone-200 shadow-sm flex flex-col gap-1">
                  <span className="text-[11px] font-mono text-stone-500">STYLING ARCHITECTURE</span>
                  <span className="text-xs font-bold text-stone-900">Tailwind CSS 4.0</span>
                  <span className="text-[10px] text-stone-600">Ultra-lean atomic utility pipeline</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-white/95 border border-stone-200 shadow-sm flex flex-col gap-1">
                  <span className="text-[11px] font-mono text-stone-500">AUDIT BENCHMARK</span>
                  <span className="text-xs font-bold text-emerald-700">100 / 100 Lighthouse</span>
                  <span className="text-[10px] text-stone-600">Performance, Accessibility, SEO</span>
                </div>
              </div>

              {/* Terminal Code Snippet */}
              <div className="glass-dark p-4 rounded-2xl font-mono text-xs shadow-inner">
                <div className="flex items-center gap-1.5 text-stone-400 text-[11px] pb-2 border-b border-stone-700/80 mb-2">
                  <Terminal className="w-3.5 h-3.5" />
                  <span>alexander-chen/architecture.config.ts</span>
                </div>
                <div className="text-emerald-400">
                  <span className="text-stone-400">// Strict zero-jank render loop</span>
                </div>
                <div className="text-stone-200">
                  const engine = <span className="text-amber-300">createMotionPipeline</span>&#40;&#123;
                </div>
                <div className="text-stone-300 pl-4">
                  targetFPS: <span className="text-amber-400">120</span>,
                </div>
                <div className="text-stone-300 pl-4">
                  reducedMotion: <span className="text-cyan-400">detectUserPreference&#40;&#41;</span>,
                </div>
                <div className="text-stone-200">&#125;&#41;;</div>
              </div>
            </div>
          </div>

          {/* STATION 4: PROVEN TRACK RECORD & FLAGSHIPS (Road is on Right at X=780, Card is on LEFT flank) */}
          <div
            className="absolute left-4 lg:left-6 right-4 lg:right-[44%] max-w-xl pointer-events-auto transition-all duration-300"
            style={{ top: "2880px" }}
          >
            <div className="glass-card p-6 sm:p-8 rounded-3xl border border-white/70 shadow-2xl backdrop-blur-xl bg-white/85">
              <div className="flex items-center gap-2 mb-2 text-stone-700 text-xs font-mono font-semibold">
                <Briefcase className="w-4 h-4 text-amber-700" />
                <span>FLAGSHIP PORTFOLIO DELIVERABLES</span>
              </div>

              <h2 className="text-xl sm:text-2xl font-extrabold uppercase text-stone-950 mb-3 leading-tight">
                Engineered for conversion.
                <span className="block text-amber-800 font-serif lowercase italic text-2xl">
                  celebrated by the industry.
                </span>
              </h2>

              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed mb-5">
                Every client partnership is measured by tangible outcomes: venture capital closed, user adoption accelerated, and distinct brand defensibility established.
              </p>

              {/* Interactive Project Switcher */}
              <div className="flex gap-1.5 overflow-x-auto pb-2 mb-4 scrollbar-none">
                {PROJECTS.map((proj, idx) => (
                  <button
                    key={proj.id}
                    onClick={() => setActiveProjectIdx(idx)}
                    className={`px-3 py-1.5 rounded-full text-xs font-mono shrink-0 transition-all cursor-pointer ${
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
                  <div className="p-4 sm:p-5 rounded-2xl bg-white/95 border border-stone-200/90 shadow-md">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-xs font-bold text-stone-900 uppercase">
                        {proj.title}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[10px] font-mono font-semibold">
                        {proj.metrics.label}: {proj.metrics.value}
                      </span>
                    </div>

                    <p className="text-xs text-stone-600 mb-3 leading-relaxed">
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
            className="absolute left-4 lg:left-[44%] right-4 lg:right-6 max-w-xl pointer-events-auto transition-all duration-300"
            style={{ top: "3720px" }}
          >
            <div className="glass-card p-6 sm:p-8 rounded-3xl border border-white/70 shadow-2xl backdrop-blur-xl bg-white/85">
              <div className="flex items-center gap-2 mb-2 text-stone-800 text-xs font-mono font-semibold">
                <Sliders className="w-4 h-4 text-amber-700" />
                <span>SPRINT METHODOLOGY</span>
              </div>

              <h2 className="text-xl sm:text-2xl font-extrabold uppercase text-stone-950 mb-3 leading-tight">
                From abstract problem
                <span className="block text-amber-800 font-serif lowercase italic text-2xl">
                  to production flagship in 8 weeks.
                </span>
              </h2>

              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed mb-5">
                A disciplined, predictable framework engineered to minimize revisions and eliminate project drift. Every milestone has explicit deliverables and testing benchmarks.
              </p>

              <div className="space-y-2.5">
                {PROCESS_STEPS.map((step) => (
                  <div
                    key={step.number}
                    className="p-3.5 rounded-2xl bg-white/95 border border-stone-200/70 shadow-sm flex items-start gap-3"
                  >
                    <div className="w-7 h-7 rounded-xl bg-stone-900 text-white font-mono text-xs font-bold flex items-center justify-center shrink-0">
                      {step.number}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-xs text-stone-900 uppercase">
                          {step.title}
                        </span>
                        <span className="text-[10px] font-mono text-stone-500">
                          {step.phase}
                        </span>
                      </div>
                      <p className="text-[11px] text-stone-600 leading-relaxed mb-1.5">
                        {step.description}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {step.deliverables.map((d) => (
                          <span
                            key={d}
                            className="text-[9px] font-mono text-stone-600 bg-stone-100 px-1.5 py-0.5 rounded"
                          >
                            ✓ {d}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* STATION 6: FINAL DESTINATION CARD (Road & Parking Stall on Left at X=220, Card is on RIGHT flank beside Parking Stall) */}
          <div
            className="absolute left-4 lg:left-[44%] right-4 lg:right-6 max-w-xl pointer-events-auto transition-all duration-300"
            style={{ top: "4460px" }}
          >
            <div className="glass-card p-8 sm:p-10 rounded-3xl border border-white/70 shadow-2xl backdrop-blur-xl bg-white/85 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-900 text-stone-100 text-xs font-mono mb-4 shadow-md">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>{isParked ? "DESTINATION REACHED • PARKED" : "DESTINATION AHEAD"}</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-extrabold uppercase text-stone-950 mb-3 tracking-tight leading-tight">
                PARKED &amp; READY TO
                <span className="block text-amber-900 font-serif lowercase italic text-3xl sm:text-5xl">
                  build something exceptional.
                </span>
              </h2>

              <p className="text-xs sm:text-sm text-stone-800 leading-relaxed mb-6 font-normal">
                You&apos;ve completed the journey through my craft, engineering architecture, and track record. Currently reserving select client engagements for visionary founders and venture-backed teams.
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
                  href="/"
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-full glass-card hover:bg-white text-stone-900 text-xs font-semibold tracking-wider transition-all border border-stone-200/80 shadow-md cursor-pointer bg-white/70"
                >
                  <span>RETURN TO HOME</span>
                </Link>
              </div>

              <div className="pt-6 border-t border-stone-200/80 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-stone-700">
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="hover:text-stone-950 transition-colors underline decoration-amber-600 underline-offset-4"
                >
                  {PERSONAL_INFO.email}
                </a>
                <span className="flex items-center gap-1.5 text-emerald-800 font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Available for select Q4 engagements
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
