import { motion, useReducedMotion } from "framer-motion";
import {
  FiArrowLeft,
  FiArrowUpRight,
  FiCode,
  FiCompass,
  FiHome,
  FiTerminal,
} from "react-icons/fi";
import { Link } from "react-router-dom";

const NotFound = () => {
  const shouldReduceMotion = useReducedMotion();

  const fadeUp = (delay = 0) => ({
    initial: shouldReduceMotion
      ? false
      : {
          opacity: 0,
          y: 24,
        },
    animate: {
      opacity: 1,
      y: 0,
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
      className="relative isolate flex min-h-screen items-center overflow-hidden bg-base-100"
      aria-labelledby="not-found-title"
    >
      {/* =========================================================
          Background
      ========================================================== */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        aria-hidden="true"
      >
        {/* Left glow */}
        <div className="absolute -left-40 top-1/4 h-80 w-80 rounded-full bg-primary/10 blur-3xl sm:h-[420px] sm:w-[420px]" />

        {/* Right glow */}
        <div className="absolute -right-40 bottom-1/4 h-80 w-80 rounded-full bg-secondary/10 blur-3xl sm:h-[420px] sm:w-[420px]" />

        {/* Center glow */}
        <div className="absolute left-1/2 top-1/2 h-[280px] w-[280px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/5 blur-3xl sm:h-[400px] sm:w-[400px]" />

        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        {/* Top/bottom fade */}
        <div className="absolute inset-0 bg-gradient-to-b from-base-100/20 via-transparent to-base-100/40" />
      </div>

      {/* =========================================================
          Main Container
      ========================================================== */}
      <div className="mx-auto flex w-full max-w-7xl items-center px-4 py-24 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
        <div className="grid w-full items-center gap-14 lg:grid-cols-[1fr_0.85fr] lg:gap-16 xl:gap-24">
          {/* =====================================================
              Left Content
          ====================================================== */}
          <div className="max-w-2xl">
            {/* Status Badge */}
            <motion.div
              {...fadeUp(0.05)}
              className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-base-300 bg-base-200/60 px-3.5 py-2 backdrop-blur-md"
            >
              <span className="flex h-2.5 w-2.5 items-center justify-center">
                <span className="h-2.5 w-2.5 rounded-full bg-warning" />
              </span>

              <span className="font-mono text-xs font-medium text-base-content/65 sm:text-sm">
                404 • Route not found
              </span>
            </motion.div>

            {/* Eyebrow */}
            <motion.div
              {...fadeUp(0.1)}
              className="mb-5 flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-primary sm:text-sm"
            >
              <FiTerminal className="text-base" />

              <span>Unexpected route</span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              {...fadeUp(0.15)}
              id="not-found-title"
              className="text-balance text-5xl font-black leading-[0.95] tracking-[-0.055em] text-base-content sm:text-6xl md:text-7xl lg:text-[5rem] xl:text-[6rem]"
            >
              Lost in the
              <span className="block">
                <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                  codebase.
                </span>
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              {...fadeUp(0.22)}
              className="mt-6 max-w-xl text-base leading-7 text-base-content/60 sm:mt-7 sm:text-lg sm:leading-8"
            >
              The page you&apos;re looking for doesn&apos;t exist, may have
              moved, or the URL might be incorrect. Let&apos;s get you back to
              something useful.
            </motion.p>

            {/* CTA */}
            <motion.div
              {...fadeUp(0.3)}
              className="mt-8 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:flex-wrap"
            >
              <Link
                to="/"
                className="group btn btn-primary h-12 min-h-12 rounded-xl border-none px-6 font-semibold shadow-lg shadow-primary/20 sm:px-7"
              >
                <FiHome className="text-lg" />

                <span>Back to Home</span>

                <FiArrowUpRight className="text-lg transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>

              <button
                type="button"
                onClick={() => window.history.back()}
                className="btn h-12 min-h-12 rounded-xl border border-base-300 bg-base-100 px-6 font-semibold text-base-content hover:border-primary/40 hover:bg-base-200 sm:px-7"
              >
                <FiArrowLeft className="text-lg" />

                <span>Go Back</span>
              </button>
            </motion.div>

            {/* Helpful Links */}
            <motion.div
              {...fadeUp(0.36)}
              className="mt-9 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-base-300 pt-6 sm:mt-10 sm:pt-7"
            >
              <span className="text-xs font-medium uppercase tracking-[0.16em] text-base-content/35">
                Explore
              </span>

              <Link
                to="/about"
                className="text-sm font-medium text-base-content/55 transition-colors hover:text-primary"
              >
                About
              </Link>

              <Link
                to="/skills"
                className="text-sm font-medium text-base-content/55 transition-colors hover:text-primary"
              >
                Skills
              </Link>

              <Link
                to="/projects"
                className="text-sm font-medium text-base-content/55 transition-colors hover:text-primary"
              >
                Projects
              </Link>

              <Link
                to="/contact"
                className="text-sm font-medium text-base-content/55 transition-colors hover:text-primary"
              >
                Contact
              </Link>
            </motion.div>
          </div>

          {/* =====================================================
              Right Developer Visual
          ====================================================== */}
          <motion.div
            {...fadeUp(0.2)}
            className="relative mx-auto w-full max-w-[520px] lg:mx-0 lg:ml-auto"
          >
            {/* Outer glow */}
            <div
              className="absolute -inset-8 rounded-[3rem] bg-primary/5 blur-3xl sm:-inset-12"
              aria-hidden="true"
            />

            {/* Orbit decoration */}
            <motion.div
              animate={
                shouldReduceMotion
                  ? undefined
                  : {
                      rotate: 360,
                    }
              }
              transition={
                shouldReduceMotion
                  ? undefined
                  : {
                      duration: 35,
                      repeat: Infinity,
                      ease: "linear",
                    }
              }
              className="absolute left-1/2 top-1/2 h-[280px] w-[280px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/10 sm:h-[360px] sm:w-[360px] lg:h-[420px] lg:w-[420px]"
              aria-hidden="true"
            >
              <span className="absolute -right-1 top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-primary shadow-lg shadow-primary/50" />
            </motion.div>

            {/* Second orbit */}
            <motion.div
              animate={
                shouldReduceMotion
                  ? undefined
                  : {
                      rotate: -360,
                    }
              }
              transition={
                shouldReduceMotion
                  ? undefined
                  : {
                      duration: 45,
                      repeat: Infinity,
                      ease: "linear",
                    }
              }
              className="absolute left-1/2 top-1/2 h-[220px] w-[220px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-secondary/10 sm:h-[300px] sm:w-[300px] lg:h-[350px] lg:w-[350px]"
              aria-hidden="true"
            >
              <span className="absolute -left-1 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-secondary shadow-lg shadow-secondary/40" />
            </motion.div>

            {/* ===================================================
                Developer Terminal Card
            ==================================================== */}
            <div className="relative overflow-hidden rounded-[2rem] border border-base-300 bg-base-200/50 p-2 shadow-2xl shadow-black/10 backdrop-blur-xl sm:rounded-[2.5rem] sm:p-3">
              <div className="overflow-hidden rounded-[1.5rem] border border-base-300 bg-base-100 sm:rounded-[2rem]">
                {/* Terminal Header */}
                <div className="flex h-12 items-center justify-between border-b border-base-300 px-4 sm:h-14 sm:px-5">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-error/70" />
                    <span className="h-2.5 w-2.5 rounded-full bg-warning/70" />
                    <span className="h-2.5 w-2.5 rounded-full bg-success/70" />
                  </div>

                  <span className="font-mono text-[10px] text-base-content/35 sm:text-xs">
                    error-page.jsx
                  </span>

                  <FiCode className="text-sm text-base-content/30" />
                </div>

                {/* Terminal Content */}
                <div className="p-5 sm:p-7 lg:p-8">
                  <div className="font-mono text-xs leading-7 sm:text-sm sm:leading-8">
                    <div>
                      <span className="text-secondary">const</span>{" "}
                      <span className="text-primary">page</span>{" "}
                      <span className="text-base-content/40">=</span>{" "}
                      <span className="text-accent">{"{"}</span>
                    </div>

                    <div className="pl-5">
                      <span className="text-base-content/45">status:</span>{" "}
                      <span className="text-error">404</span>
                      <span className="text-base-content/30">,</span>
                    </div>

                    <div className="pl-5">
                      <span className="text-base-content/45">message:</span>{" "}
                      <span className="text-success">
                        &quot;Page not found&quot;
                      </span>
                      <span className="text-base-content/30">,</span>
                    </div>

                    <div className="pl-5">
                      <span className="text-base-content/45">route:</span>{" "}
                      <span className="text-warning">
                        window.location.pathname
                      </span>
                    </div>

                    <div>
                      <span className="text-accent">{"}"}</span>
                      <span className="text-base-content/30">;</span>
                    </div>

                    {/* Divider */}
                    <div className="my-6 border-t border-base-300" />

                    <div>
                      <span className="text-secondary">function</span>{" "}
                      <span className="text-primary">redirectHome</span>
                      <span className="text-base-content/50">{"() {"}</span>
                    </div>

                    <div className="pl-5">
                      <span className="text-secondary">return</span>{" "}
                      <span className="text-success">&quot;/home&quot;</span>
                      <span className="text-base-content/30">;</span>
                    </div>

                    <div className="text-base-content/50">{"}"}</div>

                    {/* Command */}
                    <div className="mt-6 rounded-xl border border-base-300 bg-base-200/50 px-4 py-3">
                      <div className="flex items-center gap-2 overflow-hidden">
                        <span className="shrink-0 text-primary">$</span>

                        <span className="truncate text-base-content/55">
                          npm run find-page
                        </span>

                        {!shouldReduceMotion && (
                          <motion.span
                            animate={{
                              opacity: [1, 0, 1],
                            }}
                            transition={{
                              duration: 1,
                              repeat: Infinity,
                              ease: "easeInOut",
                            }}
                            className="h-4 w-1.5 shrink-0 bg-primary"
                            aria-hidden="true"
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Terminal Footer */}
                <div className="flex flex-col gap-3 border-t border-base-300 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-7">
                  <div className="flex items-center gap-2 text-xs text-base-content/50">
                    <span className="h-2 w-2 rounded-full bg-warning" />

                    <span>Route unavailable</span>
                  </div>

                  <span className="font-mono text-[10px] uppercase tracking-wider text-base-content/30">
                    React • Node.js • MERN
                  </span>
                </div>
              </div>
            </div>

            {/* =================================================
                Floating Navigation Card
            ================================================== */}
            <motion.div
              animate={
                shouldReduceMotion
                  ? undefined
                  : {
                      y: [0, -7, 0],
                    }
              }
              transition={
                shouldReduceMotion
                  ? undefined
                  : {
                      duration: 5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }
              }
              className="absolute -left-2 top-10 z-20 hidden rounded-2xl border border-base-300 bg-base-100/90 px-4 py-3 shadow-xl backdrop-blur-md sm:block lg:-left-8"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <FiCompass />
                </div>

                <div>
                  <p className="text-xs font-semibold text-base-content">
                    Find your way
                  </p>

                  <p className="text-[10px] text-base-content/45">
                    Explore the portfolio
                  </p>
                </div>
              </div>
            </motion.div>

            {/* =================================================
                Floating Status Card
            ================================================== */}
            <motion.div
              animate={
                shouldReduceMotion
                  ? undefined
                  : {
                      y: [0, -7, 0],
                    }
              }
              transition={
                shouldReduceMotion
                  ? undefined
                  : {
                      duration: 5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1,
                    }
              }
              className="absolute -bottom-5 -right-2 z-20 hidden rounded-2xl border border-base-300 bg-base-100/90 px-4 py-3 shadow-xl backdrop-blur-md sm:block lg:-right-8"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-success/10 text-success">
                  <FiCode />
                </div>

                <div>
                  <p className="text-xs font-semibold text-base-content">
                    System online
                  </p>

                  <p className="text-[10px] text-base-content/45">
                    Portfolio ready
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </main>
  );
};

export default NotFound;
