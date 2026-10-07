import { motion, useReducedMotion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  FiArrowUpRight,
  FiCode,
  FiExternalLink,
  FiGithub,
  FiLayers,
  FiRefreshCw,
  FiServer,
} from "react-icons/fi";
import { Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

/* =========================================================
   API
========================================================= */

const fetchProjects = async () => {
  const response = await axios.get(`${API_URL}/api/projects`);

  if (!response.data?.success) {
    throw new Error(response.data?.message || "Failed to fetch projects.");
  }

  return Array.isArray(response.data?.data) ? response.data.data : [];
};

/* =========================================================
   COMPONENT
========================================================= */

const Projects = () => {
  const shouldReduceMotion = useReducedMotion();

  const {
    data: projects = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["projects"],
    queryFn: fetchProjects,
    staleTime: 1000 * 60 * 5,
    retry: 2,
  });

  /* =======================================================
     ANIMATION VARIANTS
  ======================================================= */

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.08,
      },
    },
  };

  const itemVariants = {
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
  };

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <section
      id="projects"
      aria-labelledby="projects-title"
      className="relative overflow-hidden bg-base-100 py-20 sm:py-24 lg:py-32"
    >
      {/* ===================================================
          BACKGROUND
      =================================================== */}

      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute -left-40 top-20 h-80 w-80 rounded-full bg-primary/5 blur-3xl sm:h-96 sm:w-96" />

        <div className="absolute -right-40 bottom-20 h-80 w-80 rounded-full bg-secondary/5 blur-3xl sm:h-96 sm:w-96" />

        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* =================================================
            SECTION HEADER
        ================================================= */}

        <motion.div
          initial={
            shouldReduceMotion
              ? false
              : {
                  opacity: 0,
                  y: 25,
                }
          }
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.2,
          }}
          transition={{
            duration: shouldReduceMotion ? 0 : 0.6,
          }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-base-300 bg-base-200/50 px-3.5 py-2 backdrop-blur-sm">
            <FiLayers className="text-primary" aria-hidden="true" />

            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-base-content/60">
              Selected Work
            </span>
          </div>

          <h2
            id="projects-title"
            className="text-balance text-3xl font-black tracking-[-0.035em] text-base-content sm:text-4xl md:text-5xl"
          >
            Projects I&apos;ve built
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              .
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-base-content/60 sm:text-base sm:leading-8">
            A selection of real-world applications focused on clean
            architecture, thoughtful user experience, scalability, and
            maintainable code.
          </p>
        </motion.div>

        {/* =================================================
            LOADING STATE
        ================================================= */}

        {isLoading && (
          <div
            className="mt-14 grid gap-6 lg:grid-cols-2"
            aria-label="Loading projects"
            aria-busy="true"
          >
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className={`overflow-hidden rounded-3xl border border-base-300 bg-base-200/40 ${
                  item === 1 ? "lg:col-span-2" : ""
                }`}
              >
                <div
                  className={`animate-pulse bg-base-300/50 ${
                    item === 1
                      ? "aspect-[16/8] sm:aspect-[16/7]"
                      : "aspect-[16/10]"
                  }`}
                />

                <div className="space-y-4 p-6">
                  <div className="h-5 w-2/3 animate-pulse rounded bg-base-300/60" />

                  <div className="h-4 w-full animate-pulse rounded bg-base-300/60" />

                  <div className="h-4 w-4/5 animate-pulse rounded bg-base-300/60" />

                  <div className="flex gap-2">
                    <div className="h-7 w-16 animate-pulse rounded bg-base-300/60" />
                    <div className="h-7 w-20 animate-pulse rounded bg-base-300/60" />
                    <div className="h-7 w-16 animate-pulse rounded bg-base-300/60" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* =================================================
            ERROR STATE
        ================================================= */}

        {isError && !isLoading && (
          <div
            className="mx-auto mt-14 max-w-lg rounded-3xl border border-error/20 bg-error/5 p-8 text-center"
            role="alert"
          >
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-error/10 text-error">
              <FiRefreshCw className="text-xl" aria-hidden="true" />
            </div>

            <h3 className="mt-5 text-lg font-bold text-base-content">
              Unable to load projects
            </h3>

            <p className="mt-2 text-sm leading-6 text-base-content/55">
              Something went wrong while loading the projects. Please try again.
            </p>

            <button
              type="button"
              onClick={() => refetch()}
              className="btn btn-primary mt-5 rounded-xl"
            >
              <FiRefreshCw aria-hidden="true" />
              Try Again
            </button>
          </div>
        )}

        {/* =================================================
            EMPTY STATE
        ================================================= */}

        {!isLoading && !isError && projects.length === 0 && (
          <div className="mx-auto mt-14 max-w-lg rounded-3xl border border-base-300 bg-base-200/40 p-10 text-center">
            <FiLayers
              className="mx-auto text-4xl text-base-content/30"
              aria-hidden="true"
            />

            <h3 className="mt-5 text-lg font-bold text-base-content">
              No projects available
            </h3>

            <p className="mt-2 text-sm text-base-content/50">
              Projects will appear here once they are added to the database.
            </p>
          </div>
        )}

        {/* =================================================
            PROJECTS GRID
        ================================================= */}

        {!isLoading && !isError && projects.length > 0 && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.08,
            }}
            className="mt-14 grid gap-6 lg:grid-cols-2"
          >
            {projects.map((project, index) => {
              const isFeaturedLayout = index === 0;

              return (
                <motion.article
                  key={project._id}
                  variants={itemVariants}
                  className={`group overflow-hidden rounded-3xl border border-base-300 bg-base-200/30 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-2xl hover:shadow-primary/5 ${
                    isFeaturedLayout ? "lg:col-span-2" : ""
                  }`}
                >
                  {/* =====================================
                        PROJECT IMAGE
                    ====================================== */}

                  <div
                    className={`relative overflow-hidden bg-base-300 ${
                      isFeaturedLayout
                        ? "aspect-[16/8] sm:aspect-[16/7]"
                        : "aspect-[16/10]"
                    }`}
                  >
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={`${project.title} project preview`}
                        className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                        loading={isFeaturedLayout ? "eager" : "lazy"}
                        decoding="async"
                      />
                    ) : (
                      <div
                        className="flex h-full w-full items-center justify-center"
                        aria-label="Project preview unavailable"
                      >
                        <FiCode
                          className="text-5xl text-base-content/20"
                          aria-hidden="true"
                        />
                      </div>
                    )}

                    <div
                      className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-70"
                      aria-hidden="true"
                    />

                    {/* Category */}

                    {project.category && (
                      <div className="absolute left-4 top-4">
                        <span className="rounded-full border border-white/20 bg-black/30 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-md">
                          {project.category}
                        </span>
                      </div>
                    )}

                    {/* Featured */}

                    {project.featured && (
                      <div className="absolute right-4 top-4">
                        <span className="rounded-full bg-primary px-3 py-1.5 text-xs font-semibold text-primary-content shadow-lg">
                          Featured
                        </span>
                      </div>
                    )}
                  </div>

                  {/* =====================================
                        PROJECT CONTENT
                    ====================================== */}

                  <div className="p-5 sm:p-6 lg:p-7">
                    <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                      <div className="min-w-0">
                        <h3 className="text-xl font-bold tracking-tight text-base-content transition-colors group-hover:text-primary sm:text-2xl">
                          {project.title}
                        </h3>

                        {project.shortDescription && (
                          <p className="mt-3 max-w-2xl text-sm leading-6 text-base-content/55 sm:text-[15px]">
                            {project.shortDescription}
                          </p>
                        )}
                      </div>

                      <Link
                        to={`/projects/${project._id}`}
                        className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-full border border-base-300 bg-base-100 text-base-content/60 transition-all duration-200 hover:border-primary/40 hover:bg-primary/5 hover:text-primary sm:flex"
                        aria-label={`View ${project.title} details`}
                      >
                        <FiArrowUpRight
                          className="text-lg"
                          aria-hidden="true"
                        />
                      </Link>
                    </div>

                    {/* Technologies */}

                    {Array.isArray(project.technologies) &&
                      project.technologies.length > 0 && (
                        <div className="mt-5 flex flex-wrap gap-2">
                          {project.technologies
                            .slice(0, 6)
                            .map((technology) => (
                              <span
                                key={technology}
                                className="rounded-lg border border-base-300 bg-base-100 px-2.5 py-1.5 font-mono text-[11px] text-base-content/55"
                              >
                                {technology}
                              </span>
                            ))}
                        </div>
                      )}

                    {/* Actions */}

                    <div className="mt-6 flex flex-wrap items-center gap-2.5 border-t border-base-300 pt-5">
                      <Link
                        to={`/projects/${project._id}`}
                        className="btn btn-primary min-h-10 h-10 rounded-xl border-none px-4 text-sm font-semibold"
                      >
                        View Details
                        <FiArrowUpRight aria-hidden="true" />
                      </Link>

                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn min-h-10 h-10 rounded-xl border border-base-300 bg-base-100 px-4 text-sm font-medium text-base-content hover:border-primary/30 hover:text-primary"
                        >
                          Live Demo
                          <FiExternalLink aria-hidden="true" />
                        </a>
                      )}

                      {project.githubClient && (
                        <a
                          href={project.githubClient}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${project.title} client GitHub repository`}
                          className="flex h-10 w-10 items-center justify-center rounded-xl border border-base-300 bg-base-100 text-base-content/60 transition-colors hover:border-primary/30 hover:text-primary"
                        >
                          <FiGithub aria-hidden="true" />
                        </a>
                      )}

                      {project.githubServer && (
                        <a
                          href={project.githubServer}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${project.title} server GitHub repository`}
                          className="flex h-10 w-10 items-center justify-center rounded-xl border border-base-300 bg-base-100 text-base-content/60 transition-colors hover:border-primary/30 hover:text-primary"
                        >
                          <FiServer aria-hidden="true" />
                        </a>
                      )}
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Projects;
