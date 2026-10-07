import { useQuery } from "@tanstack/react-query";
import { motion, useReducedMotion } from "framer-motion";
import {
  FiAlertCircle,
  FiArrowLeft,
  FiArrowUpRight,
  FiCheckCircle,
  FiCode,
  FiLayers,
  FiRefreshCw,
  FiTerminal,
} from "react-icons/fi";
import { Link, useParams } from "react-router-dom";

import { getSkills } from "../api/skillsApi";
import {
  CORE_SKILLS,
  SKILL_CATEGORIES,
  TOOLS,
  WORKFLOW,
} from "../Skills/skillData";

const SkillsDetails = () => {
  const { id } = useParams();
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
   * Find the requested category from the static metadata.
   */
  const categoryMeta = SKILL_CATEGORIES.find((category) => category.id === id);

  /**
   * Filter MongoDB skills for the requested category.
   */
  const categorySkills = skills
    .filter((skill) => skill.category === id && skill.isActive !== false)
    .sort((a, b) => {
      const orderA = Number(a.order) || 0;
      const orderB = Number(b.order) || 0;

      if (orderA !== orderB) {
        return orderA - orderB;
      }

      return String(a.name || "").localeCompare(String(b.name || ""));
    });

  const fadeUp = (delay = 0) => ({
    initial: shouldReduceMotion
      ? false
      : {
          opacity: 0,
          y: 24,
        },

    whileInView: {
      opacity: 1,
      y: 0,
    },

    viewport: {
      once: true,
      amount: 0.1,
    },

    transition: shouldReduceMotion
      ? { duration: 0 }
      : {
          duration: 0.6,
          delay,
          ease: [0.22, 1, 0.36, 1],
        },
  });

  /**
   * Invalid category ID.
   */
  if (!categoryMeta && !isLoading) {
    return (
      <main className="min-h-screen bg-base-100 text-base-content">
        <div className="mx-auto flex min-h-screen w-full max-w-3xl items-center justify-center px-4 py-20 sm:px-6 lg:px-8">
          <section className="w-full rounded-3xl border border-base-300 bg-base-200/40 p-8 text-center sm:p-12">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-error/10 text-error">
              <FiAlertCircle className="text-2xl" />
            </div>

            <h1 className="mt-6 text-2xl font-black sm:text-3xl">
              Skill category not found
            </h1>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-base-content/50">
              The skill category you are looking for does not exist or the
              requested URL is invalid.
            </p>

            <Link to="/skills" className="btn btn-primary mt-7 rounded-xl">
              <FiArrowLeft />
              Back to Skills
            </Link>
          </section>
        </div>
      </main>
    );
  }

  const CategoryIcon = categoryMeta?.icon || FiCode;

  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-base-100 text-base-content">
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
                  x: [0, 30, 0],
                  y: [0, -25, 0],
                  scale: [1, 1.05, 1],
                }
          }
          transition={
            shouldReduceMotion
              ? undefined
              : {
                  duration: 15,
                  repeat: Infinity,
                  ease: "easeInOut",
                }
          }
          className="absolute left-1/2 top-[-180px] h-[380px] w-[380px] -translate-x-1/2 rounded-full bg-primary/8 blur-3xl sm:h-[550px] sm:w-[550px] lg:left-[70%] lg:h-[680px] lg:w-[680px]"
        />

        <motion.div
          animate={
            shouldReduceMotion
              ? undefined
              : {
                  x: [0, -25, 0],
                  y: [0, 20, 0],
                }
          }
          transition={
            shouldReduceMotion
              ? undefined
              : {
                  duration: 17,
                  repeat: Infinity,
                  ease: "easeInOut",
                }
          }
          className="absolute -bottom-40 -left-40 h-[380px] w-[380px] rounded-full bg-secondary/7 blur-3xl sm:h-[500px] sm:w-[500px]"
        />

        <div
          className="absolute inset-0 opacity-[0.022]"
          style={{
            backgroundImage:
              "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-28">
        {/* =========================================================
            BACK BUTTON
        ========================================================== */}
        <motion.div {...fadeUp(0)}>
          <Link
            to="/skills"
            className="inline-flex items-center gap-2 rounded-xl border border-base-300 bg-base-200/50 px-4 py-2.5 text-sm font-semibold text-base-content/70 transition-colors hover:border-primary/30 hover:text-primary"
          >
            <FiArrowLeft />
            Back to Skills
          </Link>
        </motion.div>

        {/* =========================================================
            CATEGORY HEADER
        ========================================================== */}
        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_0.7fr] lg:items-end">
          <div>
            <motion.div
              {...fadeUp(0.05)}
              className="mb-5 inline-flex items-center gap-2 rounded-full border border-base-300 bg-base-200/50 px-3.5 py-2 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-primary sm:text-xs"
            >
              <FiTerminal />
              Technical Profile
            </motion.div>

            <motion.div
              {...fadeUp(0.08)}
              className="mb-5 flex items-center gap-3"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-base-300 bg-base-200/60 text-primary">
                <CategoryIcon className="text-xl" />
              </div>

              <div>
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-primary">
                  Skill Category
                </p>

                <p className="mt-1 text-sm font-semibold text-base-content/50">
                  {categoryMeta?.shortTitle}
                </p>
              </div>
            </motion.div>

            <motion.h1
              {...fadeUp(0.1)}
              className="max-w-4xl text-4xl font-black leading-[1.05] tracking-[-0.045em] sm:text-5xl md:text-6xl lg:text-7xl"
            >
              {categoryMeta?.title}
            </motion.h1>

            <motion.p
              {...fadeUp(0.2)}
              className="mt-6 max-w-2xl text-sm leading-7 text-base-content/60 sm:text-base sm:leading-8"
            >
              {categoryMeta?.description}
            </motion.p>
          </div>

          {/* Core Stack Card */}
          <motion.div
            {...fadeUp(0.25)}
            className="rounded-3xl border border-base-300 bg-base-200/40 p-5 sm:p-6"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <FiLayers />
              </div>

              <div>
                <p className="text-xs uppercase tracking-wider text-base-content/40">
                  Core Stack
                </p>

                <p className="mt-1 text-lg font-bold">MERN + Modern Frontend</p>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {CORE_SKILLS.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-base-300 bg-base-100 px-3 py-1.5 font-mono text-[10px] text-base-content/60 sm:text-xs"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* =========================================================
            CATEGORY NAVIGATION
        ========================================================== */}
        <motion.nav
          {...fadeUp(0.3)}
          aria-label="Skill categories"
          className="mt-12 flex gap-2 overflow-x-auto pb-2 scrollbar-thin"
        >
          {SKILL_CATEGORIES.map((category) => (
            <Link
              key={category.id}
              to={`/skills/${category.id}`}
              className={`shrink-0 rounded-full border px-4 py-2.5 text-xs font-semibold transition-colors sm:text-sm ${
                category.id === id
                  ? "border-primary/30 bg-primary/10 text-primary"
                  : "border-base-300 bg-base-200/50 text-base-content/60 hover:border-primary/30 hover:text-primary"
              }`}
            >
              {category.shortTitle}
            </Link>
          ))}
        </motion.nav>

        {/* =========================================================
            LOADING
        ========================================================== */}
        {isLoading && (
          <section
            aria-live="polite"
            aria-label="Loading skills"
            className="mt-10"
          >
            <div className="overflow-hidden rounded-[1.5rem] border border-base-300 bg-base-200/30 sm:rounded-[2rem]">
              <div className="border-b border-base-300 p-5 sm:p-7 lg:p-8">
                <div className="h-14 w-14 animate-pulse rounded-2xl bg-base-300" />

                <div className="mt-5 h-7 w-64 animate-pulse rounded bg-base-300" />

                <div className="mt-3 h-5 max-w-2xl animate-pulse rounded bg-base-300" />
              </div>

              <div className="grid gap-4 p-5 sm:grid-cols-2 sm:p-7 lg:grid-cols-3 lg:p-8">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div
                    key={index}
                    className="rounded-2xl border border-base-300 bg-base-100/70 p-5"
                  >
                    <div className="h-5 animate-pulse rounded bg-base-300" />

                    <div className="mt-4 h-1.5 animate-pulse rounded bg-base-300" />

                    <div className="mt-4 h-12 animate-pulse rounded bg-base-300" />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* =========================================================
            ERROR
        ========================================================== */}
        {isError && !isLoading && (
          <section
            aria-live="assertive"
            className="mx-auto mt-10 max-w-xl rounded-3xl border border-error/20 bg-base-200/40 p-8 text-center"
          >
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-error/10 text-error">
              <FiAlertCircle className="text-xl" />
            </div>

            <h2 className="mt-5 text-xl font-bold">
              Unable to load technical skills
            </h2>

            <p className="mt-2 text-sm leading-6 text-base-content/50">
              {error?.message ||
                "Something went wrong while loading the skills."}
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
            CATEGORY SKILLS
        ========================================================== */}
        {!isLoading && !isError && (
          <>
            <motion.section
              {...fadeUp(0.1)}
              className="mt-10 overflow-hidden rounded-[1.5rem] border border-base-300 bg-base-200/30 sm:rounded-[2rem]"
            >
              {/* Category Header */}
              <div className="border-b border-base-300 p-5 sm:p-7 lg:p-8">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-base-300 bg-base-100 text-primary sm:h-14 sm:w-14">
                      <CategoryIcon className="text-xl sm:text-2xl" />
                    </div>

                    <div>
                      <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-primary">
                        Technical Expertise
                      </p>

                      <h2 className="mt-1.5 text-2xl font-black tracking-tight sm:text-3xl">
                        {categoryMeta.title}
                      </h2>

                      <p className="mt-2 max-w-2xl text-sm leading-6 text-base-content/55">
                        {categoryMeta.description}
                      </p>
                    </div>
                  </div>

                  <span className="w-fit shrink-0 rounded-full border border-base-300 bg-base-100 px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-base-content/40">
                    {categorySkills.length} Technologies
                  </span>
                </div>
              </div>

              {/* Skills Grid */}
              {categorySkills.length > 0 ? (
                <div className="grid gap-4 p-5 sm:grid-cols-2 sm:p-7 lg:grid-cols-3 lg:p-8">
                  {categorySkills.map((skill, skillIndex) => {
                    const level = Math.min(
                      Math.max(Number(skill.level) || 0, 0),
                      100,
                    );

                    return (
                      <motion.article
                        key={skill._id || skill.name}
                        initial={
                          shouldReduceMotion
                            ? false
                            : {
                                opacity: 0,
                                y: 18,
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
                            ? { duration: 0 }
                            : {
                                duration: 0.5,
                                delay: skillIndex * 0.04,
                                ease: [0.22, 1, 0.36, 1],
                              }
                        }
                        className="group rounded-2xl border border-base-300 bg-base-100/70 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
                      >
                        {/* Skill Title */}
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex min-w-0 items-center gap-2">
                            <FiCheckCircle className="shrink-0 text-primary" />

                            <h3 className="truncate text-sm font-bold sm:text-base">
                              {skill.name}
                            </h3>
                          </div>

                          <span className="shrink-0 font-mono text-[10px] text-base-content/35">
                            {level}%
                          </span>
                        </div>

                        {/* Progress */}
                        <div
                          className="mt-4 h-1.5 overflow-hidden rounded-full bg-base-300"
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
                            }}
                            transition={
                              shouldReduceMotion
                                ? { duration: 0 }
                                : {
                                    duration: 0.9,
                                    delay: 0.15,
                                    ease: [0.22, 1, 0.36, 1],
                                  }
                            }
                            className="h-full rounded-full bg-gradient-to-r from-primary via-secondary to-accent"
                          />
                        </div>

                        {/* Experience */}
                        {skill.experience && (
                          <p className="mt-4 text-xs leading-5 text-base-content/50">
                            {skill.experience}
                          </p>
                        )}

                        {/* Focus Areas */}
                        {Array.isArray(skill.focus) &&
                          skill.focus.length > 0 && (
                            <div className="mt-4">
                              <p className="text-[10px] font-bold uppercase tracking-wider text-base-content/35">
                                Focus Areas
                              </p>

                              <div className="mt-2 flex flex-wrap gap-1.5">
                                {skill.focus.map((item) => (
                                  <span
                                    key={`${skill._id || skill.name}-${item}`}
                                    className="rounded-full border border-base-300 bg-base-200/50 px-2.5 py-1 text-[10px] text-base-content/50"
                                  >
                                    {item}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                      </motion.article>
                    );
                  })}
                </div>
              ) : (
                <div className="p-6 sm:p-8">
                  <div className="rounded-2xl bg-base-100/60 p-6 text-center">
                    <FiLayers className="mx-auto text-2xl text-base-content/30" />

                    <p className="mt-3 text-sm font-semibold text-base-content/60">
                      No active skills in this category.
                    </p>

                    <p className="mt-1 text-xs leading-5 text-base-content/40">
                      This category currently does not have any active skills.
                    </p>
                  </div>
                </div>
              )}
            </motion.section>

            {/* =====================================================
                TOOLKIT
            ====================================================== */}
            <motion.section
              {...fadeUp(0.1)}
              className="mt-20 sm:mt-24 lg:mt-28"
            >
              <div className="mb-8">
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-secondary sm:text-xs">
                  Development Toolkit
                </p>

                <h2 className="mt-2 text-2xl font-black tracking-tight sm:text-3xl">
                  Supporting tools I use.
                </h2>

                <p className="mt-3 max-w-2xl text-sm leading-6 text-base-content/50">
                  These tools support the development process from API
                  communication and authentication to source control, forms,
                  notifications, and server-state management.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {TOOLS.map((tool) => {
                  const Icon = tool.icon;

                  return (
                    <motion.div
                      key={tool.name}
                      whileHover={
                        shouldReduceMotion
                          ? undefined
                          : {
                              y: -3,
                            }
                      }
                      className="group flex items-center gap-4 rounded-2xl border border-base-300 bg-base-200/30 p-4 transition-all duration-300 hover:border-primary/30 sm:p-5"
                    >
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-base-100 text-base-content/60 transition-colors duration-300 group-hover:bg-primary/10 group-hover:text-primary">
                        <Icon />
                      </div>

                      <div className="min-w-0">
                        <h3 className="truncate text-sm font-bold">
                          {tool.name}
                        </h3>

                        <p className="mt-1 truncate text-xs text-base-content/40">
                          {tool.description}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.section>

            {/* =====================================================
                WORKFLOW
            ====================================================== */}
            <motion.section
              {...fadeUp(0.1)}
              className="mt-20 sm:mt-24 lg:mt-28"
            >
              <div className="grid gap-8 lg:grid-cols-2 lg:gap-14">
                <div>
                  <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-accent sm:text-xs">
                    Engineering Workflow
                  </p>

                  <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">
                    How I apply these skills.
                  </h2>

                  <p className="mt-4 max-w-xl text-sm leading-7 text-base-content/55 sm:text-base">
                    Technology is only valuable when it helps solve a real
                    problem. My workflow combines architecture, implementation,
                    integration, and continuous improvement.
                  </p>
                </div>

                <div className="space-y-3">
                  {WORKFLOW.map((step) => (
                    <div
                      key={step.number}
                      className="rounded-2xl border border-base-300 bg-base-200/30 p-5 sm:p-6"
                    >
                      <div className="flex items-start gap-4">
                        <span className="font-mono text-xs font-bold text-primary">
                          {step.number}
                        </span>

                        <div>
                          <h3 className="font-bold">{step.title}</h3>

                          <p className="mt-2 text-sm leading-6 text-base-content/50">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.section>

            {/* =====================================================
                CTA
            ====================================================== */}
            <motion.section
              {...fadeUp(0.1)}
              className="mt-20 overflow-hidden rounded-[1.5rem] border border-base-300 bg-base-200/30 p-6 text-center sm:mt-24 sm:rounded-[2rem] sm:p-10 lg:mt-28 lg:p-14"
            >
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <FiCode />
              </div>

              <h2 className="mx-auto mt-5 max-w-2xl text-2xl font-black sm:text-3xl">
                Looking for these skills in a real project?
              </h2>

              <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-base-content/50 sm:text-base">
                Explore the projects I&apos;ve built or get in touch to discuss
                your next web application.
              </p>

              <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
                <Link
                  to="/projects"
                  className="btn btn-primary h-12 min-h-12 rounded-xl px-6"
                >
                  View Projects
                  <FiArrowUpRight />
                </Link>

                <Link
                  to="/contact"
                  className="btn h-12 min-h-12 rounded-xl border border-base-300 bg-base-100 px-6 hover:border-primary/30 hover:text-primary"
                >
                  Contact Me
                </Link>
              </div>
            </motion.section>
          </>
        )}
      </div>
    </main>
  );
};

export default SkillsDetails;
