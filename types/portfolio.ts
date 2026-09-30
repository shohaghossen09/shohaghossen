export interface Project {
  id: string;
  title: string;
  tagline: string;
  category: string;
  year: string;
  client: string;
  description: string;
  deliverables: string[];
  metrics: { label: string; value: string };
  tech: string[];
  color: string;
  previewImage?: string;
  demoUrl?: string;
  details: {
    challenge: string;
    solution: string;
    impact: string;
    testimonial?: {
      quote: string;
      author: string;
      role: string;
    };
  };
}

export interface Service {
  id: string;
  number: string;
  title: string;
  shortDesc: string;
  deliverables: string[];
  icon: string;
  badge: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  phase: string;
  description: string;
  deliverables: string[];
}

export interface ValuePillar {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  metric: string;
  metricLabel: string;
}
