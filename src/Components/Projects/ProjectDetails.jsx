import { motion, useReducedMotion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  FiArrowLeft,
  FiArrowUpRight,
  FiCheckCircle,
  FiCode,
  FiExternalLink,
  FiGithub,
  FiGlobe,
  FiLayers,
  FiServer,
} from "react-icons/fi";
import { Link, useParams } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const fetchProject = async (id) => {
  const response = await axios.get(`${API_URL}/api/projects/${id}`);

  return response.data;
};

const ProjectDetails = () => {
  const { id } = useParams();
  const shouldReduceMotion = useReducedMotion();

  const {
    data: project,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["project", id],
    queryFn: () => fetchProject(id),
    enabled: Boolean(id),
  });

  /* =========================================
      Loading
  ========================================== */
  if (isLoading) {
    return (
      <main className="min-h-screen bg-base-100 pt-28 sm:pt-32">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-5 w-28 rounded bg-base-300" />

            <div className="mt-10 h-10 max-w-2xl rounded bg-base-300 sm:h-14" />

            <div className="mt-5 h-5 max-w-3xl rounded bg-base-300" />

            <div className="mt-10 aspect-[16/8] rounded-3xl bg-base-300" />

            <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_320px]">
              <div className="space-y-4">
                <div className="h-5 rounded bg-base-300" />
                <div className="h-5 rounded bg-base-300" />
                <div className="h-5 w-4/5 rounded bg-base-300" />
              </div>

              <div className="h-64 rounded-3xl bg-base-300" />
            </div>
          </div>
        </div>
      </main>
    );
  }

  /* =========================================
      Error
  ========================================== */
  if (isError || !project) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-base-100 px-4 pt-20">
        <div className="w-full max-w-lg rounded-3xl border border-base-300 bg-base-200/40 p-8 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-error/10 text-error">
            <FiLayers className="text-2xl" />
          </div>

          <h1 className="mt-5 text-2xl font-bold text-base-content">
            Project not found
          </h1>

          <p className="mt-3 text-sm leading-6 text-base-content/55">
            The project you&apos;re looking for could not be loaded or may no
            longer exist.
          </p>

          <Link to="/projects" className="btn btn-primary mt-6 rounded-xl">
            <FiArrowLeft />
            Back to Projects
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-base-100 pt-28 sm:pt-32 lg:pt-36">
      {/* =========================================
          Background
      ========================================== */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute -right-40 top-20 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />

        <div className="absolute -left-40 bottom-20 h-96 w-96 rounded-full bg-secondary/5 blur-3xl" />

        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-4 pb-20 sm:px-6 sm:pb-24 lg:px-8 lg:pb-32">
        {/* =========================================
            Back Button
        ========================================== */}
        <motion.div
          initial={
            shouldReduceMotion
              ? false
              : {
                  opacity: 0,
                  x: -15,
                }
          }
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: shouldReduceMotion ? 0 : 0.5,
          }}
        >
          <Link
            to="/projects"
            className="group inline-flex items-center gap-2 text-sm font-medium text-base-content/55 transition-colors hover:text-primary"
          >
            <FiArrowLeft className="transition-transform duration-200 group-hover:-translate-x-1" />

            <span>Back to Projects</span>
          </Link>
        </motion.div>

        {/* =========================================
            Project Header
        ========================================== */}
        <motion.div
          initial={
            shouldReduceMotion
              ? false
              : {
                  opacity: 0,
                  y: 25,
                }
          }
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: shouldReduceMotion ? 0 : 0.7,
            delay: shouldReduceMotion ? 0 : 0.1,
          }}
          className="mt-10 max-w-4xl"
        >
          <div className="flex flex-wrap items-center gap-2">
            {project.category && (
              <span className="rounded-full border border-base-300 bg-base-200/60 px-3 py-1.5 text-xs font-semibold text-base-content/60">
                {project.category}
              </span>
            )}

            {project.featured && (
              <span className="rounded-full bg-primary px-3 py-1.5 text-xs font-semibold text-primary-content">
                Featured Project
              </span>
            )}
          </div>

          <h1 className="mt-5 text-balance text-4xl font-black tracking-[-0.04em] text-base-content sm:text-5xl md:text-6xl">
            {project.title}
          </h1>

          {project.shortDescription && (
            <p className="mt-5 max-w-3xl text-base leading-7 text-base-content/60 sm:text-lg sm:leading-8">
              {project.shortDescription}
            </p>
          )}
        </motion.div>

        {/* =========================================
            Hero Image
        ========================================== */}
        <motion.div
          initial={
            shouldReduceMotion
              ? false
              : {
                  opacity: 0,
                  y: 30,
                  scale: 0.98,
                }
          }
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          transition={{
            duration: shouldReduceMotion ? 0 : 0.8,
            delay: shouldReduceMotion ? 0 : 0.2,
          }}
          className="relative mt-10 overflow-hidden rounded-3xl border border-base-300 bg-base-200/40 p-2 shadow-2xl shadow-black/5 sm:mt-12 sm:p-3"
        >
          <div className="relative overflow-hidden rounded-2xl bg-base-300 sm:rounded-[1.4rem]">
            {project.image ? (
              <img
                src={project.image}
                alt={`${project.title} project preview`}
                className="h-auto max-h-[700px] w-full object-cover object-center"
              />
            ) : (
              <div className="flex aspect-[16/8] items-center justify-center">
                <FiCode className="text-6xl text-base-content/20" />
              </div>
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>
        </motion.div>

        {/* =========================================
            Main Content
        ========================================== */}
        <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-14">
          {/* =====================================
              Left Content
          ====================================== */}
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
              amount: 0.15,
            }}
            transition={{
              duration: shouldReduceMotion ? 0 : 0.6,
            }}
          >
            {/* Description */}
            <section>
              <div className="flex items-center gap-3">
                <span className="h-8 w-1 rounded-full bg-primary" />

                <h2 className="text-2xl font-bold tracking-tight text-base-content">
                  About the project
                </h2>
              </div>

              <div className="mt-5 max-w-3xl">
                <p className="whitespace-pre-line text-sm leading-7 text-base-content/60 sm:text-base sm:leading-8">
                  {project.description}
                </p>
              </div>
            </section>

            {/* Features */}
            {Array.isArray(project.features) && project.features.length > 0 && (
              <section className="mt-12">
                <div className="flex items-center gap-3">
                  <span className="h-8 w-1 rounded-full bg-secondary" />

                  <h2 className="text-2xl font-bold tracking-tight text-base-content">
                    Key features
                  </h2>
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {project.features.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-start gap-3 rounded-2xl border border-base-300 bg-base-200/30 p-4"
                    >
                      <FiCheckCircle className="mt-0.5 shrink-0 text-success" />

                      <span className="text-sm leading-6 text-base-content/65">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Technology */}
            {Array.isArray(project.technologies) &&
              project.technologies.length > 0 && (
                <section className="mt-12">
                  <div className="flex items-center gap-3">
                    <span className="h-8 w-1 rounded-full bg-accent" />

                    <h2 className="text-2xl font-bold tracking-tight text-base-content">
                      Technologies
                    </h2>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {project.technologies.map((technology) => (
                      <span
                        key={technology}
                        className="rounded-xl border border-base-300 bg-base-200/40 px-3.5 py-2 font-mono text-xs text-base-content/60"
                      >
                        {technology}
                      </span>
                    ))}
                  </div>
                </section>
              )}
          </motion.div>

          {/* =====================================
              Sidebar
          ====================================== */}
          <motion.aside
            initial={
              shouldReduceMotion
                ? false
                : {
                    opacity: 0,
                    x: 20,
                  }
            }
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
              amount: 0.15,
            }}
            transition={{
              duration: shouldReduceMotion ? 0 : 0.6,
            }}
            className="lg:sticky lg:top-28 lg:self-start"
          >
            <div className="rounded-3xl border border-base-300 bg-base-200/30 p-5 sm:p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <FiLayers />
                </div>

                <div>
                  <p className="text-xs uppercase tracking-[0.14em] text-base-content/40">
                    Project
                  </p>

                  <p className="text-sm font-semibold text-base-content">
                    Overview
                  </p>
                </div>
              </div>

              {/* Action Links */}
              <div className="mt-6 space-y-2.5">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary h-11 min-h-11 w-full rounded-xl border-none font-semibold"
                  >
                    <FiGlobe />
                    Live Website
                    <FiExternalLink className="ml-auto" />
                  </a>
                )}

                {project.githubClient && (
                  <a
                    href={project.githubClient}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn h-11 min-h-11 w-full rounded-xl border border-base-300 bg-base-100 font-medium text-base-content hover:border-primary/30 hover:text-primary"
                  >
                    <FiGithub />
                    Client Repository
                    <FiArrowUpRight className="ml-auto" />
                  </a>
                )}

                {project.githubServer && (
                  <a
                    href={project.githubServer}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn h-11 min-h-11 w-full rounded-xl border border-base-300 bg-base-100 font-medium text-base-content hover:border-primary/30 hover:text-primary"
                  >
                    <FiServer />
                    Server Repository
                    <FiArrowUpRight className="ml-auto" />
                  </a>
                )}
              </div>

              {/* Technologies */}
              {Array.isArray(project.technologies) &&
                project.technologies.length > 0 && (
                  <div className="mt-7 border-t border-base-300 pt-6">
                    <div className="flex items-center gap-2">
                      <FiCode className="text-primary" />

                      <span className="text-xs font-semibold uppercase tracking-[0.12em] text-base-content/45">
                        Built With
                      </span>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.technologies.map((technology) => (
                        <span
                          key={technology}
                          className="rounded-lg border border-base-300 px-2.5 py-1.5 font-mono text-[10px] text-base-content/55"
                        >
                          {technology}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
            </div>
          </motion.aside>
        </div>

        {/* =========================================
            Bottom Navigation
        ========================================== */}
        <div className="mt-16 border-t border-base-300 pt-8 sm:mt-20">
          <Link
            to="/projects"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-base-content/55 transition-colors hover:text-primary"
          >
            <FiArrowLeft className="transition-transform duration-200 group-hover:-translate-x-1" />

            <span>View all projects</span>

            <FiArrowUpRight className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </main>
  );
};

export default ProjectDetails;
