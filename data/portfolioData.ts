import { Project, Service, ProcessStep, ValuePillar } from "@/types/portfolio";

export const PERSONAL_INFO = {
  name: "ALEXANDER CHEN",
  role: "Lead Design Engineer & Creative Technologist",
  tagline: "BUILD DIGITAL EXPERIENCES THAT HELP BUSINESSES GET NOTICED, TRUSTED & CHOSEN.",
  heroSubtitle:
    "I design and develop high-converting websites and digital experiences that turn ideas into memorable online products.",
  aboutHeadline: "BEHIND THE WORK IS A PERSON WHO CARES ABOUT THE DETAILS.",
  aboutBio:
    "I bridge the gap between bold editorial art direction and resilient engineering. For over eight years, I've partnered with venture-backed startups and visionary founders to turn ambitious concepts into award-winning digital flagships.",
  location: "San Francisco, CA / Available Globally",
  coordinates: "37.7749° N, 122.4194° W",
  experienceYears: "8+ Years",
  projectsShipped: "40+ Shipped",
  status: "Available for select Q4 engagements",
  email: "alexander@chen.design",
  socials: [
    { label: "Twitter / X", url: "https://x.com", handle: "@alexanderchen" },
    { label: "GitHub", url: "https://github.com", handle: "github.com/alexanderchen" },
    { label: "LinkedIn", url: "https://linkedin.com", handle: "linkedin.com/in/alexanderchen" },
    { label: "Dribbble", url: "https://dribbble.com", handle: "dribbble.com/alexanderchen" },
  ],
};

export const SERVICES: Service[] = [
  {
    id: "web-design",
    number: "01",
    title: "WEB DESIGN",
    badge: "Figma / Editorial",
    shortDesc:
      "Art direction, typographic balance, and bespoke digital aesthetics that stand out from cookie-cutter templates.",
    deliverables: ["Editorial Layouts", "Interactive Design Systems", "Responsive Grid Architecture", "Motion Guidelines"],
    icon: "palette",
  },
  {
    id: "creative-dev",
    number: "02",
    title: "CREATIVE DEV",
    badge: "Next.js / GSAP / WebGL",
    shortDesc:
      "Translating visionary designs into butter-smooth, 60–120 FPS web experiences with zero jank.",
    deliverables: ["Next.js & React 19", "GSAP ScrollTrigger Engines", "Shader & Canvas Effects", "Micro-Interactions"],
    icon: "code",
  },
  {
    id: "landing-pages",
    number: "03",
    title: "LANDING PAGES",
    badge: "Conversion / Narrative",
    shortDesc:
      "Story-driven product launches engineered to hook visitor attention and guide them smoothly into high-intent conversion.",
    deliverables: ["Launch Teasers", "Feature Interactive Tours", "A/B Conversion Layouts", "Social Proof Modules"],
    icon: "layout",
  },
  {
    id: "ui-ux-systems",
    number: "04",
    title: "UI/UX SYSTEMS",
    badge: "Design Systems / Tokens",
    shortDesc:
      "Scalable design languages and reusable component libraries built to accelerate product development cycles.",
    deliverables: ["Design Tokens (Style Dictionary)", "Accessible Component Libraries", "Documentation & Storybooks", "Figma-to-Code Sync"],
    icon: "layers",
  },
  {
    id: "brand-experience",
    number: "05",
    title: "BRAND EXPERIENCE",
    badge: "Identity / Kinetic",
    shortDesc:
      "Immersive brand expressions that transform standard digital touchpoints into emotional, unforgettable encounters.",
    deliverables: ["Kinetic Typography", "Custom 3D Scene Direction", "Sonic Identity Integration", "Digital Brand Guidelines"],
    icon: "sparkles",
  },
  {
    id: "performance-seo",
    number: "06",
    title: "CONVERSION & SPEED",
    badge: "Core Web Vitals",
    shortDesc:
      "Extreme performance engineering guaranteeing sub-second load times, flawless accessibility, and peak search visibility.",
    deliverables: ["100/100 Lighthouse Audits", "Asset & Video Optimization", "Semantic Accessibility (a11y)", "Technical SEO Architecture"],
    icon: "zap",
  },
];

