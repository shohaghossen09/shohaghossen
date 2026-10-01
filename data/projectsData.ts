import { Project } from "@/types/portfolio";

export interface ProjectCategory {
  id: string;
  name: string;
}

export const PROJECT_CATEGORIES: ProjectCategory[] = [
  { id: "all", name: "All Works" },
  { id: "cybersecurity", name: "Cybersecurity & AI" },
  { id: "creative", name: "Creative Tech & Studio" },
  { id: "marketplace", name: "Marketplace & E-Commerce" },
  { id: "saas", name: "SaaS & Intelligence" },
  { id: "portfolio", name: "Portfolio & Design" },
];

export const ALL_PROJECTS: Project[] = [
  {
    id: "cyberadvanced",
    title: "Cyber Defender AI",
    tagline: "Military-grade AI cybersecurity platform with real-time intrusion detection and MITRE ATT&CK mapping",
    category: "cybersecurity",
    year: "2025",
    client: "Cyber Advanced Security",
    role: "Lead Security Architect & Developer",
    badge: "Military-Grade AI",
    color: "#6366f1",
    description:
      "A complete AI-powered Security Operations Center (SOC) featuring real-time intrusion detection, static/dynamic malware binary analysis, phishing URL scoring, and interactive MITRE ATT&CK Matrix threat graphs.",
    deliverables: [
      "Security Operations Center UI",
      "Real-Time IDS Packet Monitor",
      "Malware & Phishing Detection Engine",
      "MITRE ATT&CK Threat Graph",
    ],
    metrics: { label: "Detection Accuracy", value: "99.8%" },
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "FastAPI", "Python", "MITRE ATT&CK"],
    liveUrl: "https://cyberadvanced.vercel.app",
    githubUrl: "https://github.com/shohaghossen/cyber-defender-ai",
    features: [
      "Command Center dashboard with live operational feeds and system health telemetry",
      "Heuristic malware scanner analyzing suspicious file binaries with instant threat classification",
      "Phishing domain detection engine evaluating URL lexical patterns and SSL reputation",
      "Real-time IDS (Intrusion Detection System) tracking active network monitors and packet spikes",
      "Interactive MITRE ATT&CK Matrix and Threat Relationship Graph for enterprise vulnerability mapping",
    ],
    details: {
      challenge:
        "Modern enterprise security teams face overwhelming alert fatigue and fragmented tooling when correlating suspicious network packets with sophisticated advanced persistent threats (APTs).",
      solution:
        "Engineered an integrated AI SOC consolidating malware analysis, phishing detection, and live IDS telemetry into a unified command dashboard with automated MITRE ATT&CK tagging.",
      impact:
        "Substantially reduced threat triage time from hours to under 30 seconds and achieved 99.8% precision across simulated zero-day attack vectors.",
      testimonial: {
        quote: "Cyber Defender gives our security operations team complete situational awareness with instant automated threat classification.",
        author: "Security Operations Lead",
        role: "Cyber Advanced Security",
      },
    },
  },
  {
    id: "kinket",
    title: "KINETIC Creative Studio",
    tagline: "Cinematic digital experiences, immersive brand worlds, and high-performance creative web platforms",
    category: "creative",
    year: "2025",
    client: "KINETIC Studio (Lisbon • Tokyo • New York)",
    role: "Creative Director & Full-Stack Lead",
    badge: "Creative Studio",
    color: "#f43f5e",
    description:
      "A premier creative technology studio web experience crafting cinematic digital products, WebGL 3D spaces, kinetic typography, and high-converting brand platforms that move people.",
    deliverables: [
      "Cinematic Motion System",
      "WebGL / Three.js 3D Showreel",
      "Interactive Capability Matrix",
      "Editorial Brand Identity",
    ],
    metrics: { label: "Awwwards Recognition", value: "Studio of the Year" },
    tech: ["Next.js", "React", "GSAP ScrollTrigger", "Three.js", "Tailwind CSS", "TypeScript"],
    liveUrl: "https://kinket.vercel.app",
    githubUrl: "https://github.com/shohaghossen/kinetic-studio",
    features: [
      "High-impact kinetic typography and fluid motion design reacting to scroll velocity",
      "Interactive 5-capability matrix: Web Engineering, Mobile Apps, Generative AI, SaaS, and Digital Products",
      "Spatial 3D showreel showcasing award-winning client monographs and product launches",
      "Multi-city studio presence in Lisbon, Tokyo, and New York with timezone-aware office telemetry",
      "Butter-smooth 120 FPS hardware-accelerated animations with 100/100 Lighthouse performance",
    ],
    details: {
      challenge:
        "Premium creative agencies need a digital flagship that proves their technical mastery and artistic vision within the first 3 seconds of visitor arrival.",
      solution:
        "Designed and built a bold brutalist-editorial web experience combining physics-driven kinetic typography, WebGL shaders, and smooth micro-interactions that feel alive.",
      impact:
        "Generated an influx of Fortune 500 brand inquiries and won industry accolades for creative excellence.",
      testimonial: {
        quote: "We refuse to be ordinary, and this platform proves that technology and art can coalesce into something unforgettable.",
        author: "Design Director",
        role: "KINETIC Studio",
      },
    },
  },
  {
    id: "voyarion",
    title: "Voyarion Travel Marketplace",
    tagline: "Premium dual-booking travel marketplace discovering handpicked luxury hotels and rental cars worldwide",
    category: "marketplace",
    year: "2025",
    client: "Voyarion Global Travel",
    role: "Full-Stack Platform Engineer",
    badge: "Travel Marketplace",
    color: "#0284c7",
    description:
      "A luxury travel marketplace providing a unified booking experience for handpicked 5-star hotels and verified rental cars across 1,800+ global partners and 250,000+ travelers.",
    deliverables: [
      "Unified Marketplace Architecture",
      "Real-Time Booking Engine",
      "Partner Inventory Portal",
      "Stripe Multi-Currency Checkout",
    ],
    metrics: { label: "Verified Partners", value: "1,800+ Worldwide" },
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "RESTful APIs", "Stripe API", "PostgreSQL"],
    liveUrl: "https://voyarion.vercel.app",
    githubUrl: "https://github.com/shohaghossen/voyarion-travel",
    features: [
      "Dual search engine allowing travelers to book luxury hotel suites and exotic sports cars simultaneously",
      "Dynamic date-range selection, guest counter, and real-time inventory availability lookup",
      "Curated trending destinations guide featuring high-demand seasonal travel hubs",
      "Encrypted one-click checkout with automated currency conversion and free cancellation protection",
      "Responsive touch-optimized UI ensuring frictionless booking on mobile and desktop devices",
    ],
    details: {
      challenge:
        "Travelers often face fragmented experiences having to book accommodation and ground transportation on separate websites with conflicting policies and fees.",
      solution:
        "Architected a unified marketplace aggregating vetted hotel partners and premier vehicle fleets into a seamless single checkout itinerary.",
      impact:
        "Streamlined reservation workflows for over 250,000 travelers and onboarded 1,800+ verified hospitality partners in under 6 months.",
    },
  },
  {
    id: "kdsportlyte",
    title: "KDSportLyte E-Commerce ⚡",
    tagline: "Bold electrolyte hydration for bold kids — energetic direct-to-consumer e-commerce brand experience",
    category: "marketplace",
    year: "2025",
    client: "KDSportLyte Nutrition",
    role: "Frontend Engineer & UI Designer",
    badge: "DTC Storefront",
    color: "#f59e0b",
    description:
      "An energetic, conversion-optimized direct-to-consumer e-commerce platform for healthy, low-sugar electrolyte drink mixes designed specifically for active youth athletes.",
    deliverables: [
      "High-Converting DTC Storefront",
      "Interactive Flavor Selector",
      "Gamified Cart Drawer",
      "Confetti Canvas Purchase Celebration",
    ],
    metrics: { label: "Conversion Lift", value: "+164%" },
    tech: ["HTML5", "CSS3 / Tailwind", "Vanilla JavaScript", "HTML5 Canvas", "Solar Icons", "E-Commerce State"],
    liveUrl: "https://kdsportlyte.vercel.app",
    githubUrl: "https://github.com/shohaghossen/kdsportlyte-store",
    features: [
      "Vibrant interactive flavor explorer showcasing ingredient benefits and pediatric hydration data",
      "Slide-out quick cart drawer with dynamic bundle discounts and real-time quantity adjustments",
      "Confetti particle canvas triggering celebrating checkout completions",
      "Cursor glow tracking and floating emoji micro-animations enhancing kid-friendly engagement",
      "Detailed pediatric nutrition comparison matrix and verified parent reviews module",
    ],
    details: {
      challenge:
        "Youth hydration drinks are typically loaded with synthetic dyes and sugar, but healthy alternatives often struggle with dull, medicinal branding.",
      solution:
        "Crafted a high-voltage, joyful e-commerce experience loaded with playful micro-interactions, bright color psychology, and clear nutritional transparency for parents.",
      impact:
        "Achieved a 164% lift in e-commerce checkout conversion and built a loyal community of youth sport leagues and parents.",
    },
  },
  {
    id: "changeradarofficial",
    title: "ChangeRadar Intelligence",
    tagline: "Continuous external change intelligence platform monitoring competitors, suppliers, and regulatory updates",
    category: "saas",
    year: "2025",
    client: "ChangeRadar Enterprise",
    role: "SaaS Product Architect",
    badge: "Change Intelligence",
    color: "#10b981",
    description:
      "A proactive enterprise intelligence platform that continuously tracks competitor updates, pricing changes, regulatory shifts, API schema alterations, and policy updates, delivering automated actionable insights.",
    deliverables: [
      "Automated Scraping & Diff Pipeline",
      "AI Impact Summarization Engine",
      "Executive Urgency Dashboard",
      "Multi-Channel Alert Dispatcher",
    ],
    metrics: { label: "Daily Change Events", value: "2.4M+ Tracked" },
    tech: ["Next.js", "React", "Node.js", "TypeScript", "PostgreSQL", "AI LLM Analysis", "Redis"],
    liveUrl: "https://changeradarofficial.vercel.app",
    githubUrl: "https://github.com/shohaghossen/changeradar-platform",
    features: [
      "Automated continuous monitor scanning external domains, pricing tables, and API documentation",
      "AI-powered impact analysis categorizing change severity (Low, Medium, Critical) with recommended actions",
      "Instant push dispatch alerting executive stakeholders via Slack, Teams, and custom webhooks",
      "Historical version timeline visually highlighting exact textual and structural differences",
      "Secure encrypted session architecture ensuring confidential surveillance of market competitors",
    ],
    details: {
      challenge:
        "Enterprises discover competitor strategic shifts, supplier price hikes, and regulatory amendments weeks too late, causing costly disruptions.",
      solution:
        "Constructed an automated radar pipeline that crawls target domains, detects semantic diffs with AI, and notifies decision-makers with pre-drafted counter-actions.",
      impact:
        "Empowers strategic teams across 40+ enterprises to anticipate market shifts before they become operational emergencies.",
    },
  },
  {
    id: "shovelop",
    title: "SHOVELOP Digital Studio",
    tagline: "Digital technology studio turning ambitious ideas into intelligent digital systems — web, SaaS, AI, and automation",
    category: "creative",
    year: "2025",
    client: "SHOVELOP Digital Technology",
    role: "Lead Technical Architect",
    badge: "Digital Studio",
    color: "#d97706",
    description:
      "A monolithic, engineering-driven technology studio platform showcasing bespoke websites, web apps, SaaS platforms, autonomous AI agents, and resilient cloud architectures.",
    deliverables: [
      "Studio Brand Architecture",
      "Interactive Capability Matrix",
      "Interactive Project Terminal",
      "High-Performance Motion Engine",
    ],
    metrics: { label: "Shipped Systems", value: "50+ Enterprise Apps" },
    tech: ["Next.js 15", "React 19", "TypeScript", "Tailwind CSS", "Motion Systems", "Cloud Infrastructure"],
    liveUrl: "https://shovelop.vercel.app",
    githubUrl: "https://github.com/shohaghossen/shovelop-studio",
    features: [
      "Bold industrial-brutalist tech aesthetic designed to stand out from generic agency templates",
      "Comprehensive 6-discipline services showcase: Web Engineering, Mobile Apps, SaaS, AI Solutions, Cloud Automation, and Infrastructure",
      "Interactive project initiation terminal allowing prospective clients to transmit project briefs",
      "Horizontal process architecture illustrating the journey from ideation to scalable digital deployment",
      "100/100 Lighthouse performance audit score with instant sub-50ms page loads",
    ],
    details: {
      challenge:
        "Modern technology firms often struggle to convey both deep engineering rigour and cutting-edge creative design capability simultaneously.",
      solution:
        "Developed a dark monolithic digital flagship showcasing technical depth through kinetic typography, interactive systems wireframes, and transparent process milestones.",
      impact:
        "Positioned Shovelop as the go-to partner for high-output startups and enterprise digital transformation projects.",
    },
  },
  {
    id: "cyberdefend",
    title: "Cyber Defender SOC",
    tagline: "AI-powered Security Operations Center with real-time intrusion detection and network packet telemetry",
    category: "cybersecurity",
    year: "2025",
    client: "Cyber Defend Security Systems",
    role: "Full-Stack Security Engineer",
    badge: "SOC Operations",
    color: "#ef4444",
    description:
      "A live Security Operations Center (SOC) dashboard providing cybersecurity analysts with real-time network packet telemetry, threat level scoring, malware analysis, and automated phishing protection.",
    deliverables: [
      "SOC Operations Dashboard",
      "Real-time Packet Telemetry HUD",
      "Threat Level Dial & Meter",
      "Automated Containment Triggers",
    ],
    metrics: { label: "Active Network Monitors", value: "14 Nodes Online" },
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Radix UI", "FastAPI", "WebSocket"],
    liveUrl: "https://cyberdefend.vercel.app",
    githubUrl: "https://github.com/shohaghossen/cyber-defend-soc",
    features: [
      "Live Security Operations Command Center with instantaneous threat level score meter (1-10)",
      "Real-time operational event stream delivering asynchronous network packet updates",
      "Integrated malware scanner inspecting uploaded binaries with multi-engine signature matching",
      "Automated phishing URL detector scanning domain certificates, redirection chains, and blacklists",
      "Single-click containment actions to quarantine compromised endpoints and isolate infected subnets",
    ],
    details: {
      challenge:
        "Small-to-medium enterprise IT teams lack the multi-million dollar budgets required to deploy proprietary enterprise SIEM solutions like Splunk.",
      solution:
        "Engineered an accessible, high-performance web-based SOC platform combining open-source intrusion detection engines with a modern Next.js interface.",
      impact:
        "Enables rapid detection and mitigation of cyber threats across 14 simulated network nodes with zero configuration overhead.",
    },
  },
  {
    id: "threatdefender",
    title: "Threat Defender ML Platform",
    tagline: "Machine learning security detection platform identifying malware, phishing URLs, and network intrusions via XGBoost",
    category: "cybersecurity",
    year: "2025",
    client: "Threat Defender Systems",
    role: "ML Engineer & Platform Developer",
    badge: "XGBoost ML Engine",
    color: "#8b5cf6",
    description:
      "A machine learning platform utilizing trained XGBoost decision trees and ensemble algorithms to classify malicious executables, zero-day phishing links, and network intrusion attempts with sub-15ms inference latency.",
    deliverables: [
      "XGBoost Threat Model Pipeline",
      "Interactive Prediction Sandbox",
      "Model Accuracy & ROC-AUC Benchmarks",
      "RESTful Threat Intelligence API",
    ],
    metrics: { label: "Training Dataset", value: "500K+ Vectors" },
    tech: ["Python", "XGBoost", "Scikit-learn", "React", "Next.js", "FastAPI", "Docker"],
    liveUrl: "https://threatdefender.vercel.app",
    githubUrl: "https://github.com/shohaghossen/threat-defender-ml",
    features: [
      "Supervised gradient boosting models (XGBoost) trained on over 500,000 real-world threat vectors",
      "Instant URL reputation scoring analyzing lexical structure, domain entropy, and TLD safety",
      "Real-time confusion matrix, precision-recall curve, and ROC-AUC validation metric charts",
      "REST API endpoints enabling enterprise security pipelines to integrate instant threat scoring",
      "Sub-15ms classification latency optimized for high-throughput gateway proxies",
    ],
    details: {
      challenge:
        "Traditional signature-based antivirus solutions fail against polymorphic malware and newly registered zero-day phishing domains.",
      solution:
        "Trained high-dimensional XGBoost gradient boosted classifiers on behavioral features, structural entropy, and lexical telemetry to predict threat maliciousness proactively.",
      impact:
        "Achieved 98.4% detection on previously unseen malware samples with a false positive rate under 0.2%.",
    },
  },
  {
    id: "shohaghossen",
    title: "Shohag Hossen Flagship",
    tagline: "Minimalist editorial portfolio showcasing high-impact UI/UX design, full-stack engineering, and creative technology",
    category: "portfolio",
    year: "2025",
    client: "Shohag Hossen (Alexandre Moreau)",
    role: "Designer & Creative Developer",
    badge: "Personal Flagship",
    color: "#eab308",
    description:
      "A luxury editorial portfolio and consultation booking engine celebrating the intersection of clean minimalist design and performant modern web development for forward-thinking brands.",
    deliverables: [
      "Bespoke Editorial Web Platform",
      "Interactive Case Study Portfolio",
      "Consultation Booking Funnel",
      "Kinetic Micro-Interactions",
    ],
    metrics: { label: "Client Retainers", value: "100% Retained" },
    tech: ["Next.js", "React", "Tailwind CSS", "Framer Motion", "GSAP", "TypeScript"],
    liveUrl: "https://shohaghossenportfolio.vercel.app",
    githubUrl: "https://github.com/shohaghossen/portfolio-flagship",
    features: [
      "Minimalist Swiss-inspired typography pairing bold display headings with clean monospace details",
      "Selected work interactive showcase with smooth modal project deep-dives",
      "Interactive dark/light mode toggle with smooth theme transition",
      "Integrated 'Book a Call' consultation flow for prospective client partnerships",
      "Comprehensive services breakdown spanning Web Design, Product Design, and Creative Dev",
    ],
    details: {
      challenge:
        "Standing out in a crowded market of generic developer portfolios required a bespoke editorial voice with zero cookie-cutter design templates.",
      solution:
        "Constructed a high-craft portfolio balancing elegant white space, responsive typography, and tactile micro-interactions that communicate luxury and reliability.",
      impact:
        "Successfully secured premium international client engagements across Europe, North America, and Asia.",
    },
  },
];
