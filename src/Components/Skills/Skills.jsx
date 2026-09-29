import { motion, useReducedMotion } from "framer-motion";
import {
  FiArrowUpRight,
  FiCheckCircle,
  FiCode,
  FiDatabase,
  FiGitBranch,
  FiGlobe,
  FiLayers,
  FiServer,
  FiSettings,
  FiTerminal,
  FiTool,
} from "react-icons/fi";

const SKILL_CATEGORIES = [
  {
    id: "frontend",
    title: "Frontend Development",
    description:
      "Building responsive, accessible, and interactive user interfaces with modern frontend technologies.",
    icon: FiCode,
    accent: "primary",
    skills: [
      {
        name: "React",
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
        name: "HTML5",
        level: 95,
        description: "Semantic and accessible markup",
      },
      {
        name: "CSS3",
        level: 90,
        description: "Modern layouts and animations",
      },
    ],
  },
  {
    id: "backend",
    title: "Backend Development",
    description:
      "Creating scalable APIs, server-side applications, and reliable backend architecture.",
    icon: FiServer,
    accent: "secondary",
    skills: [
      {
        name: "Node.js",
        level: 88,
        description: "Server-side JavaScript development",
      },
      {
        name: "Express.js",
        level: 90,
        description: "REST API and backend development",
      },
      {
        name: "REST API",
        level: 90,
        description: "Structured API architecture",
      },
      {
        name: "Authentication",
        level: 82,
        description: "Secure application authentication",
      },
    ],
  },
  {
    id: "database",
    title: "Database & Data",
    description:
      "Designing and working with application data using flexible and scalable database solutions.",
    icon: FiDatabase,
    accent: "accent",
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
        description: "Structured application data",
      },
    ],
  },
];

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
    name: "Vite",
    icon: FiTool,
    description: "Modern build tooling",
  },
  {
    name: "React Query",
    icon: FiLayers,
    description: "Server state management",
  },
  {
    name: "Axios",
    icon: FiTerminal,
    description: "HTTP client",
  },
];

const CORE_SKILLS = [
  "React",
  "JavaScript",
  "Node.js",
  "Express.js",
  "MongoDB",
  "REST API",
  "Tailwind CSS",
  "Git",
];