export const PROJECTS: Project[] = [
  {
    id: "aura-ai",
    title: "AURA AI",
    tagline: "Autonomous spatial intelligence workspace for high-output product teams",
    category: "AI Platform & Design System",
    year: "2026",
    client: "Aura Labs Inc.",
    description:
      "A complete digital redesign and kinetic web application for an enterprise AI workspace, boosting visitor demo requests by 214%.",
    deliverables: ["Product Strategy", "Creative Direction", "Next.js Architecture", "Scroll Story Engine"],
    metrics: { label: "Demo Conversion Rate", value: "+214%" },
    tech: ["Next.js", "React 19", "GSAP ScrollTrigger", "Tailwind CSS"],
    color: "#e28743",
    details: {
      challenge:
        "Aura had revolutionized generative reasoning, but their existing web presence felt like a technical API doc rather than an intuitive, category-defining tool.",
      solution:
        "We built an interactive narrative where prospective clients can manipulate live spatial node graphs directly in the browser, demonstrating latency-free AI reasoning.",
      impact:
        "Within 60 days of launch, Aura closed an oversubscribed Series A and grew inbound enterprise leads by 3.2x.",
      testimonial: {
        quote: "Alexander gave our AI platform a soul. The website converted skeptical enterprise buyers into enthusiastic champions.",
        author: "Marcus Vance",
        role: "Co-Founder & CEO, Aura Labs",
      },
    },
  },
  {
    id: "kinetic-form",
    title: "KINETIC FORM",
    tagline: "Architectural monograph & spatial brand experience for a brutalist studio",
    category: "Architecture & Kinetic Web",
    year: "2025",
    client: "Kinetic Studio",
    description:
      "An award-winning editorial showcase celebrating structural minimalism, spatial proportions, and kinetic typography.",
    deliverables: ["Editorial Layouts", "WebGL Shaders", "Custom Typography", "Audio Ambience"],
    metrics: { label: "International Awards", value: "3x Awwwards" },
    tech: ["TypeScript", "WebGL / Three.js", "GSAP", "Tailwind CSS"],
    color: "#c27847",
    details: {
      challenge:
        "Translating 400-ton concrete structures and tactile materiality into a digital medium without losing weight or emotional gravity.",
      solution:
        "Developed custom WebGL displacement shaders that simulate sunlight drifting across raw concrete walls as the user navigates architectural case studies.",
      impact:
        "Won Awwwards Site of the Day, FWA of the Day, and drove private commissions worth over $14M for the studio.",
      testimonial: {
        quote: "The digital experience matches the exact physical precision we demand in our physical architecture.",
        author: "Elena Rostova",
        role: "Principal Architect",
      },
    },
  },
  {
    id: "valence-os",
    title: "VALENCE CAPITAL",
    tagline: "Private liquidity operating system managing $2.4B in venture secondary assets",
    category: "Fintech Platform & OS",
    year: "2025",
    client: "Valence Global",
    description:
      "A high-security, precision-engineered web application and public marketing platform for institutional secondary markets.",
    deliverables: ["Fintech UI/UX", "High-Security Web App", "Real-Time Charts", "Interactive Simulator"],
    metrics: { label: "Quarterly Volume", value: "$480M+" },
    tech: ["React", "Next.js App Router", "Tailwind CSS", "Canvas Charts"],
    color: "#b07d57",
    details: {
      challenge:
        "Institutional asset managers needed institutional credibility combined with consumer-grade speed and clarity in complex multi-party cap table liquidity.",
      solution:
        "Designed and implemented a real-time order-matching interface with instant zero-knowledge visual verification and bespoke dark glass aesthetic.",
      impact:
        "Shortened onboarding cycle from 14 days to under 48 hours and securely processed over $480M in transactions in Q1 alone.",
    },
  },
  {
    id: "synapse-audio",
    title: "SYNAPSE AUDIO",
    tagline: "Generative browser synthesizer and spatial acoustics playground",
    category: "Web Audio & Creative Tech",
    year: "2024",
    client: "Synapse Sound Labs",
    description:
      "An in-browser node-based modular synthesizer engine built with Web Audio API, SVG patch cables, and 120 FPS kinetic visualization.",
    deliverables: ["Web Audio DSP", "Custom Canvas Engine", "Interactive Patches", "MIDI Integration"],
    metrics: { label: "Active Musicians", value: "85K+ Users" },
    tech: ["Web Audio API", "WebAssembly", "TypeScript", "Canvas 2D"],
    color: "#cf8a55",
    details: {
      challenge:
        "Running low-latency polyphonic audio synthesis in consumer browsers without audio dropouts while maintaining 120fps visualization.",
      solution:
        "Engineered an AudioWorklet pipeline decoupled from the main DOM thread, rendering waveform oscilloscopes through offscreen canvas.",
      impact:
        "Featured on Product Hunt #1 Product of the Day and adopted by sound designers at major gaming and film studios.",
    },
  },
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: "01",
    title: "DISCOVER",
    phase: "Week 01",
    description:
      "Deep dive into your market landscape, competitive moats, core business objectives, and customer psychology to uncover what makes your product irresistible.",
    deliverables: ["Strategic Foundation Deck", "Audience Persona & Motivations", "Competitor Differentiation Audit"],
  },
  {
    number: "02",
    title: "PLAN",
    phase: "Week 02",
    description:
      "Architecting the complete story structure, information hierarchy, wireframe flows, and technical stack specifications before touching aesthetic layers.",
    deliverables: ["Content Architecture", "Interactive Wireframes", "Technical Stack Specification"],
  },
  {
    number: "03",
    title: "DESIGN",
    phase: "Week 03-04",
    description:
      "Crafting the visual identity, typography system, custom micro-interactions, responsive states, and kinetic prototypes that define the website's soul.",
    deliverables: ["High-Fidelity Figma Systems", "Kinetic Motion Prototypes", "Design Token Hierarchy"],
  },
  {
    number: "04",
    title: "BUILD",
    phase: "Week 05-06",
    description:
      "Translating approved designs into production-grade Next.js and React code with buttery 60–120 FPS animations, accessible markup, and clean architecture.",
    deliverables: ["Next.js App Router Engineering", "GSAP Animation Engine", "Responsive Cross-Browser Polish"],
  },
  {
    number: "05",
    title: "REFINE",
    phase: "Week 07",
    description:
      "Relentless testing across devices, network throttles, screen sizes, and assistive technologies to ensure 100/100 performance scores and zero friction.",
    deliverables: ["Lighthouse 100/100 Optimization", "Cross-Device QA & Debugging", "Accessibility (WCAG AA) Compliance"],
  },
  {
    number: "06",
    title: "LAUNCH",
    phase: "Week 08",
    description:
      "Zero-downtime deployment, DNS migration, analytics and conversion event wiring, followed by complete team handoff and documentation.",
    deliverables: ["Production Deployment", "Analytics & Conversion Telemetry", "Handoff Documentation & Video Tour"],
  },
];

