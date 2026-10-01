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
      {/* CSS Keyframe Animations for Living Landscape (River, Boat, Train, Turbines, Clouds) */}
      <style jsx global>{`
        @keyframes riverWaterFlow {
          0% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: -120; }
        }
        @keyframes cloudDriftSlow1 {
          0% { transform: translateX(-240px); }
          100% { transform: translateX(1240px); }
        }
        @keyframes cloudDriftSlow2 {
          0% { transform: translateX(1240px); }
          100% { transform: translateX(-320px); }
        }
        @keyframes cloudDriftSlow3 {
          0% { transform: translateX(-300px); }
          100% { transform: translateX(1200px); }
        }
        @keyframes turbineRotorSpin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes boatSway {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(2.5deg); }
        }
        .anim-river-flow {
          stroke-dasharray: 20 14;
          animation: riverWaterFlow 2.4s linear infinite;
        }
        .anim-cloud-top-1 {
          animation: cloudDriftSlow1 55s linear infinite;
        }
        .anim-cloud-top-2 {
          animation: cloudDriftSlow2 70s linear infinite;
        }
        .anim-cloud-top-3 {
          animation: cloudDriftSlow3 85s linear infinite;
        }
        .anim-turbine {
          animation: turbineRotorSpin 4.2s linear infinite;
          transform-origin: 0px 0px;
        }
        .anim-boat-body {
          animation: boatSway 3s ease-in-out infinite;
          transform-origin: 0px 0px;
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
                <stop offset="0%" stopColor="#fef08a" stopOpacity="0.85" />
                <stop offset="35%" stopColor="#fef9c3" stopOpacity="0.38" />
                <stop offset="75%" stopColor="#fef9c3" stopOpacity="0.12" />
                <stop offset="100%" stopColor="#fef9c3" stopOpacity="0" />
              </linearGradient>

              {/* River Water Deep & Shimmer Gradient */}
              <linearGradient id="riverWater" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.85" />
                <stop offset="45%" stopColor="#0284c7" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#0369a1" stopOpacity="0.95" />
              </linearGradient>

              {/* High-Speed Bullet Train Aerodynamic Metallic Body */}
              <linearGradient id="bulletTrainBody" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="40%" stopColor="#e2e8f0" />
                <stop offset="50%" stopColor="#0284c7" />
                <stop offset="85%" stopColor="#0f172a" />
                <stop offset="100%" stopColor="#020617" />
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

              {/* Shadow Filters for Realistic 2D Depth */}
              <filter id="carRealisticShadow" x="-50%" y="-50%" width="200%" height="200%">
                <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="#000000" floodOpacity="0.45" />
              </filter>

              <filter id="landscapeShadow" x="-30%" y="-30%" width="160%" height="160%">
                <feDropShadow dx="0" dy="4" stdDeviation="5" floodColor="#000000" floodOpacity="0.25" />
              </filter>

              <filter id="cloudShadow" x="-30%" y="-30%" width="160%" height="160%">
                <feDropShadow dx="0" dy="12" stdDeviation="12" floodColor="#1c1917" floodOpacity="0.18" />
              </filter>
            </defs>

            {/* ============================================================== */}
            {/* 1. SCENIC WINDING RIVER & SMOOTH CRUISING YACHT                */}
            {/* ============================================================== */}
            <g id="scenic-river">
              {/* Riverbed Shoreline (Sandy Earth Banks) */}
              <path
                d="M 1040 1705 C 820 1735, 680 1805, 480 1815 C 300 1825, 160 1865, -40 1875 L -40 1970 C 160 1960, 300 1920, 480 1910 C 680 1900, 820 1830, 1040 1800 Z"
                fill="#8f8477"
                opacity="0.65"
              />
              {/* Deep Water Channel */}
              <path
                d="M 1040 1720 C 820 1750, 680 1820, 480 1830 C 300 1840, 160 1880, -40 1890 L -40 1950 C 160 1940, 300 1900, 480 1890 C 680 1880, 820 1810, 1040 1780 Z"
                fill="url(#riverWater)"
                filter="url(#landscapeShadow)"
              />
              {/* Animated Flowing Water Currents */}
              <path
                d="M 1020 1740 C 810 1770, 670 1840, 470 1850 C 290 1860, 150 1900, -20 1910"
                fill="none"
                stroke="#e0f2fe"
                strokeWidth="2.5"
                strokeLinecap="round"
                opacity="0.9"
                className="anim-river-flow"
              />
              <path
                d="M 1000 1760 C 790 1790, 650 1860, 450 1870 C 270 1880, 130 1920, -20 1930"
                fill="none"
                stroke="#bae6fd"
                strokeWidth="1.8"
                strokeLinecap="round"
                opacity="0.75"
                className="anim-river-flow"
              />

              {/* PURE SVG NATIVE ANIMATEMOTION: Boat follows the EXACT River Bezier Path with Auto-Rotation */}
              <g>
                <animateMotion
                  path="M 1040 1750 C 820 1780, 680 1850, 480 1860 C 300 1870, 160 1910, -60 1920"
                  rotate="auto"
                  dur="24s"
                  repeatCount="indefinite"
                />
                {/* Boat Group with Realistic Shape and Stern V-Wake */}
                <g className="anim-boat-body" transform="scale(-1, 1)">
                  {/* Expanding Stern V-Wake Water Foam */}
                  <path
                    d="M 22 -4 L 55 -16 M 22 4 L 55 16 M 35 -7 L 70 -22 M 35 7 L 70 22"
                    stroke="#ffffff"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    opacity="0.8"
                  />
                  <ellipse cx="26" cy="0" rx="6" ry="3" fill="#e0f2fe" opacity="0.7" />

                  {/* Boat Shadow */}
                  <ellipse cx="0" cy="3" rx="26" ry="9" fill="#000000" opacity="0.3" filter="url(#landscapeShadow)" />

                  {/* Sleek Cruiser Hull */}
                  <path
                    d="M -26 0 C -20 -9, 14 -9, 24 -7 L 24 7 C 14 9, -20 9, -26 0 Z"
                    fill="#ffffff"
                    stroke="#0284c7"
                    strokeWidth="1.6"
                  />
                  {/* Teak Wood Deck Inlay */}
                  <rect x="-10" y="-5" width="24" height="10" rx="2" fill="#d97706" opacity="0.85" />
                  {/* Cabin with Tinted Curved Glass */}
                  <path d="M -16 -4 L -2 -4 L 6 -2 L 6 2 L -2 4 L -16 4 Z" fill="#0284c7" />
                  <rect x="-12" y="-3" width="10" height="6" rx="1.5" fill="#0f172a" />
                  {/* Stainless Bow Railing & Nav Light */}
                  <circle cx="-24" cy="0" r="1.8" fill="#f59e0b" />
                  <circle cx="23" cy="-5" r="1.2" fill="#10b981" />
                  <circle cx="23" cy="5" r="1.2" fill="#ef4444" />
                </g>
              </g>
            </g>

            {/* ============================================================== */}
            {/* 2. SCENIC RAILWAY TRACK & SMOOTH SHINKANSEN BULLET TRAIN       */}
            {/* ============================================================== */}
            <g id="scenic-railway">
              {/* Ballast Stone Bed */}
              <line x1="-80" y1="2640" x2="1080" y2="2520" stroke="#5a524a" strokeWidth="22" strokeLinecap="round" />
              
              {/* Wooden Railroad Ties / Sleepers */}
              {Array.from({ length: 50 }).map((_, i) => {
                const t = i / 49;
                const x = -60 + t * 1120;
                const y = 2638 - t * 120;
                return (
                  <line
                    key={`tie-${i}`}
                    x1={x - 1}
                    y1={y - 9}
                    x2={x + 1}
                    y2={y + 9}
                    stroke="#292524"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                );
              })}

              {/* Steel Twin Rail Tracks */}
              <line x1="-80" y1="2635" x2="1080" y2="2515" stroke="#e2e8f0" strokeWidth="2.5" />
              <line x1="-80" y1="2645" x2="1080" y2="2525" stroke="#e2e8f0" strokeWidth="2.5" />

              {/* PURE SVG NATIVE ANIMATEMOTION: High-Speed Train locked onto Rail Track */}
              <g>
                <animateMotion
                  path="M -220 2655 L 1220 2505"
                  rotate="auto"
                  dur="11s"
                  repeatCount="indefinite"
                />
                {/* Train Group with 3 Articulated High-Speed Coaches */}
                <g>
                  {/* Train Ground Shadow */}
                  <rect x="-170" y="-8" width="340" height="16" rx="6" fill="#000000" opacity="0.35" filter="url(#landscapeShadow)" />

                  {/* Aerodynamic Locomotive (Front) */}
                  <path
                    d="M 120 -7 L 172 -3 C 182 0, 182 0, 172 3 L 120 7 Z"
                    fill="url(#bulletTrainBody)"
                    stroke="#0284c7"
                    strokeWidth="1.2"
                  />
                  {/* Driver Cockpit Windshield */}
                  <path d="M 140 -5 L 165 -2 L 165 2 L 140 5 Z" fill="#0f172a" />
                  {/* Front High-Beam Headlights */}
                  <circle cx="174" cy="0" r="3" fill="#fde047" />

                  {/* Passenger Coach 1 */}
                  <rect x="35" y="-7" width="80" height="14" rx="3" fill="url(#bulletTrainBody)" stroke="#38bdf8" strokeWidth="1" />
                  <rect x="42" y="-4" width="66" height="8" rx="2" fill="#0f172a" />
                  {/* Interior Window Glow */}
                  <line x1="45" y1="0" x2="105" y2="0" stroke="#fef08a" strokeWidth="3" opacity="0.85" />
                  {/* Articulated Coupler */}
                  <line x1="30" y1="0" x2="35" y2="0" stroke="#000000" strokeWidth="4" />

                  {/* Passenger Coach 2 (Center) */}
                  <rect x="-55" y="-7" width="80" height="14" rx="3" fill="url(#bulletTrainBody)" stroke="#38bdf8" strokeWidth="1" />
                  <rect x="-48" y="-4" width="66" height="8" rx="2" fill="#0f172a" />
                  <line x1="-45" y1="0" x2="15" y2="0" stroke="#fef08a" strokeWidth="3" opacity="0.85" />
                  {/* Roof Aerodynamic Pantograph */}
                  <rect x="-20" y="-8.5" width="12" height="1.5" fill="#d97706" />
                  <line x1="-60" y1="0" x2="-55" y2="0" stroke="#000000" strokeWidth="4" />

                  {/* Passenger Coach 3 (Rear) */}
                  <rect x="-145" y="-7" width="80" height="14" rx="3" fill="url(#bulletTrainBody)" stroke="#38bdf8" strokeWidth="1" />
                  <rect x="-138" y="-4" width="66" height="8" rx="2" fill="#0f172a" />
                  <line x1="-135" y1="0" x2="-75" y2="0" stroke="#fef08a" strokeWidth="3" opacity="0.85" />
                  {/* Rear Red LED Marker Lights */}
                  <circle cx="-146" cy="-4" r="2" fill="#ef4444" />
                  <circle cx="-146" cy="4" r="2" fill="#ef4444" />
                </g>
              </g>
            </g>

            {/* ============================================================== */}
            {/* 3. SCENIC ROTATING WIND TURBINES (Windmills)                   */}
            {/* ============================================================== */}
            <g id="wind-turbines">
              {/* Wind Turbine 1 (Left flank at Y=1080) */}
              <g transform="translate(100, 1080)">
                <ellipse cx="0" cy="20" rx="16" ry="6" fill="#000000" opacity="0.18" />
                {/* Tapered White Mast Tower */}
                <polygon points="-4,20 4,20 2,0 -2,0" fill="#f5f5f4" stroke="#a8a29e" strokeWidth="0.8" />
                {/* Central Nacelle Generator Hub */}
                <circle cx="0" cy="0" r="5" fill="#e7e5e4" stroke="#78716c" strokeWidth="1" />
                {/* Spinning 3 Blades with Red Tips */}
                <g className="anim-turbine">
                  <path d="M 0 0 L 2.5 -38 L -2.5 -38 Z" fill="#ffffff" stroke="#e2e8f0" strokeWidth="0.5" />
                  <rect x="-2.5" y="-38" width="5" height="6" fill="#ef4444" />

                  <path d="M 0 0 L 35 19 L 32.5 24 Z" fill="#ffffff" stroke="#e2e8f0" strokeWidth="0.5" />
                  <circle cx="34" cy="21" r="2.5" fill="#ef4444" />

                  <path d="M 0 0 L -37 19 L -34.5 24 Z" fill="#ffffff" stroke="#e2e8f0" strokeWidth="0.5" />
                  <circle cx="-36" cy="21" r="2.5" fill="#ef4444" />

                  <circle cx="0" cy="0" r="3" fill="#ef4444" />
                </g>
              </g>

              {/* Wind Turbine 2 (Right flank at Y=3550) */}
              <g transform="translate(890, 3550)">
                <ellipse cx="0" cy="20" rx="16" ry="6" fill="#000000" opacity="0.18" />
                <polygon points="-4,20 4,20 2,0 -2,0" fill="#f5f5f4" stroke="#a8a29e" strokeWidth="0.8" />
                <circle cx="0" cy="0" r="5" fill="#e7e5e4" stroke="#78716c" strokeWidth="1" />
                <g className="anim-turbine" style={{ animationDuration: "5.4s" }}>
                  <path d="M 0 0 L 2.5 -38 L -2.5 -38 Z" fill="#ffffff" stroke="#e2e8f0" strokeWidth="0.5" />
                  <rect x="-2.5" y="-38" width="5" height="6" fill="#ef4444" />

                  <path d="M 0 0 L 35 19 L 32.5 24 Z" fill="#ffffff" stroke="#e2e8f0" strokeWidth="0.5" />
                  <circle cx="34" cy="21" r="2.5" fill="#ef4444" />

                  <path d="M 0 0 L -37 19 L -34.5 24 Z" fill="#ffffff" stroke="#e2e8f0" strokeWidth="0.5" />
                  <circle cx="-36" cy="21" r="2.5" fill="#ef4444" />

                  <circle cx="0" cy="0" r="3" fill="#ef4444" />
                </g>
              </g>
            </g>

            {/* ============================================================== */}
            {/* 4. ROADSIDE SCENIC TREES & FOLIAGE                             */}
            {/* ============================================================== */}
            <g id="roadside-trees">
              {/* Tree clusters near Station 1 (Left flank) */}
              <g transform="translate(130, 480)" filter="url(#landscapeShadow)">
                <circle cx="0" cy="0" r="18" fill="#4d7c0f" />
                <circle cx="-4" cy="-4" r="13" fill="#365314" />
                <circle cx="3" cy="3" r="7" fill="#65a30d" />
              </g>
              <g transform="translate(90, 560)" filter="url(#landscapeShadow)">
                <circle cx="0" cy="0" r="22" fill="#b45309" />
                <circle cx="-5" cy="-5" r="15" fill="#78350f" />
                <circle cx="4" cy="2" r="8" fill="#d97706" />
              </g>

              {/* Tree clusters near River (Right flank) */}
              <g transform="translate(890, 1680)" filter="url(#landscapeShadow)">
                <circle cx="0" cy="0" r="24" fill="#365314" />
                <circle cx="-6" cy="-6" r="16" fill="#14532d" />
                <circle cx="4" cy="3" r="9" fill="#4d7c0f" />
              </g>
              <g transform="translate(930, 1750)" filter="url(#landscapeShadow)">
                <circle cx="0" cy="0" r="20" fill="#4d7c0f" />
                <circle cx="-4" cy="-3" r="12" fill="#15803d" />
              </g>

              {/* Tree clusters near Railway (Left flank) */}
              <g transform="translate(80, 2480)" filter="url(#landscapeShadow)">
                <circle cx="0" cy="0" r="22" fill="#ca8a04" />
                <circle cx="-5" cy="-4" r="14" fill="#854d0e" />
              </g>

              {/* Tree clusters near Destination (Left flank) */}
              <g transform="translate(120, 4520)" filter="url(#landscapeShadow)">
                <circle cx="0" cy="0" r="24" fill="#14532d" />
                <circle cx="-5" cy="-5" r="16" fill="#052e16" />
                <circle cx="4" cy="2" r="8" fill="#166534" />
              </g>
            </g>

            {/* ============================================================== */}
            {/* HIGHWAY ROADWAY, OVERPASSES & CAR PARKING BAY                   */}
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

            {/* 6. Executive Reserved Parking Stall at Destination (coordY ~4650, coordX: 220) */}
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

            {/* ============================================================== */}
            {/* CLOUDS MOVING ON TOP OF EVERY OBJECT (User requested: Top Layer)*/}
            {/* ============================================================== */}
            <g id="clouds-top-overlay" opacity="0.75">
              {/* Cloud 1 - Top Sky High Layer */}
              <g className="anim-cloud-top-1">
                <path
                  d="M 120 220 Q 150 180 190 195 Q 240 170 280 205 Q 320 190 340 230 Q 350 270 310 285 Q 260 295 200 285 Q 140 295 110 260 Q 95 235 120 220 Z"
                  fill="#ffffff"
                  filter="url(#cloudShadow)"
                />
              </g>

              {/* Cloud 2 - Mid Landscape High Layer */}
              <g className="anim-cloud-top-2">
                <path
                  d="M 680 1950 Q 720 1910 760 1925 Q 810 1900 850 1935 Q 890 1920 910 1960 Q 920 2000 880 2015 Q 830 2025 770 2015 Q 710 2025 680 1990 Q 665 1965 680 1950 Z"
                  fill="#ffffff"
                  filter="url(#cloudShadow)"
                />
              </g>

              {/* Cloud 3 - Lower Route High Layer */}
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
            className="absolute left-4 lg:left-[44%] right-4 lg:right-6 max-w-xl pointer-events-auto transition-all duration-300"
            style={{ top: "420px" }}
          >
            <div className="glass-card p-6 sm:p-8 rounded-3xl border border-white/70 shadow-2xl backdrop-blur-xl bg-white/85">
              <div className="flex items-center gap-2 mb-2 text-stone-700 text-xs font-mono font-semibold">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                <span>ROOTS &amp; FOUNDATIONS</span>
              </div>

              <h2 className="text-xl sm:text-2xl font-extrabold uppercase text-stone-950 mb-3 leading-tight">
                Engineering scalable solutions
                <span className="block text-amber-900 font-serif lowercase italic text-2xl">
                  from concept to high-volume production.
                </span>
              </h2>

              <p className="text-xs sm:text-sm text-stone-800 leading-relaxed mb-5">
                B.Sc. in Computer Science &amp; Engineering graduate from Dhaka International University. Proven track record leading projects across web, mobile, e-commerce, and cybersecurity threat detection platforms.
              </p>

              <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
                <div className="p-3 rounded-2xl bg-white/85 border border-stone-200/70 text-center shadow-sm">
                  <span className="block text-xl font-bold text-stone-900">4+</span>
                  <span className="text-[11px] font-mono text-stone-500">Years Experience</span>
                </div>
                <div className="p-3 rounded-2xl bg-white/85 border border-stone-200/70 text-center shadow-sm">
                  <span className="block text-xl font-bold text-amber-800">35+</span>
                  <span className="text-[11px] font-mono text-stone-500">Projects Shipped</span>
                </div>
                <div className="p-3 rounded-2xl bg-white/85 border border-stone-200/70 text-center shadow-sm">
                  <span className="block text-xl font-bold text-stone-900">100%</span>
                  <span className="text-[11px] font-mono text-stone-500">Client Satisfaction</span>
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
              <div className="flex items-center gap-2 mb-2 text-amber-900 text-xs font-mono font-semibold">
                <Palette className="w-4 h-4" />
                <span>DESIGN SYSTEMS &amp; ARCHITECTURE</span>
              </div>

              <h2 className="text-xl sm:text-2xl font-extrabold uppercase text-stone-950 mb-3 leading-tight">
                Clean code meets intuitive UI.
                <span className="block text-amber-900 font-serif lowercase italic text-2xl">
                  Built for performance, clarity and scale.
                </span>
              </h2>

              <p className="text-xs sm:text-sm text-stone-800 leading-relaxed mb-5">
                Every interface is crafted with pixel precision in Figma, engineered with modern component architectures, and optimized for sub-second load times across mobile and desktop devices.
              </p>

              {/* Interactive Typography Playground Fragment */}
              <div className="p-4 rounded-2xl bg-white/95 border border-stone-200 shadow-sm mb-4">
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
                    <div className="font-serif italic text-lg sm:text-xl text-stone-900 leading-snug">
                      &ldquo;Form follows purpose. Crafting memorable, high-converting digital products.&rdquo;
                    </div>
                  )}
                  {activeTypographyStyle === "brutalist" && (
                    <div className="font-mono text-sm sm:text-base font-bold text-stone-950 tracking-tighter uppercase leading-tight">
                      [FAST_EXECUTION :: FULL_STACK_AGILITY // SCALABLE_SYSTEMS]
                    </div>
                  )}
                  {activeTypographyStyle === "modern" && (
                    <div className="font-sans font-extrabold text-base sm:text-lg text-stone-900 tracking-tight leading-snug">
                      Responsive multi-device interfaces with zero layout shifts and seamless animations.
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {["Responsive Web Design", "Figma Design Systems", "API Architecture", "SEO Optimization"].map(
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
                <span>FULL-STACK TECH STACK</span>
              </div>

              <h2 className="text-xl sm:text-2xl font-extrabold uppercase text-stone-950 mb-3 leading-tight">
                Modern full-stack engines.
                <span className="block text-amber-900 font-serif lowercase italic text-2xl">
                  React, Node.js, Laravel &amp; Flutter.
                </span>
              </h2>

              <p className="text-xs sm:text-sm text-stone-800 leading-relaxed mb-5">
                From high-concurrency Node.js and Laravel backends to fluid React frontends and cross-platform Flutter apps. End-to-end integration with payment gateways, automated booking engines, and security monitoring.
              </p>

              {/* Live Architecture Matrix */}
              <div className="grid grid-cols-2 gap-3 mb-5">
                <div className="p-3.5 rounded-2xl bg-white/95 border border-stone-200 shadow-sm flex flex-col gap-1">
                  <span className="text-[11px] font-mono text-stone-500">FRONT-END &amp; MOBILE</span>
                  <span className="text-xs font-bold text-stone-900">React, Next.js, Flutter</span>
                  <span className="text-[10px] text-stone-600">TypeScript, Flutter Flow, Tailwind CSS</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-white/95 border border-stone-200 shadow-sm flex flex-col gap-1">
                  <span className="text-[11px] font-mono text-stone-500">BACK-END &amp; CMS</span>
                  <span className="text-xs font-bold text-stone-900">Node.js, Laravel, WordPress</span>
                  <span className="text-[10px] text-stone-600">REST APIs, Shopify, Joomla, MySQL</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-white/95 border border-stone-200 shadow-sm flex flex-col gap-1">
                  <span className="text-[11px] font-mono text-stone-500">SECURITY &amp; DEVOPS</span>
                  <span className="text-xs font-bold text-stone-900">Threat Detection, CI/CD</span>
                  <span className="text-[10px] text-stone-600">Malware &amp; Phishing defense, Cloud deploy</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-white/95 border border-stone-200 shadow-sm flex flex-col gap-1">
                  <span className="text-[11px] font-mono text-stone-500">PRODUCTIVITY &amp; TOOLS</span>
                  <span className="text-xs font-bold text-emerald-800">Figma, VS Code, Git</span>
                  <span className="text-[10px] text-stone-600">Photoshop, Project Scheduling, SEO</span>
                </div>
              </div>

              {/* Terminal Code Snippet */}
              <div className="glass-dark p-4 rounded-2xl font-mono text-xs shadow-inner">
                <div className="flex items-center gap-1.5 text-stone-400 text-[11px] pb-2 border-b border-stone-700/80 mb-2">
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
            className="absolute left-4 lg:left-6 right-4 lg:right-[44%] max-w-xl pointer-events-auto transition-all duration-300"
            style={{ top: "2880px" }}
          >
            <div className="glass-card p-6 sm:p-8 rounded-3xl border border-white/70 shadow-2xl backdrop-blur-xl bg-white/85">
              <div className="flex items-center gap-2 mb-2 text-stone-700 text-xs font-mono font-semibold">
                <Briefcase className="w-4 h-4 text-amber-700" />
                <span>FLAGSHIP DELIVERABLES &amp; APPS</span>
              </div>

              <h2 className="text-xl sm:text-2xl font-extrabold uppercase text-stone-950 mb-3 leading-tight">
                Delivered across industries.
                <span className="block text-amber-900 font-serif lowercase italic text-2xl">
                  Agency platforms, apps &amp; cyber systems.
                </span>
              </h2>

              <p className="text-xs sm:text-sm text-stone-800 leading-relaxed mb-5">
                Demonstrated success in launching complex booking platforms, responsive agency portals, e-commerce storefronts, and research thesis cybersecurity platforms.
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
            className="absolute left-4 lg:left-[44%] right-4 lg:right-6 max-w-xl pointer-events-auto transition-all duration-300"
            style={{ top: "3720px" }}
          >
            <div className="glass-card p-6 sm:p-8 rounded-3xl border border-white/70 shadow-2xl backdrop-blur-xl bg-white/85">
              <div className="flex items-center gap-2 mb-2 text-stone-800 text-xs font-mono font-semibold">
                <Sliders className="w-4 h-4 text-amber-700" />
                <span>LEADERSHIP &amp; SPRINT DISCIPLINE</span>
              </div>

              <h2 className="text-xl sm:text-2xl font-extrabold uppercase text-stone-950 mb-3 leading-tight">
                From technical scoping
                <span className="block text-amber-900 font-serif lowercase italic text-2xl">
                  to secure, on-time launch.
                </span>
              </h2>

              <p className="text-xs sm:text-sm text-stone-800 leading-relaxed mb-5">
                Experienced as a Technical Team Lead managing developer task allocation, code reviews, backend integrations, and stakeholder alignment under tight deadlines.
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
                      <p className="text-[11px] text-stone-700 leading-relaxed mb-1.5">
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
