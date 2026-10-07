import {
  FiCheckCircle,
  FiCode,
  FiDatabase,
  FiGitBranch,
  FiGlobe,
  FiLayers,
  FiLock,
  FiServer,
  FiSettings,
  FiTerminal,
  FiTool,
  FiZap,
} from "react-icons/fi";

/**
 * Static category metadata.
 *
 * Individual skills are now managed from MongoDB.
 * Do not store React components/icons inside MongoDB.
 */
export const SKILL_CATEGORIES = [
  {
    id: "frontend",
    title: "Frontend Development",
    shortTitle: "Frontend",
    description:
      "Building responsive, accessible, and interactive interfaces with modern React architecture.",
    icon: FiCode,
    color: "primary",
  },

  {
    id: "backend",
    title: "Backend Development",
    shortTitle: "Backend",
    description:
      "Creating reliable APIs and server-side applications with clean architecture and maintainable code.",
    icon: FiServer,
    color: "secondary",
  },

  {
    id: "database",
    title: "Database & Data",
    shortTitle: "Database",
    description:
      "Designing structured data solutions with MongoDB for reliable and scalable applications.",
    icon: FiDatabase,
    color: "accent",
  },

  {
    id: "authentication",
    title: "Authentication & Security",
    shortTitle: "Security",
    description:
      "Implementing secure authentication and protected application flows for modern web applications.",
    icon: FiLock,
    color: "primary",
  },
];

/**
 * Static development toolkit.
 */
export const TOOLS = [
  {
    name: "Git",
    icon: FiGitBranch,
    description: "Version control",
  },

  {
    name: "GitHub",
    icon: FiGlobe,
    description: "Code collaboration",
  },

  {
    name: "Firebase",
    icon: FiSettings,
    description: "Authentication & services",
  },

  {
    name: "Axios",
    icon: FiTerminal,
    description: "HTTP client",
  },

  {
    name: "TanStack Query",
    icon: FiLayers,
    description: "Server-state management",
  },

  {
    name: "React Hook Form",
    icon: FiCheckCircle,
    description: "Form management",
  },

  {
    name: "React Hot Toast",
    icon: FiZap,
    description: "User feedback",
  },

  {
    name: "Lottie React",
    icon: FiTool,
    description: "Interactive animations",
  },
];

/**
 * Static core stack.
 *
 * This is presentation content, not database-managed skill data.
 */
export const CORE_SKILLS = [
  "React.js",
  "JavaScript",
  "Node.js",
  "Express.js",
  "MongoDB",
  "REST API",
  "Tailwind CSS",
  "DaisyUI",
  "Firebase",
  "JWT",
  "Git",
  "GitHub",
];

/**
 * Static engineering workflow.
 */
export const WORKFLOW = [
  {
    number: "01",
    title: "Architecture",
    description:
      "Plan components, application structure, data flow, API boundaries, and database relationships before implementation.",
  },

  {
    number: "02",
    title: "Development",
    description:
      "Build reusable frontend components and reliable backend services using clean and maintainable code.",
  },

  {
    number: "03",
    title: "Integration",
    description:
      "Connect APIs, authentication, database operations, forms, server state, and third-party services.",
  },

  {
    number: "04",
    title: "Optimization",
    description:
      "Improve responsiveness, accessibility, loading states, error handling, performance, and overall user experience.",
  },
];
