import { motion, useReducedMotion } from "framer-motion";
import {
  FiArrowUpRight,
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
import { Link } from "react-router-dom";

/* ============================================================
   SKILL DATA
============================================================ */

const SKILL_CATEGORIES = [
  {
    id: "frontend",
    title: "Frontend Development",
    description:
      "Building responsive, accessible, and interactive interfaces with modern React architecture.",
    icon: FiCode,
    skills: [
      {
        name: "React.js",
        level: 92,
        description: "Component-based UI development",
      },
      {
        name: "JavaScript",
        level: 90,
        description: "Modern ES6+ application logic",
      },
      {
        name: "Tailwind CSS",
        level: 94,
        description: "Responsive utility-first styling",
      },
      {
        name: "DaisyUI",
        level: 90,
        description: "Semantic component styling",
      },
      {
        name: "React Router",
        level: 88,
        description: "Client-side routing",
      },
      {
        name: "Framer Motion",
        level: 84,
        description: "Modern UI animation",
      },
    ],
  },

  {
    id: "backend",
    title: "Backend Development",
    description:
      "Creating reliable APIs and server-side applications with clean architecture and maintainable code.",
    icon: FiServer,
    skills: [
      {
        name: "Node.js",
        level: 88,
        description: "Server-side JavaScript",
      },
      {
        name: "Express.js",
        level: 90,
        description: "REST API development",
      },
      {
        name: "REST API",
        level: 90,
        description: "Structured API architecture",
      },
      {
        name: "MVC Architecture",
        level: 84,
        description: "Maintainable application structure",
      },
      {
        name: "JWT",
        level: 82,
        description: "Token-based authentication",
      },
      {
        name: "CORS",
        level: 86,
        description: "Secure cross-origin requests",
      },
    ],
  },

  {
    id: "database",
    title: "Database & Data",
    description:
      "Designing structured data solutions with MongoDB for reliable and scalable applications.",
    icon: FiDatabase,
    skills: [
      {
        name: "MongoDB",
        level: 88,
        description: "NoSQL database development",
      },
      {
        name: "MongoDB Atlas",
        level: 84,
        description: "Cloud database management",
      },
      {
        name: "Data Modeling",
        level: 82,
        description: "Application data architecture",
      },
      {
        name: "CRUD Operations",
        level: 92,
        description: "Complete data workflows",
      },
      {
        name: "Query Design",
        level: 82,
        description: "Efficient data retrieval",
      },
    ],
  },

  {
    id: "authentication",
    title: "Authentication & Security",
    description:
      "Implementing secure authentication and protected application flows for modern web applications.",
    icon: FiLock,
    skills: [
      {
        name: "Firebase Authentication",
        level: 86,
        description: "User authentication",
      },
      {
        name: "JWT Authentication",
        level: 82,
        description: "Secure token-based access",
      },
      {
        name: "Protected Routes",
        level: 88,
        description: "Authenticated application pages",
      },
      {
        name: "Authorization",
        level: 80,
        description: "User access control",
      },
    ],
  },
];

/* ============================================================
   DEVELOPMENT TOOLS
============================================================ */

const TOOLS = [
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

/* ============================================================
   CORE STACK
============================================================ */

const CORE_SKILLS = [
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

/* ============================================================
   WORKFLOW
============================================================ */

const WORKFLOW = [
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

/* ============================================================
   COMPONENT
============================================================ */

const Skills = () => {
  const shouldReduceMotion = useReducedMotion();

  /* ----------------------------------------------------------
     Shared reveal animation
  ---------------------------------------------------------- */

  const fadeUp = (delay = 0) => ({
    initial: shouldReduceMotion
      ? false
      : {
          opacity: 0,
          y: 28,
        },

    whileInView: {
      opacity: 1,
      y: 0,
    },

    viewport: {
      once: true,
      amount: 0.15,
    },

    transition: shouldReduceMotion
      ? {
          duration: 0,
        }
      : {
          duration: 0.65,
          delay,
          ease: [0.22, 1, 0.36, 1],
        },
  });

  return (
    <main
      id="skills"
      className="relative isolate overflow-hidden bg-base-100 text-base-content"
    >
      {/* ======================================================
          BACKGROUND
      ======================================================= */}

      <div
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        aria-hidden="true"
      >
        {/* Primary Glow */}

        <motion.div
          animate={
            shouldReduceMotion
              ? undefined
              : {
                  x: [0, 35, 0],
                  y: [0, -20, 0],
                  scale: [1, 1.06, 1],
                }
          }
          transition={
            shouldReduceMotion
              ? undefined
              : {
                  duration: 14,
                  repeat: Infinity,
                  ease: "easeInOut",
                }
          }
          className="
            absolute
            left-1/2
            top-[-180px]
            h-[380px]
            w-[380px]
            -translate-x-1/2
            rounded-full
            bg-primary/7
            blur-3xl
            sm:h-[520px]
            sm:w-[520px]
            lg:left-[65%]
            lg:top-[-100px]
            lg:h-[650px]
            lg:w-[650px]
          "
        />

        {/* Secondary Glow */}

        <motion.div
          animate={
            shouldReduceMotion
              ? undefined
              : {
                  x: [0, -25, 0],
                  y: [0, 25, 0],
                }
          }
          transition={
            shouldReduceMotion
              ? undefined
              : {
                  duration: 16,
                  repeat: Infinity,
                  ease: "easeInOut",
                }
          }
          className="
            absolute
            -bottom-40
            -left-40
            h-[340px]
            w-[340px]
            rounded-full
            bg-secondary/7
            blur-3xl
            sm:h-[480px]
            sm:w-[480px]
          "
        />

        {/* Accent Glow */}

        <div
          className="
            absolute
            right-[-100px]
            top-[45%]
            h-[280px]
            w-[280px]
            rounded-full
            bg-accent/5
            blur-3xl
            sm:h-[380px]
            sm:w-[380px]
          "
        />

        {/* Grid */}

        <div
          className="absolute inset-0 opacity-[0.022]"
          style={{
            backgroundImage:
              "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      {/* ======================================================
          MAIN CONTAINER
      ======================================================= */}

      <div
        className="
          mx-auto
          w-full
          max-w-7xl
          px-4
          py-20
          sm:px-6
          sm:py-24
          lg:px-8
          lg:py-32
        "
      >
        {/* ====================================================
            HEADER
        ===================================================== */}

        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            {...fadeUp(0)}
            className="
              mb-5
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-base-300
              bg-base-200/50
              px-3.5
              py-2
              font-mono
              text-[10px]
              font-semibold
              uppercase
              tracking-[0.18em]
              text-primary
              backdrop-blur-md
              sm:text-xs
            "
          >
            <FiTerminal />

            <span>Technical Skills</span>
          </motion.div>

          <motion.h1
            {...fadeUp(0.1)}
            className="
              text-balance
              text-4xl
              font-black
              leading-[1.05]
              tracking-[-0.045em]
              text-base-content
              sm:text-5xl
              md:text-6xl
              lg:text-7xl
            "
          >
            The stack behind
            <span
              className="
                block
                bg-gradient-to-r
                from-primary
                via-secondary
                to-accent
                bg-clip-text
                text-transparent
              "
            >
              the products I build.
            </span>
          </motion.h1>

          <motion.p
            {...fadeUp(0.2)}
            className="
              mx-auto
              mt-6
              max-w-2xl
              text-sm
              leading-7
              text-base-content/60
              sm:text-base
              sm:leading-8
              lg:text-lg
            "
          >
            A practical full-stack technology stack focused on creating
            responsive interfaces, reliable APIs, secure authentication,
            structured data, and maintainable software.
          </motion.p>
        </div>

        {/* ====================================================
            CORE SKILLS
        ===================================================== */}

        <motion.div
          {...fadeUp(0.25)}
          className="
            mx-auto
            mt-10
            flex
            max-w-5xl
            flex-wrap
            justify-center
            gap-2
            sm:mt-12
          "
        >
          {CORE_SKILLS.map((skill, index) => (
            <motion.span
              key={skill}
              initial={
                shouldReduceMotion
                  ? false
                  : {
                      opacity: 0,
                      scale: 0.9,
                    }
              }
              whileInView={{
                opacity: 1,
                scale: 1,
              }}
              viewport={{
                once: true,
              }}
              transition={
                shouldReduceMotion
                  ? {
                      duration: 0,
                    }
                  : {
                      duration: 0.4,
                      delay: index * 0.04,
                    }
              }
              className="
                rounded-full
                border
                border-base-300
                bg-base-200/50
                px-3.5
                py-2
                font-mono
                text-[11px]
                text-base-content/60
                backdrop-blur-sm
                transition-colors
                duration-200
                hover:border-primary/40
                hover:text-primary
                sm:px-4
                sm:text-xs
              "
            >
              {skill}
            </motion.span>
          ))}
        </motion.div>

        {/* ====================================================
            SKILL CATEGORIES
        ===================================================== */}

        <motion.div
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: shouldReduceMotion ? 0 : 0.08,
              },
            },
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.05,
          }}
          className="
            mt-14
            grid
            gap-5
            sm:mt-16
            md:grid-cols-2
            xl:grid-cols-4
          "
        >
          {SKILL_CATEGORIES.map((category) => {
            const Icon = category.icon;

            return (
              <motion.article
                key={category.id}
                variants={{
                  hidden: shouldReduceMotion
                    ? {}
                    : {
                        opacity: 0,
                        y: 30,
                      },

                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: shouldReduceMotion
                      ? {
                          duration: 0,
                        }
                      : {
                          duration: 0.6,
                          ease: [0.22, 1, 0.36, 1],
                        },
                  },
                }}
                whileHover={
                  shouldReduceMotion
                    ? undefined
                    : {
                        y: -5,
                      }
                }
                className="
                  group
                  relative
                  overflow-hidden
                  rounded-3xl
                  border
                  border-base-300
                  bg-base-100/70
                  p-5
                  shadow-sm
                  backdrop-blur-md
                  transition-all
                  duration-300
                  hover:border-primary/25
                  hover:shadow-xl
                  hover:shadow-primary/5
                  sm:p-6
                "
              >
                {/* Top Accent */}

                <div
                  className="
                    absolute
                    left-0
                    right-0
                    top-0
                    h-px
                    bg-gradient-to-r
                    from-transparent
                    via-primary/50
                    to-transparent
                    opacity-0
                    transition-opacity
                    duration-300
                    group-hover:opacity-100
                  "
                  aria-hidden="true"
                />

                {/* Category Header */}

                <div className="flex items-start justify-between gap-4">
                  <div
                    className="
                      flex
                      h-12
                      w-12
                      shrink-0
                      items-center
                      justify-center
                      rounded-2xl
                      border
                      border-base-300
                      bg-base-200/60
                      text-primary
                      transition-all
                      duration-300
                      group-hover:border-primary/30
                      group-hover:bg-primary/10
                    "
                  >
                    <Icon className="text-xl" />
                  </div>

                  <span
                    className="
                      rounded-full
                      border
                      border-base-300
                      px-2.5
                      py-1
                      font-mono
                      text-[9px]
                      uppercase
                      tracking-wider
                      text-base-content/35
                    "
                  >
                    {category.skills.length} Skills
                  </span>
                </div>

                <h2
                  className="
                    mt-5
                    text-lg
                    font-bold
                    tracking-tight
                    text-base-content
                    sm:text-xl
                  "
                >
                  {category.title}
                </h2>

                <p
                  className="
                    mt-2.5
                    text-sm
                    leading-6
                    text-base-content/50
                  "
                >
                  {category.description}
                </p>

                {/* Skill Progress */}

                <div className="mt-7 space-y-5">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skill.name}>
                      <div className="mb-2 flex items-center justify-between gap-3">
                        <div className="flex min-w-0 items-center gap-2">
                          <FiCheckCircle
                            className="
                              shrink-0
                              text-xs
                              text-primary/70
                            "
                          />

                          <span
                            className="
                              truncate
                              text-xs
                              font-semibold
                              text-base-content/80
                              sm:text-sm
                            "
                          >
                            {skill.name}
                          </span>
                        </div>

                        <span
                          className="
                            shrink-0
                            font-mono
                            text-[10px]
                            text-base-content/35
                          "
                        >
                          {skill.level}%
                        </span>
                      </div>

                      <div
                        className="
                          h-1.5
                          overflow-hidden
                          rounded-full
                          bg-base-300
                        "
                        role="progressbar"
                        aria-label={`${skill.name} proficiency`}
                        aria-valuenow={skill.level}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      >
                        <motion.div
                          initial={
                            shouldReduceMotion
                              ? {
                                  width: `${skill.level}%`,
                                }
                              : {
                                  width: 0,
                                }
                          }
                          whileInView={{
                            width: `${skill.level}%`,
                          }}
                          viewport={{
                            once: true,
                            amount: 0.3,
                          }}
                          transition={
                            shouldReduceMotion
                              ? {
                                  duration: 0,
                                }
                              : {
                                  duration: 1,
                                  delay: 0.25 + skillIndex * 0.06,
                                  ease: [0.22, 1, 0.36, 1],
                                }
                          }
                          className="
                            h-full
                            rounded-full
                            bg-gradient-to-r
                            from-primary
                            via-secondary
                            to-accent
                          "
                        />
                      </div>

                      <p
                        className="
                          mt-1.5
                          text-[10px]
                          leading-4
                          text-base-content/35
                        "
                      >
                        {skill.description}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.article>
            );
          })}
        </motion.div>

        {/* ====================================================
            DEVELOPMENT TOOLKIT
        ===================================================== */}

        <section className="mt-20 sm:mt-24 lg:mt-28">
          <motion.div
            {...fadeUp(0)}
            className="
              mb-8
              flex
              flex-col
              gap-4
              sm:mb-10
              lg:flex-row
              lg:items-end
              lg:justify-between
            "
          >
            <div>
              <div className="mb-3 flex items-center gap-2">
                <span className="h-px w-8 bg-secondary" />

                <span
                  className="
                    font-mono
                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-[0.18em]
                    text-secondary
                    sm:text-xs
                  "
                >
                  Development Toolkit
                </span>
              </div>

              <h2
                className="
                  text-2xl
                  font-bold
                  tracking-tight
                  text-base-content
                  sm:text-3xl
                "
              >
                Tools behind the workflow.
              </h2>
            </div>

            <p
              className="
                max-w-md
                text-sm
                leading-6
                text-base-content/50
              "
            >
              Supporting tools that help keep development organized,
              collaborative, efficient, and production-ready.
            </p>
          </motion.div>

          <motion.div
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: shouldReduceMotion ? 0 : 0.06,
                },
              },
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.1,
            }}
            className="
              grid
              gap-3
              sm:grid-cols-2
              lg:grid-cols-4
            "
          >
            {TOOLS.map((tool) => {
              const Icon = tool.icon;

              return (
                <motion.div
                  key={tool.name}
                  variants={{
                    hidden: shouldReduceMotion
                      ? {}
                      : {
                          opacity: 0,
                          y: 20,
                        },

                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: shouldReduceMotion
                        ? {
                            duration: 0,
                          }
                        : {
                            duration: 0.5,
                            ease: [0.22, 1, 0.36, 1],
                          },
                    },
                  }}
                  whileHover={
                    shouldReduceMotion
                      ? undefined
                      : {
                          y: -3,
                        }
                  }
                  className="
                    group
                    flex
                    min-w-0
                    items-center
                    gap-3
                    rounded-2xl
                    border
                    border-base-300
                    bg-base-100/60
                    p-4
                    backdrop-blur-sm
                    transition-all
                    duration-300
                    hover:border-primary/30
                    hover:bg-base-200/30
                    sm:gap-4
                    sm:p-5
                  "
                >
                  <div
                    className="
                      flex
                      h-10
                      w-10
                      shrink-0
                      items-center
                      justify-center
                      rounded-xl
                      bg-base-200
                      text-base-content/60
                      transition-all
                      duration-300
                      group-hover:bg-primary/10
                      group-hover:text-primary
                      sm:h-11
                      sm:w-11
                    "
                  >
                    <Icon className="text-lg" />
                  </div>

                  <div className="min-w-0">
                    <h3
                      className="
                        truncate
                        text-sm
                        font-bold
                        text-base-content
                      "
                    >
                      {tool.name}
                    </h3>

                    <p
                      className="
                        mt-0.5
                        truncate
                        text-xs
                        text-base-content/40
                      "
                    >
                      {tool.description}
                    </p>
                  </div>

                  <FiArrowUpRight
                    className="
                      ml-auto
                      shrink-0
                      text-base-content/20
                      transition-all
                      duration-200
                      group-hover:-translate-y-0.5
                      group-hover:translate-x-0.5
                      group-hover:text-primary
                    "
                  />
                </motion.div>
              );
            })}
          </motion.div>
        </section>

        {/* ====================================================
            WORKFLOW
        ===================================================== */}

        <section className="mt-20 sm:mt-24 lg:mt-28">
          <div
            className="
              grid
              gap-10
              lg:grid-cols-[0.75fr_1.25fr]
              lg:gap-16
          "
          >
            {/* Workflow Intro */}

            <motion.div
              {...fadeUp(0)}
              className="lg:sticky lg:top-28 lg:self-start"
            >
              <div className="mb-3 flex items-center gap-2">
                <span className="h-px w-8 bg-accent" />

                <span
                  className="
                    font-mono
                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-[0.18em]
                    text-accent
                    sm:text-xs
                  "
                >
                  Engineering Workflow
                </span>
              </div>

              <h2
                className="
                  text-3xl
                  font-black
                  tracking-[-0.035em]
                  text-base-content
                  sm:text-4xl
                "
              >
                More than
                <span className="block text-base-content/40">
                  just writing code.
                </span>
              </h2>

              <p
                className="
                  mt-5
                  max-w-md
                  text-sm
                  leading-7
                  text-base-content/55
                  sm:text-base
                "
              >
                I approach development as an engineering process: understand the
                problem, design the architecture, build the solution, and
                continuously improve the final product.
              </p>
            </motion.div>

            {/* Workflow Steps */}

            <motion.div
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: shouldReduceMotion ? 0 : 0.08,
                  },
                },
              }}
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: true,
                amount: 0.1,
              }}
              className="relative"
            >
              {/* Timeline */}

              <div
                className="
                  absolute
                  bottom-6
                  left-[17px]
                  top-6
                  w-px
                  bg-base-300
                  sm:left-[23px]
                "
                aria-hidden="true"
              />

              <div className="space-y-4">
                {WORKFLOW.map((step) => (
                  <motion.article
                    key={step.number}
                    variants={{
                      hidden: shouldReduceMotion
                        ? {}
                        : {
                            opacity: 0,
                            x: 20,
                          },

                      visible: {
                        opacity: 1,
                        x: 0,
                        transition: shouldReduceMotion
                          ? {
                              duration: 0,
                            }
                          : {
                              duration: 0.6,
                              ease: [0.22, 1, 0.36, 1],
                            },
                      },
                    }}
                    className="
                      relative
                      rounded-3xl
                      border
                      border-base-300
                      bg-base-200/30
                      p-5
                      pl-12
                      sm:p-7
                      sm:pl-16
                    "
                  >
                    {/* Timeline Point */}

                    <div
                      className="
                        absolute
                        left-[11px]
                        top-7
                        h-3
                        w-3
                        rounded-full
                        bg-primary
                        ring-4
                        ring-base-100
                        sm:left-[18px]
                      "
                      aria-hidden="true"
                    />

                    <div className="flex items-start justify-between gap-5">
                      <div>
                        <span
                          className="
                            font-mono
                            text-[10px]
                            font-semibold
                            uppercase
                            tracking-[0.16em]
                            text-primary
                          "
                        >
                          Step {step.number}
                        </span>

                        <h3
                          className="
                            mt-2
                            text-lg
                            font-bold
                            text-base-content
                            sm:text-xl
                          "
                        >
                          {step.title}
                        </h3>
                      </div>

                      <span
                        className="
                          hidden
                          font-mono
                          text-3xl
                          font-black
                          text-base-content/5
                          sm:block
                        "
                      >
                        {step.number}
                      </span>
                    </div>

                    <p
                      className="
                        mt-3
                        text-sm
                        leading-6
                        text-base-content/50
                      "
                    >
                      {step.description}
                    </p>
                  </motion.article>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ====================================================
            BOTTOM CTA
        ===================================================== */}

        <motion.section
          {...fadeUp(0.2)}
          className="
            relative
            mt-20
            overflow-hidden
            rounded-[1.5rem]
            border
            border-base-300
            bg-base-200/30
            p-6
            text-center
            backdrop-blur-sm
            sm:mt-24
            sm:rounded-[2rem]
            sm:p-10
            lg:mt-28
            lg:p-14
          "
        >
          {/* Glow */}

          <div
            className="
              pointer-events-none
              absolute
              left-1/2
              top-[-120px]
              h-[260px]
              w-[260px]
              -translate-x-1/2
              rounded-full
              bg-primary/8
              blur-3xl
            "
            aria-hidden="true"
          />

          <div className="relative z-10">
            <div
              className="
                mx-auto
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-2xl
                border
                border-primary/20
                bg-primary/10
                text-primary
              "
            >
              <FiLayers className="text-xl" />
            </div>

            <h2
              className="
                mx-auto
                mt-5
                max-w-2xl
                text-2xl
                font-black
                tracking-[-0.03em]
                text-base-content
                sm:text-3xl
                lg:text-4xl
              "
            >
              Technology is the tool.
              <span className="block text-base-content/40">
                Problem solving is the skill.
              </span>
            </h2>

            <p
              className="
                mx-auto
                mt-4
                max-w-2xl
                text-sm
                leading-7
                text-base-content/50
                sm:text-base
              "
            >
              I choose technologies based on the problem, project requirements,
              maintainability, and user experience — not simply because they are
              popular.
            </p>

            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                to="/projects"
                className="
                  group
                  btn
                  btn-primary
                  h-12
                  min-h-12
                  rounded-xl
                  border-none
                  px-6
                  font-semibold
                  shadow-lg
                  shadow-primary/20
                "
              >
                <span>Explore My Projects</span>

                <FiArrowUpRight
                  className="
                    transition-transform
                    duration-200
                    group-hover:-translate-y-0.5
                    group-hover:translate-x-0.5
                  "
                />
              </Link>

              <Link
                to="/services"
                className="
                  btn
                  h-12
                  min-h-12
                  rounded-xl
                  border
                  border-base-300
                  bg-base-100
                  px-6
                  font-semibold
                  text-base-content
                  hover:border-primary/30
                  hover:text-primary
                "
              >
                View Services
              </Link>
            </div>
          </div>
        </motion.section>
      </div>
    </main>
  );
};

export default Skills;
