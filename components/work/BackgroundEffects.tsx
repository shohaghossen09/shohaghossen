"use client";

import React, { useEffect, useRef } from "react";

export const BackgroundEffects: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY, active: true };
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    const particleCount = prefersReducedMotion ? 16 : 42;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      baseSize: Math.random() * 2 + 1,
      size: Math.random() * 2 + 1,
      speedX: (Math.random() - 0.5) * 0.45,
      speedY: (Math.random() - 0.5) * 0.45,
      opacity: Math.random() * 0.45 + 0.15,
      color: Math.random() > 0.4 ? "255, 255, 255" : "217, 119, 6",
    }));

    let animationFrameId: number;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        if (!prefersReducedMotion) {
          // Normal ambient drift
          p.x += p.speedX;
          p.y += p.speedY;

          // Mouse deflection
          if (mouseRef.current.active) {
            const dx = p.x - mouseRef.current.x;
            const dy = p.y - mouseRef.current.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 120 && dist > 0) {
              const force = (120 - dist) / 120;
              p.x += (dx / dist) * force * 2.2;
              p.y += (dy / dist) * force * 2.2;
            }
          }

          if (p.x < -10) p.x = width + 10;
          if (p.x > width + 10) p.x = -10;
          if (p.y < -10) p.y = height + 10;
          if (p.y > height + 10) p.y = -10;
        }

        ctx.fillStyle = `rgba(${p.color}, ${p.opacity})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      {/* CSS Animations for Ambient Clouds & Glowing Orbs */}
      <style jsx global>{`
        @keyframes driftCloud1 {
          0% { transform: translateX(-15%) translateY(0); }
          50% { transform: translateX(10%) translateY(-20px); }
          100% { transform: translateX(-15%) translateY(0); }
        }
        @keyframes driftCloud2 {
          0% { transform: translateX(10%) translateY(0); }
          50% { transform: translateX(-12%) translateY(25px); }
          100% { transform: translateX(10%) translateY(0); }
        }
        @keyframes pulseGlowSlow {
          0%, 100% { opacity: 0.25; transform: scale(1); }
          50% { opacity: 0.45; transform: scale(1.08); }
        }
        .anim-cloud-drift-1 {
          animation: driftCloud1 32s ease-in-out infinite;
        }
        .anim-cloud-drift-2 {
          animation: driftCloud2 40s ease-in-out infinite;
        }
        .anim-pulse-glow {
          animation: pulseGlowSlow 12s ease-in-out infinite;
        }
      `}</style>

      {/* Floating Canvas Dust Particles with Mouse Deflection */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed inset-0 z-0 opacity-60"
        aria-hidden="true"
      />

      {/* Subtle Warm Gradient Lighting Orbs */}
      <div
        className="pointer-events-none fixed -top-32 left-1/3 w-[650px] h-[650px] rounded-full blur-[140px] anim-pulse-glow"
        style={{
          background:
            "radial-gradient(circle, rgba(254, 243, 199, 0.45) 0%, rgba(245, 158, 11, 0.18) 45%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div
        className="pointer-events-none fixed bottom-10 right-1/4 w-[600px] h-[600px] rounded-full blur-[150px] anim-pulse-glow"
        style={{
          animationDelay: "-6s",
          background:
            "radial-gradient(circle, rgba(253, 230, 138, 0.35) 0%, rgba(217, 119, 6, 0.12) 45%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* Soft Ambient Vector Clouds drifting behind content */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden opacity-30 z-0" aria-hidden="true">
        <svg
          viewBox="0 0 1440 900"
          className="w-full h-full object-cover anim-cloud-drift-1"
          fill="none"
        >
          <path
            d="M 100 240 Q 160 170 240 190 Q 320 150 400 200 Q 480 180 520 250 Q 540 310 460 340 Q 360 360 260 340 Q 140 350 90 300 Q 70 260 100 240 Z"
            fill="#ffffff"
            filter="blur(30px)"
          />
        </svg>

        <svg
          viewBox="0 0 1440 900"
          className="w-full h-full object-cover anim-cloud-drift-2"
          fill="none"
        >
          <path
            d="M 850 480 Q 920 410 1020 430 Q 1120 380 1220 440 Q 1310 410 1370 490 Q 1390 570 1280 610 Q 1160 630 1040 610 Q 900 620 840 560 Q 820 510 850 480 Z"
            fill="#ffffff"
            filter="blur(36px)"
          />
        </svg>
      </div>
    </>
  );
};
