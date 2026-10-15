import avatarImg from "@/assets/avatar.webp";
import bannerImg from "@/assets/banner1.webp";

export interface ProjectImage {
  url: string;
  caption: string;
}

export interface ProjectContributor {
  name: string;
  role: string;
}

export interface Project {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  category: string;
  year: string;
  role: string;
  team?: ProjectContributor[];
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  images: ProjectImage[];
  highlights: string[];
}

export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  location: string;
  description: string;
  achievements: string[];
  technologies: string[];
  href?: string;
}

export interface EducationItem {
  institution: string;
  degree: string;
  field?: string;
  period: string;
  location?: string;
  honors?: string;
  description?: string;
  highlights?: string[];
}

export interface CertificationItem {
  title: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
  description?: string;
  skills?: string[];
  credentialId?: string;
  credentialUrl?: string;
  url?: string;
  image?: string;
}

export interface SocialLink {
  label: string;
  href: string;
}

export const profile = {
  name: "Dion Areglo",
  role: "Frontend Engineer & Interface Designer",
  bio: "Crafting responsive, accessible, and resilient web software. Focusing on typography, interface ergonomics, and thoughtful interactions.",
  location: "Manila, Philippines",
  status: "Available for select engagements",
  avatar: avatarImg,
  banner: bannerImg,
};

export const projects: Project[] = [
  {
    slug: "linear-ui-clone",
    title: "Linear UI Clone",
    tagline:
      "High-performance task management interface with keyboard-first workflows.",
    description:
      "A client-ready recreation of Linear desktop experience focusing on sub-50ms interaction latency, optimistic state mutations, and a complete command palette navigation architecture.",
    category: "Web Application",
    year: "2024",
    role: "Lead Frontend Engineer",
    team: [
      { name: "Dion Areglo", role: "Frontend & Architecture" },
      { name: "Sarah Chen", role: "Product Design" },
      { name: "David Kim", role: "API & Realtime Sync" },
    ],
    tags: ["Vue 3", "TypeScript", "Tailwind", "Pinia"],
    liveUrl: "https://linear-clone.example.com",
    githubUrl: "https://github.com/example/linear-ui-clone",
    images: [
      {
        url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
        caption: "Main active issue list with keyboard shortcut indicators",
      },
      {
        url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
        caption: "Real-time command menu and filter engine",
      },
      {
        url: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80",
        caption: "Sprint planning boards & velocity metrics",
      },
      {
        url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
        caption: "Dark-mode cycle telemetry & performance charts",
      },
    ],
    highlights: [
      "Engineered keyboard navigation engine with vim-like bindings and 0ms perceive latency.",
      "Optimistic UI updates with instant rollback on WebSocket network failure.",
      "Comprehensive virtual scroll system rendering 10,000+ issues without frame degradation.",
    ],
  },
  {
    slug: "oxide-syntax",
    title: "Oxide Syntax",
    tagline: "Minimalist code editor color scheme for optical comfort.",
    description:
      "A precision-engineered dark theme focused on reducing cognitive eye fatigue during extended coding sessions through calibrated contrast ratios and semantic token separation.",
    category: "Design Tooling",
    year: "2024",
    role: "Designer & Maintainer",
    tags: ["VS Code", "Design System", "Tokens"],
    liveUrl: "https://marketplace.visualstudio.com/items?itemName=oxide-syntax",
    githubUrl: "https://github.com/example/oxide-syntax",
    images: [
      {
        url: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
        caption:
          "TypeScript syntax highlight showing subtle token differentiation",
      },
      {
        url: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80",
        caption: "Calibrated contrast ratios across dark palette tokens",
      },
      {
        url: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80",
        caption: "Markdown preview & terminal integrated styling",
      },
      {
        url: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80",
        caption: "Multi-IDE token export preview",
      },
    ],
    highlights: [
      "Surpassed 45,000+ active installs on the Visual Studio Code Marketplace with 4.9-star rating.",
      "WCAG 2.1 AAA compliant contrast thresholds across all token tiers.",
      "Automated design token generation pipeline compiling themes across 5 IDE platforms.",
    ],
  },
  {
    slug: "tokens-engine",
    title: "Tokens Engine",
    tagline: "Zero-runtime design token extraction and CSS compiler.",
    description:
      "A lightweight CLI utility that converts design tokens across Figma, CSS custom properties, and TypeScript declarations without bundling overhead.",
    category: "Open Source",
    year: "2023",
    role: "Author",
    tags: ["Vite", "AST", "Node.js", "CLI"],
    liveUrl: "https://tokens-engine.dev",
    githubUrl: "https://github.com/example/tokens-engine",
    images: [
      {
        url: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80",
        caption: "AST token extraction and terminal diff preview",
      },
      {
        url: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
        caption: "Figma REST API synchronization pipeline",
      },
      {
        url: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=1200&q=80",
        caption: "CSS custom properties compilation output",
      },
      {
        url: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
        caption: "Zero-runtime tree-shaking benchmark analysis",
      },
    ],
    highlights: [
      "Compiles design tokens directly from Figma REST API into strongly typed TS variables.",
      "Generates zero-runtime atomic CSS utility classes with automatic tree-shaking.",
    ],
  },
  {
    slug: "typewriter",
    title: "Typewriter",
    tagline:
      "Distraction-free markdown writing application with local storage.",
    description:
      "A focused markdown text editor that strips away extraneous UI chrome to keep writers locked in uninterrupted flow state, with offline SQLite storage.",
    category: "Desktop & Web App",
    year: "2023",
    role: "Fullstack Developer",
    tags: ["Vue 3", "Wasm", "PWA", "SQLite"],
    liveUrl: "https://typewriter.example.com",
    githubUrl: "https://github.com/example/typewriter",
    images: [
      {
        url: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80",
        caption: "Focused document canvas in typography mode",
      },
      {
        url: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=80",
        caption: "Distraction-free zen writing environment",
      },
      {
        url: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=1200&q=80",
        caption: "Local SQLite Wasm database inspector",
      },
      {
        url: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
        caption: "Offline PWA synchronization ledger",
      },
    ],
    highlights: [
      "Local-first persistence using SQLite compiled to WebAssembly with zero server dependencies.",
      "Instant document search powered by in-browser fuzzy indexing.",
    ],
  },
];

