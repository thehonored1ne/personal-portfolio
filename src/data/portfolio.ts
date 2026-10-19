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
  certificateImageFiles[`/src/assets/certifications/${file}`] ??
  certPlaceholder;

const projectImageData: Record<string, ProjectImageEntry[]> = {
  "evaluation-system": [
    {
      file: "evaluation-system/admin-dashboard.webp",
      caption:
        "Administrator dashboard with evaluation progress and department completion charts",
    },
    {
      file: "evaluation-system/evaluation-form.webp",
      caption:
        "Evaluation form for rating performance across subject disciplines",
    },
    {
      file: "evaluation-system/evaluator-dashboard.webp",
      caption:
        "Evaluator dashboard with submitted evaluations and review status",
    },
    {
      file: "evaluation-system/welcome-page.webp",
      caption: "Online evaluation welcome and login page",
    },
  ],
  "memory-vault": [
    {
      file: "memory-vault/github-view.webp",
      caption: "GitHub repository overview for the Agent Memory Vault package",
    },
    {
      file: "memory-vault/npm-readme-view.webp",
      caption: "NPM package README with the memory architecture overview",
    },
    {
      file: "memory-vault/npm-code.webp",
      caption: "NPM source code view for the published package",
    },
    {
      file: "memory-vault/npm-version.webp",
      caption: "NPM version history and package release details",
    },
  ],
  "payday-splitter": [
    {
      file: "payday-splitter/first-page.webp",
      caption: "Payday Splitter dashboard with pay cycle and budget presets",
    },
    {
      file: "payday-splitter/breakdown.webp",
      caption: "Full month breakdown with budget split visualization",
    },
    {
      file: "payday-splitter/cuts-nethome.webp",
      caption:
        "Net take-home summary with statutory deductions and bonus insight",
    },
    {
      file: "payday-splitter/mobile-view.webp",
      caption: "Responsive mobile view for calculating monthly pay",
    },
  ],
  typewriter: [
    { file: "placeholder_image.png", caption: "Focused document canvas" },
    {
      file: "placeholder_image.png",
      caption: "Distraction-free writing environment",
    },
    {
      file: "placeholder_image.png",
      caption: "Local SQLite database inspector",
    },
    {
      file: "placeholder_image.png",
      caption: "Offline synchronization ledger",
    },
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
  degree?: string;
  field?: string;
  strand?: string;
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
    slug: "360-evaluation-system",
    title: "360 Degree Evaluation System with NLP",
    tagline:
      "AI-powered performance evaluations with real-time feedback analysis.",
    description:
      "A web platform that automates faculty and staff performance reviews. The system collects feedback from multiple sources and uses natural language processing to analyze written comments. It turns unstructured feedback into clear scores and insights.",
    category: "Web Application",
    year: "2026",
    role: "Lead Developer Engineer",
    team: [
      { name: "Dion Areglo", role: "Lead Developer" },
      { name: "Florenz Deonila", role: "Product Design & QA Testing" },
      { name: "Hazel Convicto", role: "Testing & Documentation" },
      { name: "Christine Capina", role: "Testing & Documentation" },
      { name: "Mark Benjie Arabe", role: "Presenting & Documentation" },
    ],
    tags: ["Laravel", "Livewire", "Tailwind", "AlphineJS", "Flask", "Python"],
    liveUrl: "https://grc-online-eval.up.railway.app/",
    githubUrl: "https://github.com/thehonored1ne/EvaluationSystemCapstone",
    images: getProjectImages(projectImageData["evaluation-system"]),
    highlights: [
      "The platform collects reviews from peers, supervisors, and subordinates in one place.",
      "Integrated NLP models score sentiment and extract key themes from written feedback.",
      "Real-time reporting engine generates instant performance summaries and score breakdowns.",
      "Role-based dashboards keep sensitive data secure for teachers, staff, and management.",
    ],
  },
  {
    slug: "memory-vault",
    title: "Agent Memory Vault NPM Package",
    tagline: "Persistent local memory for AI coding agents.",
    description:
      "A zero-dependency NPM package that gives AI coding agents a local, persistent memory layer. It helps preserve project context, reduce repeated explanations, and keep useful decisions available across sessions.",
    category: "NPM Package",
    year: "2026",
    role: "Developer & Maintainer",
    tags: ["NPM", "Python", "Javascript", "Sqlite", "Obsidian"],
    liveUrl: "https://www.npmjs.com/package/agent-memory-vault",
    githubUrl: "https://github.com/thehonored1ne/agent-memory-vault",
    images: getProjectImages(projectImageData["memory-vault"]),
    highlights: [
      "Stores project memory locally so agents can retain context across coding sessions.",
      "Uses a zero-dependency architecture designed to stay portable and easy to install from NPM.",
      "Provides a structured source of truth for decisions, instructions, and reusable project knowledge.",
      "Published with GitHub source, README documentation, release history, and an MIT license.",
    ],
  },
  {
    slug: "payday-splitter",
    title: "Payday Splitter",
    tagline: "A simple Philippine payroll and budget planning calculator.",
    description:
      "A web-based payroll calculator that estimates monthly take-home pay, statutory deductions, budget allocations, savings, emergency funds, and 13th month pay using Philippine payroll rules.",
    category: "Web Application",
    year: "2025",
    role: "Developer & Maintainer",
    tags: ["HTML", "CSS", "JavaScript", "Vercel"],
    liveUrl: "https://payday-splitter.vercel.app/",
    githubUrl: "https://github.com/thehonored1ne/PaydaySplitter",
    images: getProjectImages(projectImageData["payday-splitter"]),
    highlights: [
      "Supports full-month and half-month pay cycle calculations.",
      "Provides configurable budget presets for needs, wants, emergency funds, and savings.",
      "Calculates common Philippine deductions including SSS, PhilHealth, Pag-IBIG, and income tax.",
      "Includes responsive layouts for desktop and mobile payroll planning.",
      "Estimates 13th month pay and presents an exportable breakdown of the results.",
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
    company: "Academic and Independent Projects",
    role: "Full-Stack Developer",
    period: "Ongoing",
    location: "Manila, Philippines",
    description:
      "Developed practical software projects for academic and independent work, including a 360-degree evaluation system with automated reporting and NLP-assisted feedback analysis.",
    achievements: [
      "Built a role-based evaluation platform that collects feedback from peers, supervisors, and subordinates.",
      "Implemented dashboards for evaluation progress, completion rates, feedback summaries, and generated reports.",
      "Connected a Laravel and Livewire application with a Python NLP service for written feedback analysis.",
      "Worked across development, testing, documentation, and project presentation responsibilities.",
    ],
    technologies: [
      "Laravel",
      "Livewire",
      "Tailwind CSS",
      "Alpine.js",
      "Flask",
      "Python",
    ],
  },
  {
    company: "Personal Software Development",
    role: "Frontend Developer and Tool Builder",
    period: "Ongoing",
    location: "Independent",
    description:
      "Building web applications, developer tools, and open-source projects that combine practical workflows with focused interface design.",
    achievements: [
      "Created Payday Splitter, a responsive payroll and budgeting calculator based on Philippine statutory deductions.",
      "Published Agent Memory Vault, a zero-dependency NPM package for persistent local memory in AI coding workflows.",
      "Built responsive interfaces with attention to typography, accessibility, mobile layouts, and clear information hierarchy.",
      "Maintained project documentation, screenshots, deployment links, and source repositories for independent work.",
    ],
    technologies: [
      "Vue 3",
      "TypeScript",
      "JavaScript",
      "HTML",
      "CSS",
      "Tailwind CSS",
      "Vercel",
      "NPM",
    ],
  },
  {
    company: "TESDA NC II Training",
    role: "Computer Systems Servicing Trainee",
    period: "Completed",
    location: "Philippines",
    description:
      "Completed practical training in computer systems servicing, with hands-on experience assembling, maintaining, and diagnosing desktop computer systems.",
    achievements: [
      "Assembled and disassembled desktop computer systems while following safe hardware handling procedures.",
      "Diagnosed common hardware and software issues using systematic troubleshooting steps.",
      "Installed and configured operating systems, drivers, and essential system software.",
      "Used common computer servicing tools for inspection, maintenance, replacement, and repair tasks.",
    ],
    technologies: [
      "Computer Hardware",
      "Diagnostics",
      "System Assembly",
      "OS Installation",
      "Preventive Maintenance",
    ],
  },
];

export const education: EducationItem[] = [
  {
    institution: "Global Reciprocal Colleges Caloocan",
    degree: "Bachelor of Science",
    field: "Information Technology",
    period: "2023 — 2027",
    location: "Manila, Philippines",
    description:
      "Pursuing Information Technology with a focus on web application development, interface design, and practical software engineering.",
    highlights: [
      "Developed a 360-degree evaluation system with automated reporting and NLP-assisted feedback analysis.",
      "Built practical web projects involving payroll planning, responsive interfaces, and data-driven workflows.",
      "Continuing to strengthen skills in frontend development, accessibility, and maintainable software architecture.",
    ],
  },
  {
    institution: "AMA Computer College Caloocan",
    strand: "Technical Vocational Livelihood",
    period: "2020 — 2022",
    location: "Manila, Philippines",
    description:
      "Completed the Technical Vocational Livelihood strand and developed an early foundation in computer use, problem solving, and technology-oriented work.",
  },
  {
    institution: "Potrero National High School",
    period: "2016 — 2020",
    location: "Manila, Philippines",
  },
  {
    institution: "Andres Bonifcatio Elementary School",
    period: "2010 — 2016",
    location: "Manila, Philippines",
  },
];

export const certifications: CertificationItem[] = [
  {
    title: "Computer Systems Servicing NC II",
    issuer: "TESDA",
    issueDate: "NC II Certificate",
    description:
      "National certification covering computer hardware servicing, system assembly, installation, configuration, maintenance, and basic troubleshooting.",
    skills: [
      "Computer Assembly",
      "Hardware Diagnostics",
      "Operating System Installation",
      "Preventive Maintenance",
    ],
    image: getCertificateImage("placeholder_image.png"),
  },
];

export const socials: SocialLink[] = [
  { label: "GitHub", href: "https://github.com/thehonored1ne" },
  { label: "LinkedIn", href: "https://linkedin.com/in/dionareglo" },
  { label: "Facebook", href: "https://www.facebook.com/dion.areglo.1" },
  { label: "Email", href: "mailto:dion.areglo1234@gmail.com" },
];
