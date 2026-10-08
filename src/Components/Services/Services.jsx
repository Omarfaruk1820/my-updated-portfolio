import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { motion, useReducedMotion } from "framer-motion";
import {
  FiArrowUpRight,
  FiCheck,
  FiChevronRight,
  FiCode,
  FiDatabase,
  FiEye,
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
import { Link } from "react-router-dom";

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
   TECHNOLOGY STACK
========================================================= */

const TECH_STACK = [
  {
    category: "Frontend",
    icon: FiMonitor,
    items: [
      "React.js",
      "React Router",
      "Tailwind CSS",
      "DaisyUI",
      "Framer Motion",
      "Lottie React",
      "React Hook Form",
      "React Icons",
    ],
  },

  {
    category: "Backend",
    icon: FiServer,
    items: [
      "Node.js",
      "Express.js",
      "REST API",
      "MVC Architecture",
      "JWT",
      "CORS",
      "dotenv",
    ],
  },

  {
    category: "Database",
    icon: FiDatabase,
    items: [
      "MongoDB",
      "Data Modeling",
      "CRUD",
      "Query Design",
      "Database Integration",
    ],
  },

  {
    category: "Tools & Workflow",
    icon: FiSettings,
    items: [
      "Git",
      "GitHub",
      "Axios",
      "TanStack Query",
      "Firebase",
      "API Integration",
      "Deployment",
    ],
  },
];

/* =========================================================
   DEVELOPMENT PROCESS
========================================================= */

const PROCESS = [
  {
    number: "01",
    title: "Understand",
    description:
      "I first understand the product requirements, users, business goals, and technical constraints.",
  },

  {
    number: "02",
    title: "Plan",
    description:
      "I define the application structure, data flow, components, API requirements, and development roadmap.",
  },

  {
    number: "03",
    title: "Build",
    description:
      "I develop the frontend, backend, database, authentication, and integrations using maintainable architecture.",
  },

  {
    number: "04",
    title: "Refine",
    description:
      "I test the application, improve responsiveness, handle edge cases, optimize performance, and prepare it for release.",
  },
];

/* =========================================================
   FETCH SERVICES
========================================================= */

const fetchServices = async () => {
  const response = await axios.get(`${API_URL}/api/services`);

  if (!response.data?.success) {
    throw new Error(response.data?.message || "Failed to fetch services.");
  }

  return Array.isArray(response.data?.data) ? response.data.data : [];
};

/* =========================================================
   SERVICE SKELETON
========================================================= */

const ServiceCardSkeleton = () => {
  return (
    <article className="animate-pulse rounded-3xl border border-base-300 bg-base-200/30 p-6 sm:p-7">
      <div className="flex items-start justify-between">
        <div className="h-12 w-12 rounded-2xl bg-base-300" />

        <div className="h-4 w-8 rounded bg-base-300" />
      </div>

      <div className="mt-6 h-6 w-2/3 rounded bg-base-300" />

      <div className="mt-3 space-y-2">
        <div className="h-4 w-full rounded bg-base-300" />
        <div className="h-4 w-5/6 rounded bg-base-300" />
        <div className="h-4 w-4/6 rounded bg-base-300" />
      </div>

      <div className="mt-6 space-y-3">
        <div className="h-4 w-5/6 rounded bg-base-300" />
        <div className="h-4 w-4/5 rounded bg-base-300" />
        <div className="h-4 w-3/5 rounded bg-base-300" />
      </div>

      <div className="mt-7 flex gap-2 border-t border-base-300 pt-5">
        <div className="h-7 w-20 rounded-lg bg-base-300" />
        <div className="h-7 w-24 rounded-lg bg-base-300" />
        <div className="h-7 w-16 rounded-lg bg-base-300" />
      </div>

      <div className="mt-6 h-10 w-full rounded-xl bg-base-300" />
    </article>
  );
};

/* =========================================================
   ERROR STATE
========================================================= */

const ServicesError = ({ onRetry }) => {
  return (
    <div className="rounded-3xl border border-base-300 bg-base-200/40 p-8 text-center sm:p-10">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-error/20 bg-error/10 text-error">
        <FiCode className="text-xl" />
      </div>

      <h3 className="mt-6 text-2xl font-black tracking-tight">
        Unable to load services
      </h3>

      <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-base-content/55">
        Something went wrong while loading the services. Please try again.
      </p>

      <button
        type="button"
        onClick={onRetry}
        className="btn btn-primary mt-6 h-11 min-h-11 rounded-xl border-none px-5 font-semibold"
      >
        <FiRefreshCw />
        Try Again
      </button>
    </div>
  );
};

/* =========================================================
   EMPTY STATE
========================================================= */

const ServicesEmpty = () => {
  return (
    <div className="rounded-3xl border border-base-300 bg-base-200/40 p-8 text-center sm:p-10">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary">
        <FiLayers className="text-xl" />
      </div>

      <h3 className="mt-6 text-2xl font-black tracking-tight">
        Services coming soon
      </h3>

      <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-base-content/55">
        My professional services are being prepared. Please check back soon.
      </p>
    </div>
  );
};

/* =========================================================
   SERVICES COMPONENT
========================================================= */

const Services = () => {
  const shouldReduceMotion = useReducedMotion();

  /* =======================================================
     ANIMATION VARIANTS
  ======================================================== */

  const sectionReveal = {
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
  };

  const cardReveal = {
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
     SERVICES QUERY
  ======================================================== */

  const {
    data: services = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["services"],
    queryFn: fetchServices,

    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,

    retry: 2,

    refetchOnWindowFocus: false,
  });

  return (
    <main className="relative overflow-hidden bg-base-100 text-base-content">
      {/* =====================================================
          BACKGROUND
      ====================================================== */}

      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute -left-48 top-20 h-96 w-96 rounded-full bg-primary/7 blur-3xl sm:h-[500px] sm:w-[500px]" />

        <div className="absolute -right-48 top-[35%] h-96 w-96 rounded-full bg-secondary/7 blur-3xl sm:h-[500px] sm:w-[500px]" />

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
          HERO / INTRO
      ====================================================== */}

      <section
        className="relative border-b border-base-300 py-20 sm:py-24 lg:py-32"
        aria-labelledby="services-title"
      >
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={sectionReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.2,
            }}
            className="mx-auto max-w-4xl text-center"
          >
            {/* Eyebrow */}

            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-base-300 bg-base-200/60 px-4 py-2 backdrop-blur-md">
              <FiCode className="text-primary" />

              <span className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-base-content/60">
                Full-Stack Development
              </span>
            </div>

            {/* Heading */}

            <h1
              id="services-title"
              className="text-balance text-4xl font-black tracking-[-0.045em] sm:text-5xl md:text-6xl lg:text-7xl"
            >
              Building digital products
              <span className="block">
                <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                  from idea to production.
                </span>
              </span>
            </h1>

            {/* Description */}

            <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-base-content/60 sm:text-base sm:leading-8 lg:text-lg">
              I build modern full-stack web applications with thoughtful
              interfaces, reliable APIs, secure authentication, structured
              databases, and scalable architecture.
            </p>

            {/* Quick Stats */}

            <div className="mx-auto mt-10 grid max-w-3xl grid-cols-2 overflow-hidden rounded-2xl border border-base-300 bg-base-200/40 sm:grid-cols-4">
              <div className="border-b border-base-300 p-4 sm:border-b-0 sm:border-r">
                <FiMonitor className="mx-auto text-lg text-primary" />

                <p className="mt-2 text-xs font-semibold text-base-content/60">
                  Frontend
                </p>
              </div>

              <div className="border-b border-base-300 p-4 sm:border-b-0 sm:border-r">
                <FiServer className="mx-auto text-lg text-secondary" />

                <p className="mt-2 text-xs font-semibold text-base-content/60">
                  Backend
                </p>
              </div>

              <div className="border-b border-base-300 p-4 sm:border-b-0 sm:border-r">
                <FiDatabase className="mx-auto text-lg text-accent" />

                <p className="mt-2 text-xs font-semibold text-base-content/60">
                  Database
                </p>
              </div>

              <div className="p-4">
                <FiZap className="mx-auto text-lg text-primary" />

                <p className="mt-2 text-xs font-semibold text-base-content/60">
                  Integration
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* =====================================================
          SERVICES
      ====================================================== */}

      <section
        className="relative py-20 sm:py-24 lg:py-32"
        aria-labelledby="services-grid-title"
      >
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Section Header */}

          <motion.div
            variants={sectionReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.2,
            }}
            className="mb-12 flex flex-col gap-5 lg:mb-16 lg:flex-row lg:items-end lg:justify-between"
          >
            <div className="max-w-2xl">
              <span className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                What I do
              </span>

              <h2
                id="services-grid-title"
                className="mt-3 text-3xl font-black tracking-[-0.035em] sm:text-4xl lg:text-5xl"
              >
                Full-stack services
              </h2>
            </div>

            <p className="max-w-md text-sm leading-7 text-base-content/55 sm:text-base">
              From polished frontend experiences to secure backend systems, I
              can work across the complete application stack.
            </p>
          </motion.div>

          {/* Loading */}

          {isLoading && (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <ServiceCardSkeleton key={index} />
              ))}
            </div>
          )}

          {/* Error */}

          {isError && !isLoading && <ServicesError onRetry={refetch} />}

          {/* Empty */}

          {!isLoading && !isError && services.length === 0 && <ServicesEmpty />}

          {/* Service Cards */}

          {!isLoading && !isError && services.length > 0 && (
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
              className="grid gap-5 md:grid-cols-2 xl:grid-cols-3"
            >
              {services.map((service, index) => {
                const ServiceIcon = ICON_MAP[service.icon] || FiCode;

                const features = Array.isArray(service.features)
                  ? service.features
                  : [];

                const technologies = Array.isArray(service.technologies)
                  ? service.technologies
                  : [];

                return (
                  <motion.article
                    key={service._id}
                    variants={cardReveal}
                    className={`group relative overflow-hidden rounded-3xl border bg-base-200/30 p-6 transition-all duration-300 hover:-translate-y-1 sm:p-7 ${
                      service.featured
                        ? "border-primary/25 shadow-lg shadow-primary/5"
                        : "border-base-300 hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5"
                    }`}
                  >
                    {/* Top accent */}

                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                    {/* Header */}

                    <div className="flex items-start justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-base-300 bg-base-100 text-primary transition-all duration-300 group-hover:border-primary/30 group-hover:bg-primary/10">
                        <ServiceIcon className="text-xl" />
                      </div>

                      <span className="font-mono text-xs font-medium text-base-content/25">
                        {String(service.order ?? index + 1).padStart(2, "0")}
                      </span>
                    </div>

                    {/* Content */}

                    <h3 className="mt-6 text-xl font-bold tracking-tight text-base-content">
                      {service.title}
                    </h3>

                    <p className="mt-3 text-sm leading-6 text-base-content/55">
                      {service.shortDescription}
                    </p>

                    {/* Features */}

                    {features.length > 0 && (
                      <ul className="mt-6 space-y-3">
                        {features.slice(0, 5).map((feature) => (
                          <li
                            key={feature}
                            className="flex items-start gap-2.5 text-sm text-base-content/65"
                          >
                            <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                              <FiCheck className="text-[10px]" />
                            </span>

                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Technologies */}

                    {technologies.length > 0 && (
                      <div className="mt-7 flex flex-wrap gap-2 border-t border-base-300 pt-5">
                        {technologies.map((technology) => (
                          <span
                            key={technology}
                            className="rounded-lg border border-base-300 bg-base-100 px-2.5 py-1.5 font-mono text-[10px] text-base-content/50"
                          >
                            {technology}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Details Link */}

                    <Link
                      to={`/services/${service._id}`}
                      className="group/link mt-6 flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-base-300 bg-base-100 px-4 text-sm font-semibold text-base-content transition-all duration-200 hover:border-primary/30 hover:bg-primary/5 hover:text-primary"
                    >
                      View Service Details
                      <FiEye className="transition-transform duration-200 group-hover/link:translate-x-0.5" />
                    </Link>
                  </motion.article>
                );
              })}
            </motion.div>
          )}
        </div>
      </section>

      {/* =====================================================
          TECHNOLOGY STACK
      ====================================================== */}

      <section
        className="relative border-y border-base-300 bg-base-200/20 py-20 sm:py-24 lg:py-32"
        aria-labelledby="technology-title"
      >
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={sectionReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.2,
            }}
            className="mx-auto max-w-3xl text-center"
          >
            <span className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-primary">
              Technology Stack
            </span>

            <h2
              id="technology-title"
              className="mt-3 text-3xl font-black tracking-[-0.035em] sm:text-4xl lg:text-5xl"
            >
              Tools I use to build
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-base-content/55 sm:text-base">
              A practical modern stack focused on developer experience,
              maintainability, performance, and production-ready applications.
            </p>
          </motion.div>

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
            className="mt-12 grid gap-5 md:grid-cols-2 lg:mt-16"
          >
            {TECH_STACK.map((stack) => {
              const Icon = stack.icon;

              return (
                <motion.div
                  key={stack.category}
                  variants={cardReveal}
                  className="rounded-3xl border border-base-300 bg-base-100 p-6 sm:p-7"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon className="text-lg" />
                    </div>

                    <div>
                      <h3 className="font-bold text-base-content">
                        {stack.category}
                      </h3>

                      <p className="mt-0.5 text-xs text-base-content/40">
                        {stack.items.length} technologies
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {stack.items.map((technology) => (
                      <span
                        key={technology}
                        className="rounded-xl border border-base-300 bg-base-200/50 px-3 py-2 text-xs font-medium text-base-content/60 transition-colors hover:border-primary/25 hover:text-primary"
                      >
                        {technology}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* =====================================================
          DEVELOPMENT PROCESS
      ====================================================== */}

      <section
        className="relative py-20 sm:py-24 lg:py-32"
        aria-labelledby="process-title"
      >
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            {/* Intro */}

            <motion.div
              variants={sectionReveal}
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: true,
                amount: 0.2,
              }}
              className="lg:sticky lg:top-28 lg:self-start"
            >
              <span className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                How I work
              </span>

              <h2
                id="process-title"
                className="mt-3 text-3xl font-black tracking-[-0.035em] sm:text-4xl lg:text-5xl"
              >
                A simple process.
                <span className="block text-base-content/40">
                  A better product.
                </span>
              </h2>

              <p className="mt-5 max-w-md text-sm leading-7 text-base-content/55 sm:text-base">
                Good software is more than writing code. I focus on
                understanding the problem, choosing the right architecture,
                building carefully, and refining the final experience.
              </p>

              <Link
                to="/contact"
                className="group btn btn-primary mt-7 h-12 min-h-12 rounded-xl border-none px-5 font-semibold shadow-lg shadow-primary/15"
              >
                Start a Project
                <FiArrowUpRight className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </motion.div>

            {/* Process */}

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
              {/* Timeline */}

              <div className="absolute bottom-6 left-5 top-6 w-px bg-base-300 sm:left-6" />

              <div className="space-y-5">
                {PROCESS.map((step) => (
                  <motion.article
                    key={step.number}
                    variants={cardReveal}
                    className="relative rounded-3xl border border-base-300 bg-base-200/30 p-5 pl-14 sm:p-7 sm:pl-16"
                  >
                    {/* Timeline point */}

                    <div className="absolute left-[11px] top-7 flex h-3 w-3 items-center justify-center rounded-full bg-primary ring-4 ring-base-100 sm:left-[18px]" />

                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-primary">
                          Step {step.number}
                        </span>

                        <h3 className="mt-2 text-xl font-bold text-base-content">
                          {step.title}
                        </h3>
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
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
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
            {/* CTA glow */}

            <div
              className="pointer-events-none absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl"
              aria-hidden="true"
            />

            <div className="relative">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary">
                <FiLayers className="text-xl" />
              </div>

              <h2 className="mx-auto mt-6 max-w-2xl text-3xl font-black tracking-[-0.035em] sm:text-4xl lg:text-5xl">
                Have an idea worth building?
              </h2>

              <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-base-content/55 sm:text-base">
                Let&apos;s turn your idea into a reliable, responsive, and
                production-ready web application.
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
                  to="/projects"
                  className="btn h-12 min-h-12 rounded-xl border border-base-300 bg-base-100 px-6 font-semibold text-base-content hover:border-primary/30 hover:text-primary"
                >
                  View My Projects
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default Services;
