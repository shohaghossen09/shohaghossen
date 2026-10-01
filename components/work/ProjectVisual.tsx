"use client";

import React from "react";

interface ProjectVisualProps {
  projectId: string;
  color: string;
  title: string;
  isLarge?: boolean;
}

export const ProjectVisual: React.FC<ProjectVisualProps> = ({
  projectId,
  color,
  title,
  isLarge = false,
}) => {
  const height = isLarge ? "h-64 sm:h-80 md:h-96" : "h-48 sm:h-56";

  return (
    <div
      className={`relative w-full ${height} overflow-hidden rounded-2xl bg-stone-950/90 border border-stone-800/80 flex items-center justify-center select-none group-hover:border-amber-500/50 transition-colors shadow-inner`}
    >
      {/* CSS Keyframe Animations for Living Previews */}
      <style jsx>{`
        @keyframes radarSweep {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes dashFlow {
          to { stroke-dashoffset: -32; }
        }
        @keyframes pulseGlow {
          0%, 100% { opacity: 0.35; transform: scale(1); }
          50% { opacity: 0.75; transform: scale(1.1); }
        }
        @keyframes floatBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        @keyframes waveOscillate {
          0%, 100% { transform: scaleY(1); }
          50% { transform: scaleY(0.4); }
        }
        .anim-radar {
          transform-origin: 200px 120px;
          animation: radarSweep 4s linear infinite;
        }
        .anim-dash {
          stroke-dasharray: 4 4;
          animation: dashFlow 1.4s linear infinite;
        }
        .anim-pulse {
          animation: pulseGlow 2.4s ease-in-out infinite;
        }
        .anim-float {
          animation: floatBounce 3s ease-in-out infinite;
        }
      `}</style>

      {/* Dynamic Background Glow matching Project Brand Color */}
      <div
        className="absolute inset-0 opacity-25 group-hover:opacity-40 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${color} 0%, transparent 70%)`,
        }}
      />

      {/* Glass Specular Reflection Highlight */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/15 pointer-events-none z-10" />

      {/* Subtle Grid Backdrop */}
      <div
        className="absolute inset-0 opacity-15"
        style={{
          backgroundImage:
            "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* ============================================================== */}
      {/* 1. CYBER DEFENDER AI (cyberadvanced.vercel.app)                 */}
      {/* ============================================================== */}
      {projectId === "cyberadvanced" && (
        <svg
          viewBox="0 0 400 240"
          className="w-full h-full object-contain p-3 sm:p-4 transition-transform duration-700 group-hover:scale-105"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* SOC Frame */}
          <rect x="30" y="20" width="340" height="200" rx="10" fill="#0b0f19" stroke="#312e81" strokeWidth="1" />
          
          {/* Header */}
          <rect x="30" y="20" width="340" height="28" rx="10" fill="#111827" />
          <circle cx="48" cy="34" r="3" fill="#ef4444" />
          <circle cx="58" cy="34" r="3" fill="#f59e0b" />
          <circle cx="68" cy="34" r="3" fill="#10b981" />
          <text x="88" y="38" fill="#818cf8" fontSize="9" fontFamily="monospace" fontWeight="bold">CYBER DEFENDER // SOC COMMAND</text>
          <rect x="290" y="27" width="65" height="14" rx="4" fill="#312e81" />
          <text x="298" y="37" fill="#c7d2fe" fontSize="7" fontFamily="monospace">99.8% ACC</text>

          {/* MITRE ATT&CK Matrix Grid & Threat Graph */}
          <g transform="translate(45, 60)">
            <rect width="180" height="95" rx="6" fill="#111827" stroke="#1f2937" strokeWidth="0.8" />
            <text x="10" y="16" fill="#9ca3af" fontSize="8" fontFamily="monospace">ATT&amp;CK MATRIX</text>
            
            {/* Threat Nodes */}
            <circle cx="35" cy="50" r="14" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1" />
            <text x="35" y="53" textAnchor="middle" fill="#c7d2fe" fontSize="7" fontFamily="monospace">INITIAL</text>

            <line x1="50" y1="50" x2="85" y2="50" stroke="#6366f1" strokeWidth="1.5" className="anim-dash" />
            
            <circle cx="100" cy="50" r="15" fill="#31102f" stroke="#f43f5e" strokeWidth="1.5" className="anim-pulse" />
            <text x="100" y="53" textAnchor="middle" fill="#fecdd3" fontSize="7" fontFamily="monospace">EXPLOIT</text>

            <line x1="115" y1="50" x2="145" y2="50" stroke="#6366f1" strokeWidth="1.5" className="anim-dash" />

            <circle cx="155" cy="50" r="12" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1" />
            <text x="155" y="53" textAnchor="middle" fill="#c7d2fe" fontSize="6" fontFamily="monospace">EXFIL</text>

            <text x="10" y="85" fill="#34d399" fontSize="7" fontFamily="monospace">● IDS: 14 MONITORS ONLINE</text>
          </g>

          {/* Right Panel: Radar Scan & Threat Dial */}
          <g transform="translate(235, 60)">
            <rect width="120" height="95" rx="6" fill="#111827" stroke="#1f2937" strokeWidth="0.8" />
            <circle cx="60" cy="45" r="30" stroke="#312e81" strokeWidth="0.8" fill="none" />
            <circle cx="60" cy="45" r="20" stroke="#4338ca" strokeWidth="0.8" fill="none" />
            <circle cx="60" cy="45" r="10" stroke="#6366f1" strokeWidth="0.8" fill="none" />
            <line x1="60" y1="15" x2="60" y2="75" stroke="#312e81" strokeWidth="0.5" />
            <line x1="30" y1="45" x2="90" y2="45" stroke="#312e81" strokeWidth="0.5" />
            {/* Blip */}
            <circle cx="72" cy="38" r="2.5" fill="#ef4444" className="animate-ping" />
            <text x="25" y="88" fill="#f87171" fontSize="7" fontFamily="monospace">MALWARE DETECTED</text>
          </g>

          {/* Bottom Feed Bar */}
          <rect x="45" y="165" width="310" height="42" rx="6" fill="#0f172a" />
          <text x="55" y="182" fill="#e2e8f0" fontSize="8" fontWeight="bold">PHISHING DETECT: 0 ALERT</text>
          <text x="55" y="196" fill="#94a3b8" fontSize="7" fontFamily="monospace">Status: SAFE (Score 10/10) • Real-time protection active</text>
          <rect x="290" y="173" width="55" height="18" rx="4" fill="#059669" />
          <text x="300" y="185" fill="#ffffff" fontSize="7" fontWeight="bold">SECURE</text>
        </svg>
      )}

      {/* ============================================================== */}
      {/* 2. KINETIC CREATIVE STUDIO (kinket.vercel.app)                   */}
      {/* ============================================================== */}
      {projectId === "kinket" && (
        <svg
          viewBox="0 0 400 240"
          className="w-full h-full object-contain p-3 sm:p-4 transition-transform duration-700 group-hover:scale-105"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Studio Canvas Frame */}
          <rect x="30" y="20" width="340" height="200" rx="10" fill="#0d0d11" stroke="#f43f5e" strokeWidth="0.8" strokeOpacity="0.4" />
          
          {/* Studio Header Typography */}
          <text x="50" y="55" fill="#fda4af" fontSize="9" fontFamily="monospace" letterSpacing="2">EST. 2016 // LISBON • TOKYO • NY</text>
          
          {/* Bold Kinetic Wordmark */}
          <text x="50" y="90" fill="#ffffff" fontSize="22" fontWeight="900" fontFamily="sans-serif" letterSpacing="-1">
            WE CREATE
          </text>
          <text x="50" y="118" fill="#f43f5e" fontSize="22" fontWeight="900" fontStyle="italic" fontFamily="serif" letterSpacing="0">
            digital experiences
          </text>
          <text x="50" y="146" fill="#ffffff" fontSize="22" fontWeight="900" fontFamily="sans-serif" letterSpacing="-1">
            THAT MOVE.
          </text>

          {/* 3D Kinetic Wireframe Monolith */}
          <g transform="translate(265, 80)" className="anim-float">
            <polygon points="40,0 80,25 40,80 0,55" fill="#f43f5e" fillOpacity="0.25" stroke="#f43f5e" strokeWidth="1.2" />
            <polygon points="80,25 80,75 40,115 40,80" fill="#be123c" fillOpacity="0.35" stroke="#f43f5e" strokeWidth="1.2" />
            <polygon points="0,55 40,80 40,115 0,85" fill="#e11d48" fillOpacity="0.2" stroke="#f43f5e" strokeWidth="1.2" />
          </g>

          {/* Capability Pills Row */}
          <g transform="translate(50, 180)">
            <rect x="0" y="0" width="55" height="18" rx="9" fill="#1f1f2e" stroke="#373752" strokeWidth="0.8" />
            <text x="13" y="12" fill="#fda4af" fontSize="7" fontFamily="monospace">01 WEB</text>

            <rect x="62" y="0" width="58" height="18" rx="9" fill="#1f1f2e" stroke="#373752" strokeWidth="0.8" />
            <text x="73" y="12" fill="#fda4af" fontSize="7" fontFamily="monospace">02 APPS</text>

            <rect x="127" y="0" width="50" height="18" rx="9" fill="#1f1f2e" stroke="#373752" strokeWidth="0.8" />
            <text x="140" y="12" fill="#fda4af" fontSize="7" fontFamily="monospace">03 AI</text>

            <rect x="184" y="0" width="58" height="18" rx="9" fill="#1f1f2e" stroke="#373752" strokeWidth="0.8" />
            <text x="195" y="12" fill="#fda4af" fontSize="7" fontFamily="monospace">04 SAAS</text>

            <rect x="250" y="0" width="65" height="18" rx="9" fill="#f43f5e" />
            <text x="258" y="12" fill="#ffffff" fontSize="7" fontWeight="bold" fontFamily="monospace">PRODUCTS</text>
          </g>
        </svg>
      )}

      {/* ============================================================== */}
      {/* 3. VOYARION TRAVEL MARKETPLACE (voyarion.vercel.app)            */}
      {/* ============================================================== */}
      {projectId === "voyarion" && (
        <svg
          viewBox="0 0 400 240"
          className="w-full h-full object-contain p-3 sm:p-4 transition-transform duration-700 group-hover:scale-105"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Marketplace Frame */}
          <rect x="30" y="20" width="340" height="200" rx="10" fill="#081426" stroke="#0369a1" strokeWidth="1" />
          
          {/* Brand & Stats Header */}
          <text x="50" y="46" fill="#38bdf8" fontSize="13" fontWeight="bold">Voyarion</text>
          <text x="110" y="46" fill="#94a3b8" fontSize="8" fontFamily="monospace">• Stay &amp; Ride Marketplace</text>
          <rect x="255" y="32" width="100" height="18" rx="4" fill="#0c4a6e" />
          <text x="263" y="44" fill="#7dd3fc" fontSize="7" fontFamily="monospace">1,800+ PARTNERS</text>

          {/* Search Inputs Bar */}
          <rect x="50" y="60" width="300" height="32" rx="8" fill="#0f172a" stroke="#1e293b" strokeWidth="0.8" />
          <text x="65" y="79" fill="#e2e8f0" fontSize="8" fontWeight="bold">PARIS, FRANCE</text>
          <text x="155" y="79" fill="#94a3b8" fontSize="8">OCT 12 - 19</text>
          <text x="235" y="79" fill="#94a3b8" fontSize="8">2 GUESTS</text>
          <rect x="295" y="65" width="48" height="22" rx="6" fill="#0284c7" />
          <text x="305" y="79" fill="#ffffff" fontSize="7" fontWeight="bold">SEARCH</text>

          {/* Dual Product Cards: 1 Hotel + 1 Rental Car */}
          {/* Hotel Card */}
          <g transform="translate(50, 105)">
            <rect width="142" height="98" rx="8" fill="#0c1b30" stroke="#0284c7" strokeWidth="0.8" />
            <rect x="8" y="8" width="126" height="42" rx="5" fill="#1e293b" />
            {/* Hotel Graphic */}
            <rect x="18" y="16" width="35" height="28" rx="3" fill="#0284c7" fillOpacity="0.4" />
            <text x="22" y="34" fill="#38bdf8" fontSize="9">🏨</text>
            <text x="60" y="24" fill="#f8fafc" fontSize="8" fontWeight="bold">Grand Palace Suite</text>
            <text x="60" y="36" fill="#fbbf24" fontSize="7">★★★★★ 4.9</text>
            <text x="8" y="65" fill="#94a3b8" fontSize="7">Central Paris • Verified</text>
            <text x="8" y="82" fill="#38bdf8" fontSize="10" fontWeight="bold">$320<span className="text-[7px] text-stone-400 font-normal">/night</span></text>
            <rect x="90" y="70" width="44" height="18" rx="4" fill="#0284c7" />
            <text x="96" y="82" fill="#ffffff" fontSize="7" fontWeight="bold">BOOK</text>
          </g>

          {/* Car Card */}
          <g transform="translate(208, 105)">
            <rect width="142" height="98" rx="8" fill="#0c1b30" stroke="#0369a1" strokeWidth="0.8" />
            <rect x="8" y="8" width="126" height="42" rx="5" fill="#1e293b" />
            <rect x="18" y="16" width="35" height="28" rx="3" fill="#0284c7" fillOpacity="0.4" />
            <text x="22" y="34" fill="#38bdf8" fontSize="9">🏎️</text>
            <text x="60" y="24" fill="#f8fafc" fontSize="8" fontWeight="bold">Porsche Taycan EV</text>
            <text x="60" y="36" fill="#fbbf24" fontSize="7">★★★★★ 5.0</text>
            <text x="8" y="65" fill="#94a3b8" fontSize="7">Unlimited Miles • GPS</text>
            <text x="8" y="82" fill="#38bdf8" fontSize="10" fontWeight="bold">$185<span className="text-[7px] text-stone-400 font-normal">/day</span></text>
            <rect x="90" y="70" width="44" height="18" rx="4" fill="#0284c7" />
            <text x="96" y="82" fill="#ffffff" fontSize="7" fontWeight="bold">RENT</text>
          </g>
        </svg>
      )}

      {/* ============================================================== */}
      {/* 4. KDSPORTLYTE (kdsportlyte.vercel.app)                         */}
      {/* ============================================================== */}
      {projectId === "kdsportlyte" && (
        <svg
          viewBox="0 0 400 240"
          className="w-full h-full object-contain p-3 sm:p-4 transition-transform duration-700 group-hover:scale-105"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* E-Commerce Storefront Canvas */}
          <rect x="30" y="20" width="340" height="200" rx="10" fill="#161208" stroke="#f59e0b" strokeWidth="1" />
          
          {/* Fun Lightning Brand Header */}
          <text x="50" y="48" fill="#fbbf24" fontSize="15" fontWeight="bold" fontFamily="sans-serif">⚡ KDSportLyte</text>
          <text x="175" y="46" fill="#fde68a" fontSize="8" fontFamily="monospace">BOLD ELECTROLYTES</text>

          {/* Floating Flavor Emojis */}
          <g className="anim-float">
            <text x="50" y="80" fontSize="14">🍋</text>
            <text x="90" y="70" fontSize="12">🍓</text>
            <text x="130" y="85" fontSize="13">🍊</text>
            <text x="210" y="75" fontSize="14">⚡</text>
          </g>

          {/* Product Can / Drink Pack Illustration */}
          <g transform="translate(60, 95)">
            <rect x="0" y="0" width="65" height="105" rx="12" fill="#f59e0b" stroke="#fde047" strokeWidth="1.5" />
            <text x="14" y="32" fill="#000000" fontSize="10" fontWeight="bold">BOLT</text>
            <text x="12" y="44" fill="#78350f" fontSize="7" fontWeight="bold">HYDRATE</text>
            <circle cx="32" cy="65" r="16" fill="#ffffff" fillOpacity="0.3" />
            <text x="24" y="72" fontSize="14">⚡</text>
            <text x="15" y="95" fill="#000000" fontSize="6" fontWeight="bold">ZERO SUGAR</text>
          </g>

          {/* Slide-out Interactive Cart Drawer Mockup */}
          <g transform="translate(150, 90)">
            <rect width="195" height="110" rx="8" fill="#241b0d" stroke="#f59e0b" strokeWidth="0.8" />
            <text x="12" y="20" fill="#fde68a" fontSize="8" fontWeight="bold">YOUR CART 🛒</text>
            
            {/* Item 1 */}
            <rect x="12" y="30" width="170" height="28" rx="5" fill="#352611" />
            <text x="20" y="45" fill="#ffffff" fontSize="7" fontWeight="bold">Electric Berry 30-Pack</text>
            <text x="20" y="54" fill="#fbbf24" fontSize="7" fontFamily="monospace">Qty: 2 • $38.00</text>
            <circle cx="165" cy="44" r="7" fill="#f59e0b" />
            <text x="162" y="47" fill="#000000" fontSize="8" fontWeight="bold">✓</text>

            {/* Total and Checkout */}
            <text x="12" y="78" fill="#e2e8f0" fontSize="8" fontWeight="bold">TOTAL: $38.00</text>
            <rect x="12" y="85" width="170" height="18" rx="5" fill="#f59e0b" />
            <text x="55" y="97" fill="#000000" fontSize="8" fontWeight="bold">CHECKOUT NOW ⚡</text>
          </g>
        </svg>
      )}

      {/* ============================================================== */}
      {/* 5. CHANGERADAR (changeradarofficial.vercel.app)                 */}
      {/* ============================================================== */}
      {projectId === "changeradarofficial" && (
        <svg
          viewBox="0 0 400 240"
          className="w-full h-full object-contain p-3 sm:p-4 transition-transform duration-700 group-hover:scale-105"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Intelligence Canvas */}
          <rect x="30" y="20" width="340" height="200" rx="10" fill="#061811" stroke="#059669" strokeWidth="1" />
          
          {/* Radar Header */}
          <text x="50" y="46" fill="#34d399" fontSize="13" fontWeight="bold">ChangeRadar</text>
          <text x="150" y="46" fill="#a7f3d0" fontSize="8" fontFamily="monospace">CONTINUOUS INTELLIGENCE</text>
          <circle cx="340" cy="42" r="4" fill="#10b981" className="animate-ping" />

          {/* Sweeping Radar Scope */}
          <g transform="translate(50, 65)">
            <circle cx="60" cy="65" r="55" stroke="#065f46" strokeWidth="1.2" fill="#042217" />
            <circle cx="60" cy="65" r="40" stroke="#047857" strokeWidth="0.8" fill="none" />
            <circle cx="60" cy="65" r="22" stroke="#10b981" strokeWidth="0.8" fill="none" />
            <line x1="60" y1="10" x2="60" y2="120" stroke="#065f46" strokeWidth="0.5" />
            <line x1="5" y1="65" x2="115" y2="65" stroke="#065f46" strokeWidth="0.5" />
            
            {/* Blips */}
            <circle cx="45" cy="40" r="3" fill="#f59e0b" />
            <circle cx="85" cy="85" r="3.5" fill="#ef4444" className="animate-ping" />
            <circle cx="80" cy="45" r="2.5" fill="#10b981" />
          </g>

          {/* Live Diff Feed Cards */}
          <g transform="translate(185, 65)">
            <rect width="165" height="40" rx="6" fill="#0b291e" stroke="#10b981" strokeWidth="0.8" />
            <text x="10" y="16" fill="#fbbf24" fontSize="7" fontWeight="bold">COMPETITOR A // PRICING DIFF</text>
            <text x="10" y="28" fill="#d1fae5" fontSize="7" fontFamily="monospace">Tier 2 raised by +18% (12m ago)</text>

            <rect y="48" width="165" height="40" rx="6" fill="#0b291e" stroke="#ef4444" strokeWidth="0.8" />
            <text x="10" y="64" fill="#f87171" fontSize="7" fontWeight="bold">API SCHEMA ALERT // V3 DEPRECATION</text>
            <text x="10" y="76" fill="#d1fae5" fontSize="7" fontFamily="monospace">Supplier webhook payload modified</text>

            <rect y="96" width="165" height="34" rx="6" fill="#042217" />
            <text x="10" y="112" fill="#34d399" fontSize="7" fontWeight="bold">● DISPATCHED TO SLACK &amp; TEAMS</text>
          </g>
        </svg>
      )}

      {/* ============================================================== */}
      {/* 6. SHOVELOP DIGITAL STUDIO (shovelop.vercel.app)               */}
      {/* ============================================================== */}
      {projectId === "shovelop" && (
        <svg
          viewBox="0 0 400 240"
          className="w-full h-full object-contain p-3 sm:p-4 transition-transform duration-700 group-hover:scale-105"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Monolithic Tech Studio Frame */}
          <rect x="30" y="20" width="340" height="200" rx="10" fill="#13100c" stroke="#d97706" strokeWidth="1" />
          
          {/* Brutalist Title */}
          <text x="50" y="55" fill="#ffffff" fontSize="18" fontWeight="900" fontFamily="sans-serif" letterSpacing="1">
            SHOVELOP
          </text>
          <text x="50" y="74" fill="#d97706" fontSize="9" fontWeight="bold" fontFamily="monospace">
            WE BUILD WHAT&apos;S NEXT.
          </text>

          {/* Interactive Systems Diagram */}
          <g transform="translate(50, 90)">
            {/* System 1: Web & SaaS */}
            <rect width="90" height="60" rx="6" fill="#241b11" stroke="#d97706" strokeWidth="1" />
            <text x="10" y="22" fill="#fde68a" fontSize="8" fontWeight="bold">01 WEB / SAAS</text>
            <text x="10" y="38" fill="#a8a29e" fontSize="7">Next.js 15 App Router</text>
            <text x="10" y="49" fill="#10b981" fontSize="7">● 100/100 LCP</text>

            {/* Connecting bus */}
            <line x1="90" y1="30" x2="120" y2="30" stroke="#d97706" strokeWidth="1.5" className="anim-dash" />

            {/* System 2: AI Agents */}
            <rect x="120" y="0" width="95" height="60" rx="6" fill="#241b11" stroke="#f59e0b" strokeWidth="1" className="anim-pulse" />
            <text x="130" y="22" fill="#fde68a" fontSize="8" fontWeight="bold">02 AI AGENTS</text>
            <text x="130" y="38" fill="#a8a29e" fontSize="7">Autonomous workflows</text>
            <text x="130" y="49" fill="#f59e0b" fontSize="7">● Multi-Tenant LLM</text>

            <line x1="215" y1="30" x2="245" y2="30" stroke="#d97706" strokeWidth="1.5" className="anim-dash" />

            {/* System 3: Cloud & Infra */}
            <rect x="245" y="0" width="55" height="60" rx="6" fill="#241b11" stroke="#d97706" strokeWidth="1" />
            <text x="252" y="22" fill="#fde68a" fontSize="8" fontWeight="bold">03 CLOUD</text>
            <text x="252" y="38" fill="#a8a29e" fontSize="7">Kubernetes</text>
            <text x="252" y="49" fill="#38bdf8" fontSize="7">● Edge API</text>
          </g>

          {/* Bottom Process Bar */}
          <rect x="50" y="165" width="300" height="35" rx="6" fill="#1f1811" />
          <text x="65" y="186" fill="#f59e0b" fontSize="8" fontFamily="monospace">01 Work  •  02 Services  •  03 AI  •  04 Solutions  •  05 Contact</text>
        </svg>
      )}

      {/* ============================================================== */}
      {/* 7. CYBER DEFEND SOC (cyberdefend.vercel.app)                     */}
      {/* ============================================================== */}
      {projectId === "cyberdefend" && (
        <svg
          viewBox="0 0 400 240"
          className="w-full h-full object-contain p-3 sm:p-4 transition-transform duration-700 group-hover:scale-105"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Defend Frame */}
          <rect x="30" y="20" width="340" height="200" rx="10" fill="#13080a" stroke="#ef4444" strokeWidth="1" />
          
          {/* Header */}
          <text x="50" y="48" fill="#f87171" fontSize="13" fontWeight="bold">CYBER DEFENDER // SOC OPERATIONS</text>
          <rect x="300" y="34" width="55" height="18" rx="4" fill="#991b1b" />
          <text x="308" y="46" fill="#ffffff" fontSize="7" fontWeight="bold">LIVE FEED</text>

          {/* Threat Level Arc Meter */}
          <g transform="translate(50, 65)">
            <rect width="130" height="95" rx="8" fill="#200d11" stroke="#7f1d1d" strokeWidth="0.8" />
            <text x="12" y="20" fill="#fca5a5" fontSize="8" fontWeight="bold">THREAT LEVEL</text>
            <text x="35" y="65" fill="#ef4444" fontSize="32" fontWeight="bold" fontFamily="monospace">10<span className="text-xs text-stone-400">/10</span></text>
            <text x="12" y="85" fill="#34d399" fontSize="7" fontFamily="monospace">STATUS: SHIELD ACTIVE</text>
          </g>

          {/* Intrusion Telemetry Table */}
          <g transform="translate(190, 65)">
            <rect width="160" height="95" rx="8" fill="#200d11" stroke="#7f1d1d" strokeWidth="0.8" />
            <text x="12" y="20" fill="#fca5a5" fontSize="8" fontWeight="bold">IDS TELEMETRY STREAM</text>
            
            <text x="12" y="38" fill="#d1d5db" fontSize="7" fontFamily="monospace">Node 01: 192.168.1.104 [OK]</text>
            <text x="12" y="52" fill="#ef4444" fontSize="7" fontFamily="monospace">Node 04: PORT SCAN BLOCKED</text>
            <text x="12" y="66" fill="#f59e0b" fontSize="7" fontFamily="monospace">Node 09: SYN FLOOD MITIGATED</text>
            <text x="12" y="80" fill="#34d399" fontSize="7" fontFamily="monospace">Node 14: ENCRYPTION VERIFIED</text>
          </g>

          {/* Action Row */}
          <rect x="50" y="170" width="300" height="35" rx="6" fill="#260f14" />
          <text x="65" y="191" fill="#fca5a5" fontSize="8" fontWeight="bold">MALWARE SCANNER: 0 ACTIVE THREATS • 14 MONITORS SECURED</text>
        </svg>
      )}

      {/* ============================================================== */}
      {/* 8. THREAT DEFENDER ML (threatdefender.vercel.app)               */}
      {/* ============================================================== */}
      {projectId === "threatdefender" && (
        <svg
          viewBox="0 0 400 240"
          className="w-full h-full object-contain p-3 sm:p-4 transition-transform duration-700 group-hover:scale-105"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* ML Security Platform Frame */}
          <rect x="30" y="20" width="340" height="200" rx="10" fill="#0f0c1a" stroke="#8b5cf6" strokeWidth="1" />
          
          {/* Header */}
          <text x="50" y="46" fill="#c084fc" fontSize="13" fontWeight="bold">THREAT DEFENDER</text>
          <text x="180" y="46" fill="#ddd6fe" fontSize="8" fontFamily="monospace">XGBOOST ML ENGINE</text>

          {/* ROC-AUC Curve & Decision Tree Graph */}
          <g transform="translate(50, 65)">
            <rect width="145" height="95" rx="8" fill="#181329" stroke="#5b21b6" strokeWidth="0.8" />
            <text x="12" y="18" fill="#c4b5fd" fontSize="8" fontWeight="bold">ROC-AUC CURVE: 0.994</text>
            
            {/* Chart Axes */}
            <line x1="20" y1="80" x2="130" y2="80" stroke="#4c1d95" strokeWidth="1" />
            <line x1="20" y1="30" x2="20" y2="80" stroke="#4c1d95" strokeWidth="1" />
            
            {/* High Performance Curve */}
            <path
              d="M 20 80 Q 25 35 130 32"
              stroke="#8b5cf6"
              strokeWidth="2.5"
              fill="none"
            />
            <text x="25" y="90" fill="#a78bfa" fontSize="7" fontFamily="monospace">FALSE POSITIVE &lt; 0.2%</text>
          </g>

          {/* Model Inference Card */}
          <g transform="translate(205, 65)">
            <rect width="145" height="95" rx="8" fill="#181329" stroke="#5b21b6" strokeWidth="0.8" />
            <text x="12" y="18" fill="#c4b5fd" fontSize="8" fontWeight="bold">INFERENCE LATENCY</text>
            <text x="12" y="42" fill="#a78bfa" fontSize="20" fontWeight="bold" fontFamily="monospace">14.2ms</text>
            <text x="12" y="60" fill="#9ca3af" fontSize="7">Vector: 500,000+ Samples</text>
            <rect x="12" y="70" width="120" height="15" rx="4" fill="#8b5cf6" />
            <text x="22" y="81" fill="#ffffff" fontSize="7" fontWeight="bold">PREDICTION VERIFIED</text>
          </g>

          {/* Bottom Feed */}
          <rect x="50" y="170" width="300" height="35" rx="6" fill="#1e1833" />
          <text x="65" y="191" fill="#e9d5ff" fontSize="8" fontFamily="monospace">● CLASSIFIER READY: Phishing URLs • Malware Hashes • Intrusion Spikes</text>
        </svg>
      )}

      {/* ============================================================== */}
      {/* 9. SHOHAG HOSSEN FLAGSHIP (shohaghossenportfolio.vercel.app)    */}
      {/* ============================================================== */}
      {projectId === "shohaghossen" && (
        <svg
          viewBox="0 0 400 240"
          className="w-full h-full object-contain p-3 sm:p-4 transition-transform duration-700 group-hover:scale-105"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Flagship Portfolio Canvas */}
          <rect x="30" y="20" width="340" height="200" rx="10" fill="#17140e" stroke="#eab308" strokeWidth="1" />
          
          {/* Swiss Editorial Header */}
          <text x="50" y="52" fill="#fde047" fontSize="16" fontWeight="bold">SHOHAG HOSSEN</text>
          <text x="210" y="50" fill="#ca8a04" fontSize="8" fontFamily="monospace">FULL-STACK &amp; UI/UX</text>

          {/* Editorial Monograph Layout */}
          <g transform="translate(50, 70)">
            {/* Left Column: Big Headline */}
            <text x="0" y="25" fill="#ffffff" fontSize="16" fontWeight="bold" fontFamily="sans-serif">
              Website &amp; Graphic
            </text>
            <text x="0" y="48" fill="#eab308" fontSize="20" fontStyle="italic" fontFamily="serif">
              Designer
            </text>

            <text x="0" y="70" fill="#a8a29e" fontSize="7" className="max-w-xs">
              Crafting premium digital experiences at the intersection
            </text>
            <text x="0" y="82" fill="#a8a29e" fontSize="7">
              of minimalist design, strategy, and modern code.
            </text>
          </g>

          {/* Right Column: Selected Work Mockup */}
          <g transform="translate(210, 75)">
            <rect width="140" height="85" rx="8" fill="#241e12" stroke="#eab308" strokeWidth="0.8" />
            <rect x="8" y="8" width="124" height="45" rx="5" fill="#382e19" />
            <text x="18" y="28" fill="#fde047" fontSize="8" fontWeight="bold">SELECTED WORK</text>
            <text x="18" y="40" fill="#e7e5e4" fontSize="7">Featured Digital Cases</text>
            <rect x="8" y="60" width="124" height="18" rx="4" fill="#eab308" />
            <text x="32" y="72" fill="#000000" fontSize="7" fontWeight="bold">BOOK A CALL ↗</text>
          </g>

          {/* Bottom Bar */}
          <rect x="50" y="170" width="300" height="35" rx="6" fill="#241e12" />
          <text x="65" y="191" fill="#fde047" fontSize="8" fontFamily="monospace">shohaghossen79886@gmail.com  •  Available for Projects</text>
        </svg>
      )}

      {/* Hover Reveal Action Pill */}
      <div className="absolute bottom-3 right-3 px-3 py-1.5 rounded-full bg-stone-900/90 border border-stone-700/80 text-white text-[11px] font-mono flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-xl backdrop-blur-md">
        <span>VIEW LIVE SPECS</span>
        <span className="text-amber-400">↗</span>
      </div>
    </div>
  );
};