export const VALUE_PILLARS: ValuePillar[] = [
  {
    id: "attention",
    title: "ATTENTION",
    subtitle: "Visual Magnetism",
    description:
      "In a world of copied templates and generic SaaS pages, bold artistic craft stops the scroll and creates an immediate emotional connection.",
    metric: "0.05s",
    metricLabel: "Time to form a decisive brand impression",
  },
  {
    id: "trust",
    title: "TRUST",
    subtitle: "Enterprise Credibility",
    description:
      "Flawless micro-interactions, editorial typography, and instantaneous load speeds subconsciously signal premium quality and unwavering reliability.",
    metric: "100%",
    metricLabel: "Subconscious signal of product maturity",
  },
  {
    id: "conversions",
    title: "CONVERSIONS",
    subtitle: "Narrative Alignment",
    description:
      "A seamless cinematic journey clarifies your value proposition, removes cognitive friction, and naturally guides high-intent buyers toward the CTA.",
    metric: "3.2x",
    metricLabel: "Average increase in qualified pipeline inquiries",
  },
  {
    id: "growth",
    title: "GROWTH",
    subtitle: "Scalable Architecture",
    description:
      "Built on modern Next.js and reusable component systems that allow your internal team to launch new campaigns and features in minutes, not months.",
    metric: "0s",
    metricLabel: "Friction when scaling features or traffic",
  },
];

export const CHAPTERS = [
  { id: "hero", label: "Hero", range: [0, 0.16] },
  { id: "about", label: "About", range: [0.16, 0.32] },
  { id: "services", label: "Services", range: [0.32, 0.48] },
  { id: "work", label: "Work", range: [0.48, 0.66] },
  { id: "process", label: "Process", range: [0.66, 0.80] },
  { id: "value", label: "Value", range: [0.80, 0.90] },
  { id: "contact", label: "Contact", range: [0.90, 1.0] },
] as const;
