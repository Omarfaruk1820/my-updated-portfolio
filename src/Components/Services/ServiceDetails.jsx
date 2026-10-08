import { useQuery } from "@tanstack/react-query";
import { motion, useReducedMotion } from "framer-motion";
import axios from "axios";
import {
  FiArrowLeft,
  FiArrowUpRight,
  FiCheck,
  FiChevronRight,
  FiCode,
  FiDatabase,
  FiGitBranch,
  FiLayers,
  FiLayout,
  FiLock,
  FiMonitor,
  FiRefreshCw,
  FiServer,
  FiSettings,
  FiSmartphone,
  FiZap,
} from "react-icons/fi";
import { Link, useParams } from "react-router-dom";

/* =========================================================
   API CONFIGURATION
========================================================= */

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

/* =========================================================
   ICON MAP
========================================================= */

const ICON_MAP = {
  FiCode,
  FiDatabase,
  FiGitBranch,
  FiLayers,
  FiLayout,
  FiLock,
  FiMonitor,
  FiServer,
  FiSettings,
  FiSmartphone,
  FiZap,
};

/* =========================================================
   DEVELOPMENT PROCESS
========================================================= */

const PROCESS = [
  {
    number: "01",
    title: "Understand",
    description:
      "I first understand the project requirements, target users, business goals, and technical constraints.",
  },
  {
    number: "02",
    title: "Plan",
    description:
      "I define the application structure, data flow, components, API requirements, and implementation strategy.",
  },
  {
    number: "03",
    title: "Build",
    description:
      "I develop the required features using clean architecture, reusable components, and maintainable code.",
  },
  {
    number: "04",
    title: "Refine",
    description:
      "I test the application, handle edge cases, improve responsiveness, optimize performance, and prepare it for production.",
  },
];

/* =========================================================
   FETCH SERVICE
========================================================= */

const fetchService = async (id) => {
  if (!id) {
    throw new Error("Service ID is missing.");
  }

  const response = await axios.get(`${API_URL}/api/services/${id}`);

  if (!response.data?.success || !response.data?.data) {
    throw new Error(response.data?.message || "Failed to fetch service.");
  }

  return response.data.data;
};

/* =========================================================
   VARIANTS
========================================================= */

const getSectionReveal = (shouldReduceMotion) => ({
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
          duration: 0.7,
          ease: [0.22, 1, 0.36, 1],
        },
  },
});