export const experience: ExperienceItem[] = [
  {
    company: "Vercel Ecosystem",
    role: "Frontend Engineer",
    period: "2023 — Present",
    location: "Remote",
    description:
      "Developing high-performance design system interfaces, micro-frontends, and accessible components across developer platforms.",
    achievements: [
      "Engineered core components reducing bundle payload by 28% across high-traffic marketing sites.",
      "Implemented fluid keyboard-driven command navigation patterns across internal tooling.",
    ],
    technologies: ["Vue 3", "TypeScript", "Tailwind CSS", "Vite", "Next.js"],
    href: "https://vercel.com",
  },
  {
    company: "Supabase Studio",
    role: "UI / UX Engineer",
    period: "2022 — 2023",
    location: "Remote",
    description:
      "Designed and maintained developer-facing database inspection tables, query editors, and authentication management consoles.",
    achievements: [
      "Architected real-time row-level security policy builder with live preview.",
      "Maintained zero accessibility violations across table data grids using WAI-ARIA guidelines.",
    ],
    technologies: ["Vue 3", "TypeScript", "Tailwind CSS", "PostgreSQL"],
    href: "https://supabase.com",
  },
  {
    company: "Resonance Design",
    role: "Junior Interface Engineer",
    period: "2021 — 2022",
    location: "Manila, Philippines",
    description:
      "Built custom client websites and digital brand platforms with high-touch interaction design.",
    achievements: [
      "Delivered 12+ bespoke client web experiences with 100/100 Lighthouse performance scores.",
    ],
    technologies: ["JavaScript", "HTML/CSS", "Tailwind CSS", "Figma"],
  },
];

export const education: EducationItem[] = [
  {
    institution: "Technological University of the Philippines",
    degree: "Bachelor of Science",
    field: "Computer Science",
    period: "2017 — 2021",
    location: "Manila, Philippines",
    honors: "Magna Cum Laude",
    description:
      "Specialized in Software Engineering, Human-Computer Interaction, and Distributed Systems.",
    highlights: [
      "Graduated Magna Cum Laude with Departmental Academic Distinction.",
      "Lead Developer for university automated portal migration.",
      "Specialized coursework in Advanced Algorithms, UI Systems, and Distributed Computing.",
    ],
  },
];

export const certifications: CertificationItem[] = [
  {
    title: "Meta Certified Frontend Developer",
    issuer: "Meta",
    issueDate: "2023",
    description:
      "Advanced certification covering modern React/Vue architectures, accessibility, and web ergonomics.",
    skills: ["Vue", "React", "State Management", "Accessibility (a11y)"],
    credentialId: "META-FE-98421",
    credentialUrl: "https://coursera.org",
    image:
      "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?auto=format&fit=crop&w=1400&q=85",
  },
  {
    title: "TypeScript Professional Certification",
    issuer: "TypeScript Institute",
    issueDate: "2022",
    description:
      "Deep-dive credential on static type analysis, AST manipulation, and generative types.",
    skills: ["TypeScript", "Generics", "Type Systems", "Compiler API"],
    credentialId: "TS-PRO-44219",
    credentialUrl: "https://typescriptlang.org",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1400&q=85",
  },
  {
    title: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services",
    issueDate: "2022",
    description:
      "Foundational architecture, security models, and cloud deployment pipelines on AWS infrastructure.",
    skills: ["AWS", "S3", "CloudFront", "Serverless"],
    credentialId: "AWS-CCP-10924",
    credentialUrl: "https://aws.amazon.com",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1400&q=85",
  },
];

export const socials: SocialLink[] = [
  { label: "GitHub", href: "https://github.com/dionareglo" },
  { label: "LinkedIn", href: "https://linkedin.com/in/dionareglo" },
  { label: "Twitter / X", href: "https://x.com/dionareglo" },
  { label: "Email", href: "mailto:dion@example.com" },
];
