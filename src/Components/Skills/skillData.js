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

export const SKILL_CATEGORIES = [
  {
    id: "frontend",
    title: "Frontend Development",
    shortTitle: "Frontend",
    description:
      "Building responsive, accessible, and interactive interfaces with modern React architecture.",
    icon: FiCode,
    color: "primary",
    skills: [
      {
        name: "React.js",
        level: 92,
        description: "Component-based UI development",
        experience: "Building reusable component-driven interfaces and scalable React applications.",
        focus: [
          "Reusable components",
          "State-driven UI",
          "Component composition",
          "Responsive interfaces",
        ],
      },
      {
        name: "JavaScript",
        level: 90,
        description: "Modern ES6+ application logic",
        experience:
          "Writing modern JavaScript for application logic, data handling, asynchronous workflows, and UI behavior.",
        focus: [
          "ES6+ syntax",
          "Async programming",
          "Array methods",
          "DOM and application logic",
        ],
      },
      {
        name: "Tailwind CSS",
        level: 94,
        description: "Responsive utility-first styling",
        experience:
          "Creating consistent responsive interfaces using utility-first CSS and reusable design patterns.",
        focus: [
          "Responsive design",
          "Design systems",
          "Reusable utility patterns",
          "Mobile-first development",
        ],
      },
      {
        name: "DaisyUI",
        level: 90,
        description: "Semantic component styling",
        experience:
          "Using semantic UI components and theme-aware styling to build consistent interfaces efficiently.",
        focus: [
          "Semantic components",
          "Theme support",
          "Accessible UI patterns",
          "Component consistency",
        ],
      },
      {
        name: "React Router",
        level: 88,
        description: "Client-side routing",
        experience:
          "Building structured client-side navigation and route-based application experiences.",
        focus: [
          "Nested routes",
          "Dynamic routes",
          "Protected routes",
          "Navigation patterns",
        ],
      },
      {
        name: "Framer Motion",
        level: 84,
        description: "Modern UI animation",
        experience:
          "Adding purposeful animations and transitions without compromising usability or performance.",
        focus: [
          "Page transitions",
          "Scroll animations",
          "Micro interactions",
          "Reduced-motion support",
        ],
      },
    ],
  },

  {
    id: "backend",
    title: "Backend Development",
    shortTitle: "Backend",
    description:
      "Creating reliable APIs and server-side applications with clean architecture and maintainable code.",
    icon: FiServer,
    color: "secondary",
    skills: [
      {
        name: "Node.js",
        level: 88,
        description: "Server-side JavaScript",
        experience:
          "Developing server-side applications and API services using the Node.js runtime.",
        focus: [
          "Server-side JavaScript",
          "Asynchronous operations",
          "API services",
          "Application architecture",
        ],
      },
      {
        name: "Express.js",
        level: 90,
        description: "REST API development",
        experience:
          "Building structured REST APIs with middleware, validation, error handling, and clean route organization.",
        focus: [
          "REST APIs",
          "Middleware",
          "Route organization",
          "Error handling",
        ],
      },
      {
        name: "REST API",
        level: 90,
        description: "Structured API architecture",
        experience:
          "Designing predictable API endpoints for frontend and backend communication.",
        focus: [
          "HTTP methods",
          "Resource-based endpoints",
          "Status codes",
          "API integration",
        ],
      },
      {
        name: "MVC Architecture",
        level: 84,
        description: "Maintainable application structure",
        experience:
          "Separating application responsibilities to make backend projects easier to maintain and extend.",
        focus: [
          "Separation of concerns",
          "Controllers",
          "Routes",
          "Services and models",
        ],
      },
      {
        name: "JWT",
        level: 82,
        description: "Token-based authentication",
        experience:
          "Implementing token-based authentication flows for protected application resources.",
        focus: [
          "Token authentication",
          "Protected APIs",
          "Authorization",
          "Session flows",
        ],
      },
      {
        name: "CORS",
        level: 86,
        description: "Secure cross-origin requests",
        experience:
          "Configuring cross-origin access between frontend applications and backend APIs.",
        focus: [
          "Origin configuration",
          "Credentials",
          "HTTP methods",
          "API security configuration",
        ],
      },
    ],
  },

  {
    id: "database",
    title: "Database & Data",
    shortTitle: "Database",
    description:
      "Designing structured data solutions with MongoDB for reliable and scalable applications.",
    icon: FiDatabase,
    color: "accent",
    skills: [
      {
        name: "MongoDB",
        level: 88,
        description: "NoSQL database development",
        experience:
          "Designing and managing document-based data structures for full-stack applications.",
        focus: [
          "Collections",
          "Documents",
          "CRUD operations",
          "Data relationships",
        ],
      },
      {
        name: "MongoDB Atlas",
        level: 84,
        description: "Cloud database management",
        experience:
          "Working with cloud-hosted MongoDB environments for application development and deployment.",
        focus: [
          "Cloud databases",
          "Connection configuration",
          "Environment variables",
          "Database access",
        ],
      },
      {
        name: "Data Modeling",
        level: 82,
        description: "Application data architecture",
        experience:
          "Planning data structures based on application requirements and relationships.",
        focus: [
          "Document structure",
          "Relationships",
          "Indexes",
          "Data consistency",
        ],
      },
      {
        name: "CRUD Operations",
        level: 92,
        description: "Complete data workflows",
        experience:
          "Implementing complete create, read, update, and delete workflows through APIs.",
        focus: [
          "Create",
          "Read",
          "Update",
          "Delete",
        ],
      },
      {
        name: "Query Design",
        level: 82,
        description: "Efficient data retrieval",
        experience:
          "Writing structured database queries for practical application data retrieval.",
        focus: [
          "Filtering",
          "Sorting",
          "Pagination",
          "Query optimization",
        ],
      },
    ],
  },

  {
    id: "authentication",
    title: "Authentication & Security",
    shortTitle: "Security",
    description:
      "Implementing secure authentication and protected application flows for modern web applications.",
    icon: FiLock,
    color: "primary",
    skills: [
      {
        name: "Firebase Authentication",
        level: 86,
        description: "User authentication",
        experience:
          "Implementing user authentication flows with Firebase Authentication.",
        focus: [
          "Email authentication",
          "User sessions",
          "Authentication state",
          "Protected UI",
        ],
      },
      {
        name: "JWT Authentication",
        level: 82,
        description: "Secure token-based access",
        experience:
          "Using JWT-based flows to protect API resources and authenticated operations.",
        focus: [
          "Token generation",
          "Token verification",
          "Protected APIs",
          "Authorization",
        ],
      },
      {
        name: "Protected Routes",
        level: 88,
        description: "Authenticated application pages",
        experience:
          "Creating route-level access control for authenticated application experiences.",
        focus: [
          "Route guards",
          "Authentication state",
          "Redirect flows",
          "Private pages",
        ],
      },
      {
        name: "Authorization",
        level: 80,
        description: "User access control",
        experience:
          "Controlling access to application features based on authenticated user roles and permissions.",
        focus: [
          "Role-based access",
          "Permission checks",
          "Protected resources",
          "Access control",
        ],
      },
    ],
  },
];

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