const getCardReveal = (shouldReduceMotion) => ({
  hidden: shouldReduceMotion
    ? {}
    : {
        opacity: 0,
        y: 25,
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
});

/* =========================================================
   LOADING SKELETON
========================================================= */

const ServiceDetailsSkeleton = () => {
  return (
    <main className="min-h-screen bg-base-100 text-base-content">
      <section className="border-b border-base-300 py-20 sm:py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl animate-pulse text-center">
            <div className="mx-auto h-10 w-10 rounded-2xl bg-base-300" />

            <div className="mx-auto mt-6 h-4 w-32 rounded bg-base-300" />

            <div className="mx-auto mt-5 h-14 max-w-3xl rounded-xl bg-base-300" />

            <div className="mx-auto mt-4 h-5 max-w-2xl rounded bg-base-300" />

            <div className="mx-auto mt-8 h-12 w-40 rounded-xl bg-base-300" />
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[1.35fr_0.65fr]">
            <div className="space-y-5">
              <div className="h-8 w-48 animate-pulse rounded bg-base-300" />
              <div className="h-32 animate-pulse rounded-2xl bg-base-300" />
              <div className="h-52 animate-pulse rounded-2xl bg-base-300" />
            </div>

            <div className="h-72 animate-pulse rounded-3xl bg-base-300" />
          </div>
        </div>
      </section>
    </main>
  );
};

/* =========================================================
   ERROR STATE
========================================================= */

const ServiceDetailsError = ({ onRetry }) => {
  return (
    <main className="min-h-screen bg-base-100 text-base-content">
      <section className="flex min-h-[70vh] items-center justify-center px-4 py-20">
        <div className="w-full max-w-lg rounded-3xl border border-base-300 bg-base-200/40 p-8 text-center shadow-xl sm:p-10">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-error/20 bg-error/10 text-error">
            <FiCode className="text-xl" />
          </div>

          <h1 className="mt-6 text-2xl font-black tracking-tight sm:text-3xl">
            Service not available
          </h1>

          <p className="mt-4 text-sm leading-7 text-base-content/55">
            The requested service could not be loaded. It may have been removed,
            unpublished, or the requested URL may be invalid.
          </p>

          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <button
              type="button"
              onClick={onRetry}
              className="btn btn-primary h-12 min-h-12 rounded-xl border-none px-5 font-semibold"
            >
              <FiRefreshCw />
              Try Again
            </button>

            <Link
              to="/services"
              className="btn h-12 min-h-12 rounded-xl border border-base-300 bg-base-100 px-5 font-semibold hover:border-primary/30 hover:text-primary"
            >
              <FiArrowLeft />
              Back to Services
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

/* =========================================================
   SERVICE DETAILS
========================================================= */

const ServiceDetails = () => {
  const { id } = useParams();

  const shouldReduceMotion = useReducedMotion();

  const sectionReveal = getSectionReveal(shouldReduceMotion);
  const cardReveal = getCardReveal(shouldReduceMotion);

  const {
    data: service,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["service", id],
    queryFn: () => fetchService(id),
    enabled: Boolean(id),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: false,
    refetchOnWindowFocus: false,
  });

  /* =========================================================
     STATES
  ========================================================== */

  if (isLoading) {
    return <ServiceDetailsSkeleton />;
  }

  if (isError || !service) {
    return <ServiceDetailsError onRetry={refetch} />;
  }

  /* =========================================================
     SAFE DATA NORMALIZATION
  ========================================================== */

  const {
    title = "Service",
    shortDescription = "",
    description = "",
    icon = "FiCode",
    features = [],
    technologies = [],
    order = 0,
  } = service;

  const ServiceIcon = ICON_MAP[icon] || FiCode;

  const safeFeatures = Array.isArray(features) ? features : [];

  const safeTechnologies = Array.isArray(technologies) ? technologies : [];

  return (
    <main className="relative min-h-screen overflow-hidden bg-base-100 text-base-content">
      {/* =====================================================
          BACKGROUND
      ====================================================== */}

      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute -left-48 top-20 h-96 w-96 rounded-full bg-primary/7 blur-3xl sm:h-[500px] sm:w-[500px]" />

        <div className="absolute -right-48 top-[30%] h-96 w-96 rounded-full bg-secondary/7 blur-3xl sm:h-[500px] sm:w-[500px]" />

        <div className="absolute left-1/3 top-[70%] h-80 w-80 rounded-full bg-accent/5 blur-3xl" />

        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      {/* =====================================================
          BREADCRUMB
      ====================================================== */}

      <section className="relative border-b border-base-300">
        <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 overflow-x-auto text-xs text-base-content/45"
          >
            <Link
              to="/"
              className="shrink-0 transition-colors hover:text-primary"
            >
              Home
            </Link>

            <FiChevronRight className="shrink-0 text-base-content/25" />

            <Link
              to="/services"
              className="shrink-0 transition-colors hover:text-primary"
            >
              Services
            </Link>

            <FiChevronRight className="shrink-0 text-base-content/25" />

            <span className="truncate text-base-content/65">{title}</span>
          </nav>
        </div>
      </section>

      {/* =====================================================
          HERO
      ====================================================== */}

      <section className="relative border-b border-base-300 py-20 sm:py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={sectionReveal}
            initial="hidden"
            animate="visible"
            className="mx-auto max-w-4xl text-center"
          >
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary shadow-lg shadow-primary/5">
              <ServiceIcon className="text-2xl" />
            </div>

            <div className="mt-7 flex items-center justify-center gap-3">
              <span className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                Service {String(order).padStart(2, "0")}
              </span>

              <span className="h-1 w-1 rounded-full bg-base-content/25" />

              <span className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-base-content/40">
                Full-Stack Development
              </span>
            </div>

            <h1 className="mt-5 text-balance text-4xl font-black tracking-[-0.045em] sm:text-5xl md:text-6xl lg:text-7xl">
              {title}
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-base-content/60 sm:text-base sm:leading-8 lg:text-lg">
              {shortDescription}
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                to="/contact"
                className="group btn btn-primary h-12 min-h-12 rounded-xl border-none px-6 font-semibold shadow-lg shadow-primary/20"
              >
                Start a Project
                <FiArrowUpRight className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>

              <Link
                to="/services"
                className="btn h-12 min-h-12 rounded-xl border border-base-300 bg-base-200/40 px-6 font-semibold hover:border-primary/30 hover:text-primary"
              >
                <FiArrowLeft />
                All Services
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* =====================================================
          OVERVIEW
      ====================================================== */}

      <section className="relative py-20 sm:py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr] lg:gap-12">
            {/* Main Content */}

            <motion.article
              variants={sectionReveal}
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: true,
                amount: 0.15,
              }}
              className="rounded-3xl border border-base-300 bg-base-200/30 p-6 sm:p-8 lg:p-10"
            >
              <span className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                Service Overview
              </span>

              <h2 className="mt-3 text-3xl font-black tracking-[-0.035em] sm:text-4xl">
                What I can build for you
              </h2>

              <div className="mt-6 space-y-5 text-sm leading-8 text-base-content/60 sm:text-base">
                {description
                  .split(/\n+/)
                  .filter(Boolean)
                  .map((paragraph, index) => (
                    <p key={`${paragraph}-${index}`}>{paragraph}</p>
                  ))}
              </div>
            </motion.article>

            {/* Technologies */}

            <motion.aside
              variants={sectionReveal}
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: true,
                amount: 0.15,
              }}
              className="rounded-3xl border border-base-300 bg-base-100 p-6 sm:p-8"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <FiCode />
                </div>

                <div>
                  <h2 className="font-bold">Technologies</h2>

                  <p className="text-xs text-base-content/40">
                    Tools used for this service
                  </p>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {safeTechnologies.length > 0 ? (
                  safeTechnologies.map((technology) => (
                    <span
                      key={technology}
                      className="rounded-xl border border-base-300 bg-base-200/50 px-3 py-2 text-xs font-medium text-base-content/60 transition-colors hover:border-primary/25 hover:text-primary"
                    >
                      {technology}
                    </span>
                  ))
                ) : (
                  <span className="text-sm text-base-content/45">
                    Technologies will be added soon.
                  </span>
                )}
              </div>
            </motion.aside>
          </div>
        </div>
      </section>

      {/* =====================================================
          FEATURES
      ====================================================== */}

      <section className="relative border-y border-base-300 bg-base-200/20 py-20 sm:py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={sectionReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.15,
            }}
            className="max-w-2xl"
          >
            <span className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-primary">
              What&apos;s included
            </span>

            <h2 className="mt-3 text-3xl font-black tracking-[-0.035em] sm:text-4xl lg:text-5xl">
              Built around real project needs.
            </h2>

            <p className="mt-5 max-w-xl text-sm leading-7 text-base-content/55 sm:text-base">
              Every service is structured around practical requirements,
              maintainable code, responsive experiences, and production-ready
              implementation.
            </p>
          </motion.div>

          <motion.div
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: shouldReduceMotion ? 0 : 0.07,
                },
              },
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.05,
            }}
            className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {safeFeatures.length > 0 ? (
              safeFeatures.map((feature, index) => (
                <motion.article
                  key={feature}
                  variants={cardReveal}
                  className="group rounded-2xl border border-base-300 bg-base-100 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/25 hover:shadow-xl hover:shadow-primary/5 sm:p-6"
                >
                  <div className="flex items-start gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <FiCheck />
                    </span>

                    <div>
                      <span className="font-mono text-[10px] font-semibold tracking-[0.15em] text-base-content/25">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <h3 className="mt-1 text-sm font-semibold leading-6 text-base-content">
                        {feature}
                      </h3>
                    </div>
                  </div>
                </motion.article>
              ))
            ) : (
              <div className="col-span-full rounded-2xl border border-base-300 bg-base-100 p-6 text-sm text-base-content/50">
                Service features will be available soon.
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* =====================================================
          PROCESS
      ====================================================== */}

      <section className="relative py-20 sm:py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <motion.div
              variants={sectionReveal}
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: true,
                amount: 0.15,
              }}
              className="lg:sticky lg:top-28 lg:self-start"
            >
              <span className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                How I work
              </span>

              <h2 className="mt-3 text-3xl font-black tracking-[-0.035em] sm:text-4xl lg:text-5xl">
                From requirements
                <span className="block text-base-content/40">
                  to production.
                </span>
              </h2>

              <p className="mt-5 max-w-md text-sm leading-7 text-base-content/55 sm:text-base">
                A clear process helps keep development focused, predictable, and
                aligned with the actual goals of the project.
              </p>
            </motion.div>

            <motion.div
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: shouldReduceMotion ? 0 : 0.1,
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
              <div className="absolute bottom-6 left-5 top-6 w-px bg-base-300 sm:left-6" />

              <div className="space-y-5">
                {PROCESS.map((step) => (
                  <motion.article
                    key={step.number}
                    variants={cardReveal}
                    className="relative rounded-3xl border border-base-300 bg-base-200/30 p-5 pl-14 sm:p-7 sm:pl-16"
                  >
                    <div className="absolute left-[11px] top-7 flex h-3 w-3 items-center justify-center rounded-full bg-primary ring-4 ring-base-100 sm:left-[18px]" />

                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-primary">
                          Step {step.number}
                        </span>

                        <h3 className="mt-2 text-xl font-bold">{step.title}</h3>
                      </div>

                      <span className="hidden font-mono text-3xl font-black text-base-content/5 sm:block">
                        {step.number}
                      </span>
                    </div>

                    <p className="mt-3 text-sm leading-6 text-base-content/55">
                      {step.description}
                    </p>
                  </motion.article>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =====================================================
          CTA
      ====================================================== */}

      <section className="relative pb-20 sm:pb-24 lg:pb-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={
              shouldReduceMotion
                ? false
                : {
                    opacity: 0,
                    y: 30,
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
              duration: shouldReduceMotion ? 0 : 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative overflow-hidden rounded-[2rem] border border-base-300 bg-base-200/40 px-6 py-12 text-center sm:px-10 sm:py-16 lg:px-16 lg:py-20"
          >
            <div
              className="pointer-events-none absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl"
              aria-hidden="true"
            />

            <div className="relative">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary">
                <FiLayers className="text-xl" />
              </div>

              <h2 className="mx-auto mt-6 max-w-2xl text-3xl font-black tracking-[-0.035em] sm:text-4xl lg:text-5xl">
                Ready to build something great?
              </h2>

              <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-base-content/55 sm:text-base">
                Let&apos;s discuss your requirements and turn your idea into a
                reliable, responsive, and production-ready web application.
              </p>

              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <Link
                  to="/contact"
                  className="group btn btn-primary h-12 min-h-12 rounded-xl border-none px-6 font-semibold shadow-lg shadow-primary/20"
                >
                  Let&apos;s Work Together
                  <FiArrowUpRight className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>

                <Link
                  to="/services"
                  className="btn h-12 min-h-12 rounded-xl border border-base-300 bg-base-100 px-6 font-semibold text-base-content hover:border-primary/30 hover:text-primary"
                >
                  Explore Services
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default ServiceDetails;
