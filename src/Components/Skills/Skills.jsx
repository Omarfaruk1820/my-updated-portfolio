import { useQuery } from "@tanstack/react-query";
import { motion, useReducedMotion } from "framer-motion";
import {
  FiAlertCircle,
  FiArrowUpRight,
  FiCheckCircle,
  FiLayers,
  FiRefreshCw,
  FiTerminal,
} from "react-icons/fi";
import { Link } from "react-router-dom";

import { getSkills } from "../api/skillsApi";
import {
  CORE_SKILLS,
  SKILL_CATEGORIES,
  TOOLS,
  WORKFLOW,
} from "../Skills/skillData";

const Skills = () => {
  const shouldReduceMotion = useReducedMotion();

  const {
    data: skills = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["skills"],
    queryFn: getSkills,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 2,
  });

  /**
   * Merge static category metadata
   * with dynamic skills from MongoDB.
   */
  const categories = SKILL_CATEGORIES.map((category) => {
    const categorySkills = skills
      .filter(
        (skill) => skill.category === category.id && skill.isActive !== false,
      )
      .sort((a, b) => {
        const orderA = Number(a.order) || 0;
        const orderB = Number(b.order) || 0;

        if (orderA !== orderB) {
          return orderA - orderB;
        }

        return String(a.name || "").localeCompare(String(b.name || ""));
      });

    return {
      ...category,
      skills: categorySkills,
    };
  });

  const totalActiveSkills = categories.reduce(
    (total, category) => total + category.skills.length,
    0,
  );

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
      ? { duration: 0 }
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
      {/* =========================================================
          BACKGROUND
      ========================================================== */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        aria-hidden="true"
      >
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
          className="absolute left-1/2 top-[-180px] h-[380px] w-[380px] -translate-x-1/2 rounded-full bg-primary/7 blur-3xl sm:h-[520px] sm:w-[520px] lg:left-[65%] lg:top-[-100px] lg:h-[650px] lg:w-[650px]"
        />

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
          className="absolute -bottom-40 -left-40 h-[340px] w-[340px] rounded-full bg-secondary/7 blur-3xl sm:h-[480px] sm:w-[480px]"
        />

        <div className="absolute right-[-100px] top-[45%] h-[280px] w-[280px] rounded-full bg-accent/5 blur-3xl sm:h-[380px] sm:w-[380px]" />

        <div
          className="absolute inset-0 opacity-[0.022]"
          style={{
            backgroundImage:
              "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      <div className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
        {/* =========================================================
            HEADER
        ========================================================== */}
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            {...fadeUp(0)}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-base-300 bg-base-200/50 px-3.5 py-2 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-primary backdrop-blur-md sm:text-xs"
          >
            <FiTerminal />
            <span>Technical Skills</span>
          </motion.div>

          <motion.h1
            {...fadeUp(0.1)}
            className="text-balance text-4xl font-black leading-[1.05] tracking-[-0.045em] sm:text-5xl md:text-6xl lg:text-7xl"
          >
            The stack behind
            <span className="block bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              the products I build.
            </span>
          </motion.h1>

          <motion.p
            {...fadeUp(0.2)}
            className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-base-content/60 sm:text-base sm:leading-8 lg:text-lg"
          >
            A practical full-stack technology stack focused on creating
            responsive interfaces, reliable APIs, secure authentication,
            structured data, and maintainable software.
          </motion.p>
        </div>

        {/* =========================================================
            CORE SKILLS
        ========================================================== */}
        <motion.div
          {...fadeUp(0.25)}
          className="mx-auto mt-10 flex max-w-5xl flex-wrap justify-center gap-2 sm:mt-12"
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
                  ? { duration: 0 }
                  : {
                      duration: 0.4,
                      delay: index * 0.04,
                    }
              }
              className="rounded-full border border-base-300 bg-base-200/50 px-3.5 py-2 font-mono text-[11px] text-base-content/60 backdrop-blur-sm transition-colors duration-200 hover:border-primary/40 hover:text-primary sm:px-4 sm:text-xs"
            >
              {skill}
            </motion.span>
          ))}
        </motion.div>

        {/* =========================================================
            LOADING STATE
        ========================================================== */}
        {isLoading && (
          <section
            aria-live="polite"
            aria-label="Loading skills"
            className="mt-14 grid gap-5 sm:mt-16 md:grid-cols-2 xl:grid-cols-4"
          >
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="rounded-3xl border border-base-300 bg-base-100/70 p-5 shadow-sm sm:p-6"
              >
                <div className="h-12 w-12 animate-pulse rounded-2xl bg-base-300" />

                <div className="mt-5 h-5 w-3/4 animate-pulse rounded bg-base-300" />

                <div className="mt-3 h-10 animate-pulse rounded bg-base-300" />

                <div className="mt-7 space-y-5">
                  {Array.from({ length: 4 }).map((_, skillIndex) => (
                    <div key={skillIndex}>
                      <div className="h-4 animate-pulse rounded bg-base-300" />

                      <div className="mt-2 h-1.5 animate-pulse rounded bg-base-300" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </section>
        )}

        {/* =========================================================
            ERROR STATE
        ========================================================== */}
        {isError && !isLoading && (
          <section
            aria-live="assertive"
            className="mx-auto mt-14 max-w-xl rounded-3xl border border-error/20 bg-base-200/40 p-8 text-center"
          >
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-error/10 text-error">
              <FiAlertCircle className="text-xl" />
            </div>

            <h2 className="mt-5 text-xl font-bold">Unable to load skills</h2>

            <p className="mt-2 text-sm leading-6 text-base-content/50">
              {error?.message ||
                "Something went wrong while loading the technical skills."}
            </p>

            <button
              type="button"
              onClick={() => refetch()}
              className="btn btn-primary mt-6 rounded-xl"
            >
              <FiRefreshCw />
              Try Again
            </button>
          </section>
        )}

        {/* =========================================================
            EMPTY STATE
        ========================================================== */}
        {!isLoading && !isError && totalActiveSkills === 0 && (
          <section
            aria-live="polite"
            className="mx-auto mt-14 max-w-xl rounded-3xl border border-base-300 bg-base-200/40 p-8 text-center"
          >
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <FiLayers className="text-xl" />
            </div>

            <h2 className="mt-5 text-xl font-bold">No skills available</h2>

            <p className="mt-2 text-sm leading-6 text-base-content/50">
              Technical skills are currently unavailable. Please check back
              again soon.
            </p>
          </section>
        )}

        {/* =========================================================
            SKILL CATEGORIES
        ========================================================== */}
        {!isLoading && !isError && totalActiveSkills > 0 && (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.05,
            }}
            variants={{
              hidden: {},

              visible: {
                transition: {
                  staggerChildren: shouldReduceMotion ? 0 : 0.08,
                },
              },
            }}
            className="mt-14 grid gap-5 sm:mt-16 md:grid-cols-2 xl:grid-cols-4"
          >
            {categories.map((category) => {
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
                        ? { duration: 0 }
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
                  className="group relative overflow-hidden rounded-3xl border border-base-300 bg-base-100/70 p-5 shadow-sm backdrop-blur-md transition-all duration-300 hover:border-primary/25 hover:shadow-xl hover:shadow-primary/5 sm:p-6"
                >
                  {/* Top accent */}
                  <div
                    className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    aria-hidden="true"
                  />

                  {/* Category Icon + Count */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-base-300 bg-base-200/60 text-primary transition-all duration-300 group-hover:border-primary/30 group-hover:bg-primary/10">
                      <Icon className="text-xl" />
                    </div>

                    <span className="rounded-full border border-base-300 px-2.5 py-1 font-mono text-[9px] uppercase tracking-wider text-base-content/35">
                      {category.skills.length} Skills
                    </span>
                  </div>

                  {/* Category Information */}
                  <h2 className="mt-5 text-lg font-bold tracking-tight sm:text-xl">
                    {category.title}
                  </h2>

                  <p className="mt-2.5 text-sm leading-6 text-base-content/50">
                    {category.description}
                  </p>

                  {/* Skill Preview */}
                  {category.skills.length > 0 ? (
                    <div className="mt-7 space-y-5">
                      {category.skills.slice(0, 4).map((skill, skillIndex) => {
                        const level = Math.min(
                          Math.max(Number(skill.level) || 0, 0),
                          100,
                        );

                        return (
                          <div key={skill._id || skill.name}>
                            <div className="mb-2 flex items-center justify-between gap-3">
                              <div className="flex min-w-0 items-center gap-2">
                                <FiCheckCircle className="shrink-0 text-xs text-primary/70" />

                                <span className="truncate text-xs font-semibold text-base-content/80 sm:text-sm">
                                  {skill.name}
                                </span>
                              </div>

                              <span className="shrink-0 font-mono text-[10px] text-base-content/35">
                                {level}%
                              </span>
                            </div>

                            <div
                              className="h-1.5 overflow-hidden rounded-full bg-base-300"
                              role="progressbar"
                              aria-label={`${skill.name} proficiency`}
                              aria-valuenow={level}
                              aria-valuemin={0}
                              aria-valuemax={100}
                            >
                              <motion.div
                                initial={
                                  shouldReduceMotion
                                    ? {
                                        width: `${level}%`,
                                      }
                                    : {
                                        width: 0,
                                      }
                                }
                                whileInView={{
                                  width: `${level}%`,
                                }}
                                viewport={{
                                  once: true,
                                  amount: 0.3,
                                }}
                                transition={
                                  shouldReduceMotion
                                    ? { duration: 0 }
                                    : {
                                        duration: 1,
                                        delay: 0.25 + skillIndex * 0.06,
                                        ease: [0.22, 1, 0.36, 1],
                                      }
                                }
                                className="h-full rounded-full bg-gradient-to-r from-primary via-secondary to-accent"
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="mt-7 rounded-xl bg-base-200/50 p-4 text-xs text-base-content/45">
                      No active skills are currently available in this category.
                    </p>
                  )}

                  {/* Correct Dynamic Route */}
                  <Link
                    to={`/skills/${category.id}`}
                    className="group/link mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary"
                  >
                    Explore category
                    <FiArrowUpRight className="transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
                  </Link>
                </motion.article>
              );
            })}
          </motion.div>
        )}

        {/* =========================================================
            TOOLKIT
        ========================================================== */}
        <section className="mt-20 sm:mt-24 lg:mt-28">
          <motion.div
            {...fadeUp(0)}
            className="mb-8 flex flex-col gap-4 sm:mb-10 lg:flex-row lg:items-end lg:justify-between"
          >
            <div>
              <div className="mb-3 flex items-center gap-2">
                <span className="h-px w-8 bg-secondary" />

                <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-secondary sm:text-xs">
                  Development Toolkit
                </span>
              </div>

              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Tools behind the workflow.
              </h2>
            </div>

            <p className="max-w-md text-sm leading-6 text-base-content/50">
              Supporting tools that help keep development organized,
              collaborative, efficient, and production-ready.
            </p>
          </motion.div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {TOOLS.map((tool) => {
              const Icon = tool.icon;

              return (
                <motion.div
                  key={tool.name}
                  {...fadeUp(0)}
                  whileHover={
                    shouldReduceMotion
                      ? undefined
                      : {
                          y: -3,
                        }
                  }
                  className="group flex min-w-0 items-center gap-3 rounded-2xl border border-base-300 bg-base-100/60 p-4 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 sm:gap-4 sm:p-5"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-base-200 text-base-content/60 transition-all duration-300 group-hover:bg-primary/10 group-hover:text-primary sm:h-11 sm:w-11">
                    <Icon className="text-lg" />
                  </div>

                  <div className="min-w-0">
                    <h3 className="truncate text-sm font-bold">{tool.name}</h3>

                    <p className="mt-0.5 truncate text-xs text-base-content/40">
                      {tool.description}
                    </p>
                  </div>

                  <FiArrowUpRight className="ml-auto shrink-0 text-base-content/20 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* =========================================================
            WORKFLOW
        ========================================================== */}
        <section className="mt-20 sm:mt-24 lg:mt-28">
          <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
            <motion.div
              {...fadeUp(0)}
              className="lg:sticky lg:top-28 lg:self-start"
            >
              <div className="mb-3 flex items-center gap-2">
                <span className="h-px w-8 bg-accent" />

                <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-accent sm:text-xs">
                  Engineering Workflow
                </span>
              </div>

              <h2 className="text-3xl font-black tracking-[-0.035em] sm:text-4xl">
                More than
                <span className="block text-base-content/40">
                  just writing code.
                </span>
              </h2>

              <p className="mt-5 max-w-md text-sm leading-7 text-base-content/55 sm:text-base">
                I approach development as an engineering process: understand the
                problem, design the architecture, build the solution, and
                continuously improve the final product.
              </p>
            </motion.div>

            <div className="relative">
              <div
                className="absolute bottom-6 left-[17px] top-6 w-px bg-base-300 sm:left-[23px]"
                aria-hidden="true"
              />

              <div className="space-y-4">
                {WORKFLOW.map((step) => (
                  <motion.article
                    key={step.number}
                    {...fadeUp(0)}
                    className="relative rounded-3xl border border-base-300 bg-base-200/30 p-5 pl-12 sm:p-7 sm:pl-16"
                  >
                    <div
                      className="absolute left-[11px] top-7 h-3 w-3 rounded-full bg-primary ring-4 ring-base-100 sm:left-[18px]"
                      aria-hidden="true"
                    />

                    <div className="flex items-start justify-between gap-5">
                      <div>
                        <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-primary">
                          Step {step.number}
                        </span>

                        <h3 className="mt-2 text-lg font-bold sm:text-xl">
                          {step.title}
                        </h3>
                      </div>

                      <span className="hidden font-mono text-3xl font-black text-base-content/5 sm:block">
                        {step.number}
                      </span>
                    </div>

                    <p className="mt-3 text-sm leading-6 text-base-content/50">
                      {step.description}
                    </p>
                  </motion.article>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            CTA
        ========================================================== */}
        <motion.section
          {...fadeUp(0.2)}
          className="relative mt-20 overflow-hidden rounded-[1.5rem] border border-base-300 bg-base-200/30 p-6 text-center backdrop-blur-sm sm:mt-24 sm:rounded-[2rem] sm:p-10 lg:mt-28 lg:p-14"
        >
          <div
            className="pointer-events-none absolute left-1/2 top-[-120px] h-[260px] w-[260px] -translate-x-1/2 rounded-full bg-primary/8 blur-3xl"
            aria-hidden="true"
          />

          <div className="relative z-10">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary">
              <FiLayers className="text-xl" />
            </div>

            <h2 className="mx-auto mt-5 max-w-2xl text-2xl font-black tracking-[-0.03em] sm:text-3xl lg:text-4xl">
              Technology is the tool.
              <span className="block text-base-content/40">
                Problem solving is the skill.
              </span>
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-base-content/50 sm:text-base">
              I choose technologies based on the problem, project requirements,
              maintainability, and user experience.
            </p>

            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                to="/projects"
                className="btn btn-primary h-12 min-h-12 rounded-xl border-none px-6 font-semibold shadow-lg shadow-primary/20"
              >
                Explore My Projects
                <FiArrowUpRight />
              </Link>

              <Link
                to="/services"
                className="btn h-12 min-h-12 rounded-xl border border-base-300 bg-base-100 px-6 font-semibold hover:border-primary/30 hover:text-primary"
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