const Skills = () => {
  const shouldReduceMotion = useReducedMotion();

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
    <section
      id="skills"
      aria-labelledby="skills-title"
      className="
        relative
        isolate
        overflow-hidden
        bg-base-100
        py-20
        sm:py-24
        lg:py-32
      "
    >
      {/* =========================================================
          BACKGROUND
      ========================================================== */}
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

      {/* =========================================================
          MAIN CONTAINER
      ========================================================== */}
      <div
        className="
          mx-auto
          w-full
          max-w-7xl
          px-4
          sm:px-6
          lg:px-8
        "
      >
        {/* =======================================================
            SECTION HEADER
        ======================================================== */}
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            {...fadeUp(0)}
            className="
              mb-4
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
              text-xs
              font-semibold
              uppercase
              tracking-[0.18em]
              text-primary
              backdrop-blur-md
            "
          >
            <FiTerminal />

            <span>Technical Skills</span>
          </motion.div>

          <motion.h2
            id="skills-title"
            {...fadeUp(0.1)}
            className="
              text-balance
              text-3xl
              font-black
              leading-tight
              tracking-[-0.035em]
              text-base-content
              sm:text-4xl
              md:text-5xl
              lg:text-6xl
            "
          >
            Tools I use to{" "}
            <span
              className="
                bg-gradient-to-r
                from-primary
                via-secondary
                to-accent
                bg-clip-text
                text-transparent
              "
            >
              build products.
            </span>
          </motion.h2>

          <motion.p
            {...fadeUp(0.2)}
            className="
              mx-auto
              mt-5
              max-w-2xl
              text-base
              leading-7
              text-base-content/60
              sm:mt-6
              sm:text-lg
              sm:leading-8
            "
          >
            A practical technology stack focused on building modern, scalable,
            responsive, and maintainable web applications from frontend to
            backend.
          </motion.p>
        </div>

        {/* =======================================================
            CORE SKILLS STRIP
        ======================================================== */}
        <motion.div
          {...fadeUp(0.25)}
          className="
            mx-auto
            mt-10
            flex
            max-w-4xl
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
                      delay: index * 0.05,
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
                text-xs
                text-base-content/60
                backdrop-blur-sm
                transition-colors
                duration-200
                hover:border-primary/40
                hover:text-primary
                sm:px-4
              "
            >
              {skill}
            </motion.span>
          ))}
        </motion.div>

        {/* =======================================================
            SKILL CATEGORY CARDS
        ======================================================== */}
        <div className="mt-14 grid gap-5 lg:mt-20 lg:grid-cols-3">
          {SKILL_CATEGORIES.map((category, categoryIndex) => {
            const Icon = category.icon;

            return (
              <motion.article
                key={category.id}
                {...fadeUp(0.1 + categoryIndex * 0.1)}
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
                  rounded-[1.5rem]
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
                  lg:rounded-[2rem]
                "
              >
                {/* Card Accent */}
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

                {/* Header */}
                <div className="flex items-start justify-between gap-4">
                  <div
                    className="
                      flex
                      h-12
                      w-12
                      shrink-0
                      items-center
                      justify-center
                      rounded-xl
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

                <h3
                  className="
                    mt-5
                    text-xl
                    font-bold
                    tracking-tight
                    text-base-content
                  "
                >
                  {category.title}
                </h3>

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

                {/* Skill List */}
                <div className="mt-7 space-y-5">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skill.name}>
                      <div className="mb-2 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <FiCheckCircle
                            className="
                              shrink-0
                              text-xs
                              text-primary/70
                            "
                          />

                          <span
                            className="
                              text-sm
                              font-semibold
                              text-base-content/80
                            "
                          >
                            {skill.name}
                          </span>
                        </div>

                        <span
                          className="
                            font-mono
                            text-[10px]
                            text-base-content/35
                          "
                        >
                          {skill.level}%
                        </span>
                      </div>

                      {/* Progress */}
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
                        aria-valuemin="0"
                        aria-valuemax="100"
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
                                  delay:
                                    0.35 +
                                    categoryIndex * 0.08 +
                                    skillIndex * 0.06,
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

                      <p className="mt-1.5 text-[10px] text-base-content/35">
                        {skill.description}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* =======================================================
            DEVELOPMENT WORKFLOW
        ======================================================== */}
        <div className="mt-16 lg:mt-24">
          <motion.div
            {...fadeUp(0)}
            className="
              mb-8
              flex
              flex-col
              gap-3
              sm:mb-10
              sm:flex-row
              sm:items-end
              sm:justify-between
            "
          >
            <div>
              <div className="mb-3 flex items-center gap-2">
                <span className="h-px w-8 bg-secondary" />

                <span
                  className="
                    font-mono
                    text-xs
                    font-semibold
                    uppercase
                    tracking-[0.18em]
                    text-secondary
                  "
                >
                  Development Toolkit
                </span>
              </div>

              <h3
                className="
                  text-2xl
                  font-bold
                  tracking-tight
                  text-base-content
                  sm:text-3xl
                "
              >
                Tools behind the workflow.
              </h3>
            </div>

            <p
              className="
                max-w-md
                text-sm
                leading-6
                text-base-content/50
              "
            >
              Supporting tools that help keep development organized, efficient,
              and production-ready.
            </p>
          </motion.div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {TOOLS.map((tool, index) => {
              const Icon = tool.icon;

              return (
                <motion.div
                  key={tool.name}
                  initial={
                    shouldReduceMotion
                      ? false
                      : {
                          opacity: 0,
                          y: 20,
                        }
                  }
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.15,
                  }}
                  transition={
                    shouldReduceMotion
                      ? {
                          duration: 0,
                        }
                      : {
                          duration: 0.5,
                          delay: index * 0.07,
                        }
                  }
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
                    items-center
                    gap-4
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
                    sm:p-5
                  "
                >
                  <div
                    className="
                      flex
                      h-11
                      w-11
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
                    "
                  >
                    <Icon className="text-lg" />
                  </div>

                  <div className="min-w-0">
                    <h4
                      className="
                        truncate
                        text-sm
                        font-bold
                        text-base-content
                      "
                    >
                      {tool.name}
                    </h4>

                    <p className="mt-0.5 text-xs text-base-content/40">
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
          </div>
        </div>

        {/* =======================================================
            BOTTOM CTA / PHILOSOPHY
        ======================================================== */}
        <motion.div
          {...fadeUp(0.2)}
          className="
            relative
            mt-14
            overflow-hidden
            rounded-[1.5rem]
            border
            border-base-300
            bg-base-200/30
            p-6
            text-center
            backdrop-blur-sm
            sm:mt-16
            sm:rounded-[2rem]
            sm:p-9
            lg:mt-20
          "
        >
          {/* Decorative Glow */}
          <div
            className="
              pointer-events-none
              absolute
              left-1/2
              top-[-100px]
              h-[220px]
              w-[220px]
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
                rounded-xl
                border
                border-primary/20
                bg-primary/10
                text-primary
              "
            >
              <FiLayers className="text-xl" />
            </div>

            <h3
              className="
                mx-auto
                mt-5
                max-w-2xl
                text-xl
                font-bold
                tracking-tight
                text-base-content
                sm:text-2xl
              "
            >
              The right technology is only part of the solution.
            </h3>

            <p
              className="
                mx-auto
                mt-3
                max-w-2xl
                text-sm
                leading-6
                text-base-content/50
                sm:text-base
                sm:leading-7
              "
            >
              I focus on choosing practical technologies, writing maintainable
              code, and creating solutions that solve the actual problem instead
              of adding unnecessary complexity.
            </p>

            <motion.a
              href="#projects"
              whileHover={
                shouldReduceMotion
                  ? undefined
                  : {
                      y: -2,
                    }
              }
              whileTap={
                shouldReduceMotion
                  ? undefined
                  : {
                      scale: 0.98,
                    }
              }
              className="
                group
                mt-6
                inline-flex
                min-h-11
                items-center
                gap-2
                rounded-xl
                bg-primary
                px-5
                text-sm
                font-semibold
                text-primary-content
                shadow-lg
                shadow-primary/20
                transition-all
                duration-200
                hover:shadow-xl
                hover:shadow-primary/25
              "
            >
              <span>View My Projects</span>

              <FiArrowUpRight
                className="
                  text-base
                  transition-transform
                  duration-200
                  group-hover:-translate-y-0.5
                  group-hover:translate-x-0.5
                "
              />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
