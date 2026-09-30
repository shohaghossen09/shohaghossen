"use client";

import React, { useEffect, useRef, useState } from "react";

interface CharacterStageProps {
  scrollProgress: number; // 0.0 to 1.0
  onTimeUpdate?: (currentTime: number, duration: number) => void;
  reducedMotion?: boolean;
}

export const CharacterStage: React.FC<CharacterStageProps> = ({
  scrollProgress,
  onTimeUpdate,
  reducedMotion = false,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const targetTimeRef = useRef<number>(0);
  const currentTimeRef = useRef<number>(0);
  const durationRef = useRef<number>(16.0);
  const rafIdRef = useRef<number | null>(null);
  const [isVideoReady, setIsVideoReady] = useState(false);

  // Sync scrollProgress to targetTime with high precision
  useEffect(() => {
    if (reducedMotion) return;
    const duration = durationRef.current || 16.0;
    targetTimeRef.current = Math.max(
      0.01,
      Math.min(scrollProgress * (duration - 0.04), duration - 0.04)
    );
  }, [scrollProgress, reducedMotion]);

  // Video setup and 480 FPS RAF interpolation loop
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.pause();
    video.currentTime = 0.01;

    const handleLoadedMetadata = () => {
      if (video.duration && !isNaN(video.duration)) {
        durationRef.current = video.duration;
      }
      setIsVideoReady(true);
      onTimeUpdate?.(0, durationRef.current);
    };

    const handleCanPlay = () => {
      video.pause();
      setIsVideoReady(true);
    };

    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    video.addEventListener("canplay", handleCanPlay);

    let lastReportedTime = -1;

    // 480 FPS Sub-frame RAF loop
    const updateVideoFrame = () => {
      if (video && !reducedMotion) {
        const target = targetTimeRef.current;
        const current = currentTimeRef.current;
        const delta = target - current;

        // Ultra-responsive 480 FPS interpolation
        const factor = Math.abs(delta) > 0.4 ? 0.38 : 0.26;
        currentTimeRef.current += delta * factor;

        // Sub-millisecond seek threshold (0.002s precision)
        if (Math.abs(video.currentTime - currentTimeRef.current) > 0.002) {
          video.currentTime = currentTimeRef.current;
        }

        if (Math.abs(currentTimeRef.current - lastReportedTime) > 0.04) {
          lastReportedTime = currentTimeRef.current;
          onTimeUpdate?.(currentTimeRef.current, durationRef.current);
        }
      }

      rafIdRef.current = requestAnimationFrame(updateVideoFrame);
    };

    rafIdRef.current = requestAnimationFrame(updateVideoFrame);

    return () => {
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("canplay", handleCanPlay);
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [onTimeUpdate, reducedMotion]);

  // Ambient floating dust particles
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

    const particleCount = 20;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.8 + 0.6,
      speedY: Math.random() * 0.2 + 0.06,
      speedX: (Math.random() - 0.5) * 0.12,
      alpha: Math.random() * 0.3 + 0.1,
    }));

    let animId: number;
    const renderParticles = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.y -= p.speedY;
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

  return (
    <div
      className="fixed inset-0 w-screen h-screen overflow-hidden pointer-events-none select-none z-0"
      style={{
        background:
          "radial-gradient(ellipse at 50% 45%, #b8aca0 0%, #aa9e92 50%, #998e83 100%)",
      }}
      aria-hidden="true"
    >
      {/* Primary Scroll-Driven Character Video:
          - object-cover & object-center fills 100% of the screen seamlessly with zero letterboxing or borders
          - No masks or dark vignettes to eliminate all side/bottom border lines
      */}
      <div className="absolute inset-0 w-full h-full flex items-center justify-center overflow-hidden">
        <video
          ref={videoRef}
          src="/character-story.mp4"
          playsInline
          muted
          autoPlay={false}
          preload="auto"
          className="w-full h-full object-cover object-center transition-opacity duration-500 select-none"
          style={{
            opacity: isVideoReady ? 1 : 0.6,
            transform: "translate3d(0, 0, 0)",
            willChange: "contents",
          }}
        />
      </div>

      {/* Floating Ambient Atmosphere Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none opacity-30"
      />

      {/* Very subtle editorial film grain */}
      <div className="absolute inset-0 w-full h-full film-grain pointer-events-none opacity-40" />
    </div>
  );
};
