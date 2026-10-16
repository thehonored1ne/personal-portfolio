import avatarImg from "@/assets/avatar.webp";
import bannerImg from "@/assets/banner1.webp";
import projectPlaceholder from "@/assets/projects_images/placeholder_image.png";
import certPlaceholder from "@/assets/certifications/placeholder_image.png";

const projectImageFiles = import.meta.glob(
  "/src/assets/projects_images/**/*.{png,jpg,jpeg,webp}",
  {
    eager: true,
    import: "default",
  },
) as Record<string, string>;

const certificateImageFiles = import.meta.glob(
  "/src/assets/certifications/**/*.{png,jpg,jpeg,webp}",
  {
    eager: true,
    import: "default",
  },
) as Record<string, string>;

export interface ProjectImage {
  url: string;
  caption: string;
}

type ProjectImageEntry = {
  file: string;
  caption: string;
};

const getProjectImages = (entries: ProjectImageEntry[]): ProjectImage[] =>
  entries.map(({ file, caption }) => ({
    url:
      projectImageFiles[`/src/assets/projects_images/${file}`] ??
      projectPlaceholder,
    caption,
  }));

const getCertificateImage = (file: string): string =>
  certificateImageFiles[`/src/assets/certifications/${file}`] ?? certPlaceholder;

const projectImageData: Record<string, ProjectImageEntry[]> = {
  "linear-ui-clone": [
    {
      file: "placeholder_image.png",
      caption: "Main active issue list with keyboard shortcut indicators",
    },
    {
      file: "placeholder_image.png",
      caption: "Real-time command menu and filter engine",
    },
    {
      file: "placeholder_image.png",
      caption: "Sprint planning boards and velocity metrics",
    },
    {
      file: "placeholder_image.png",
      caption: "Dark-mode cycle telemetry and performance charts",
    },
  ],
  "oxide-syntax": [
    {
      file: "placeholder_image.png",
      caption: "TypeScript syntax highlight showing subtle token differentiation",
    },
    {
      file: "placeholder_image.png",
      caption: "Calibrated contrast ratios across dark palette tokens",
    },
    {
      file: "placeholder_image.png",
      caption: "Markdown preview and terminal integrated styling",
    },
    {
      file: "placeholder_image.png",
      caption: "Multi-IDE token export preview",
    },
  ],
  "tokens-engine": [
    { file: "placeholder_image.png", caption: "AST token extraction preview" },
    { file: "placeholder_image.png", caption: "Figma synchronization pipeline" },
    { file: "placeholder_image.png", caption: "CSS custom properties output" },
    { file: "placeholder_image.png", caption: "Tree-shaking benchmark analysis" },
  ],
  typewriter: [
    { file: "placeholder_image.png", caption: "Focused document canvas" },
    { file: "placeholder_image.png", caption: "Distraction-free writing environment" },
    { file: "placeholder_image.png", caption: "Local SQLite database inspector" },
    { file: "placeholder_image.png", caption: "Offline synchronization ledger" },
  ],
};

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
    images: getProjectImages(projectImageData["linear-ui-clone"]),
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
    images: getProjectImages(projectImageData["oxide-syntax"]),
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
    images: getProjectImages(projectImageData["tokens-engine"]),
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
    images: getProjectImages(projectImageData.typewriter),
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
    image: getCertificateImage("placeholder_image.png"),
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
    image: getCertificateImage("placeholder_image.png"),
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
    image: getCertificateImage("placeholder_image.png"),
  },
];

export const socials: SocialLink[] = [
  { label: "GitHub", href: "https://github.com/dionareglo" },
  { label: "LinkedIn", href: "https://linkedin.com/in/dionareglo" },
  { label: "Facebook", href: "https://facebook.com/dionareglo" },
  { label: "Email", href: "mailto:dion@example.com" },
];
