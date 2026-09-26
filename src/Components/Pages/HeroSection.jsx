import { motion, useReducedMotion } from "framer-motion";
import {
  FiArrowDown,
  FiArrowUpRight,
  FiCode,
  FiDownload,
  FiGithub,
  FiLinkedin,
  FiMail,
  FiMapPin,
  FiTerminal,
} from "react-icons/fi";

import omarfarukPhoto from "../../assets/omar-faruk.png";

const TECH_STACK = ["React", "Node.js", "Express", "MongoDB"];

const SOCIAL_LINKS = [
  {
    label: "GitHub",
    href: "https://github.com/",
    icon: FiGithub,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/",
    icon: FiLinkedin,
  },
  {
    label: "Email",
    href: "mailto:hello@example.com",
    icon: FiMail,
  },
];

const HeroSection = () => {
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
    <section
      id="home"
      aria-labelledby="hero-title"
      className="relative isolate min-h-screen overflow-hidden bg-base-100"
    >
      {/* Background */}
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
                  y: [0, -25, 0],
                  scale: [1, 1.08, 1],
                }
          }
          transition={
            shouldReduceMotion
              ? undefined
              : {
                  duration: 12,
                  repeat: Infinity,
                  ease: "easeInOut",
                }
          }
          className="absolute left-1/2 top-[-180px] h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl sm:h-[520px] sm:w-[520px] lg:left-[72%] lg:top-[-100px] lg:h-[680px] lg:w-[680px]"
        />

        {/* Secondary Glow */}
        <motion.div
          animate={
            shouldReduceMotion
              ? undefined
              : {
                  x: [0, -30, 0],
                  y: [0, 25, 0],
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
          className="absolute -bottom-48 -left-48 h-[420px] w-[420px] rounded-full bg-secondary/10 blur-3xl sm:h-[520px] sm:w-[520px]"
        />

        {/* Orbit 1 */}
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
                  duration: 30,
                  repeat: Infinity,
                  ease: "linear",
                }
          }
          className="absolute left-[72%] top-[42%] hidden h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/10 lg:block"
        >
          <span className="absolute left-1/2 top-[-4px] h-2 w-2 -translate-x-1/2 rounded-full bg-primary shadow-lg shadow-primary/50" />
        </motion.div>

        {/* Orbit 2 */}
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
                  duration: 40,
                  repeat: Infinity,
                  ease: "linear",
                }
          }
          className="absolute left-[72%] top-[42%] hidden h-[390px] w-[390px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-secondary/10 lg:block"
        >
          <span className="absolute right-[-4px] top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-secondary shadow-lg shadow-secondary/50" />
        </motion.div>

        {/* Orbit 3 */}
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
                  duration: 48,
                  repeat: Infinity,
                  ease: "linear",
                }
          }
          className="absolute left-[72%] top-[42%] hidden h-[270px] w-[270px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/10 lg:block"
        >
          <span className="absolute bottom-[-4px] left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-accent shadow-lg shadow-accent/50" />
        </motion.div>

        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        {/* Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,hsl(var(--b1))_78%)] opacity-60" />
      </div>

      {/* Main Content */}
      <div className="mx-auto flex min-h-screen w-full max-w-7xl items-center px-4 pb-16 pt-28 sm:px-6 sm:pb-20 sm:pt-32 lg:px-8 lg:pb-24 lg:pt-36">
        <div className="grid w-full items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 xl:grid-cols-[1fr_0.9fr] xl:gap-20">
          {/* Left Content */}
          <div className="max-w-3xl">
            {/* Availability */}
            <motion.div
              {...fadeUp(0.05)}
              className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-base-300 bg-base-200/50 px-3.5 py-2 backdrop-blur-md sm:mb-7"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-60" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-success" />
              </span>

              <span className="text-xs font-medium text-base-content/70 sm:text-sm">
                Available for freelance opportunities
              </span>
            </motion.div>

            {/* Eyebrow */}
            <motion.div
              {...fadeUp(0.1)}
              className="mb-4 flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-primary sm:text-sm"
            >
              <FiTerminal className="text-base" />
              <span>Full Stack Developer</span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              id="hero-title"
              initial={
                shouldReduceMotion
                  ? false
                  : {
                      opacity: 0,
                      y: 35,
                      filter: "blur(10px)",
                    }
              }
              animate={{
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
              }}
              transition={
                shouldReduceMotion
                  ? {
                      duration: 0,
                    }
                  : {
                      duration: 0.85,
                      delay: 0.15,
                      ease: [0.22, 1, 0.36, 1],
                    }
              }
              className="max-w-4xl text-balance text-4xl font-black leading-[1.04] tracking-[-0.045em] text-base-content sm:text-5xl md:text-6xl lg:text-[4rem] xl:text-[4.6rem]"
            >
              <motion.span
                initial={
                  shouldReduceMotion
                    ? false
                    : {
                        opacity: 0,
                        x: -25,
                      }
                }
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                transition={
                  shouldReduceMotion
                    ? {
                        duration: 0,
                      }
                    : {
                        duration: 0.65,
                        delay: 0.25,
                        ease: [0.22, 1, 0.36, 1],
                      }
                }
                className="inline-block"
              >
                I build modern web
              </motion.span>

              <span className="block">
                <motion.span
                  initial={
                    shouldReduceMotion
                      ? false
                      : {
                          opacity: 0,
                          x: 25,
                        }
                  }
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                  transition={
                    shouldReduceMotion
                      ? {
                          duration: 0,
                        }
                      : {
                          duration: 0.65,
                          delay: 0.4,
                          ease: [0.22, 1, 0.36, 1],
                        }
                  }
                  className="inline-block"
                >
                  applications that{" "}
                </motion.span>

                <motion.span
                  initial={
                    shouldReduceMotion
                      ? false
                      : {
                          opacity: 0,
                          y: 18,
                          scale: 0.96,
                        }
                  }
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                  }}
                  transition={
                    shouldReduceMotion
                      ? {
                          duration: 0,
                        }
                      : {
                          duration: 0.7,
                          delay: 0.55,
                          ease: [0.22, 1, 0.36, 1],
                        }
                  }
                  className="inline-block bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent"
                >
                  solve real problems.
                </motion.span>
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={
                shouldReduceMotion
                  ? false
                  : {
                      opacity: 0,
                      y: 18,
                    }
              }
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={
                shouldReduceMotion
                  ? {
                      duration: 0,
                    }
                  : {
                      duration: 0.7,
                      delay: 0.75,
                      ease: [0.22, 1, 0.36, 1],
                    }
              }
              className="mt-6 max-w-2xl text-base leading-7 text-base-content/65 sm:mt-7 sm:text-lg sm:leading-8"
            >
              <motion.span
                initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={
                  shouldReduceMotion
                    ? { duration: 0 }
                    : {
                        duration: 0.5,
                        delay: 0.85,
                      }
                }
              >
                I&apos;m Omar Faruk, a Full Stack Developer{" "}
              </motion.span>
              <motion.span
                initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={
                  shouldReduceMotion
                    ? { duration: 0 }
                    : {
                        duration: 0.5,
                        delay: 1,
                      }
                }
                className="font-medium text-base-content"
              >
                specializing in React, Node.js, Express, and MongoDB.
              </motion.span>{" "}
              <motion.span
                initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={
                  shouldReduceMotion
                    ? { duration: 0 }
                    : {
                        duration: 0.5,
                        delay: 1.15,
                      }
                }
              >
                I create fast, scalable, accessible, and user-focused digital
                experiences from frontend to backend.
              </motion.span>
            </motion.p>

            {/* Location */}
            <motion.div
              {...fadeUp(1.05)}
              className="mt-5 flex flex-wrap items-center gap-2 text-sm text-base-content/50"
            >
              <FiMapPin className="text-primary" />

              <span>Based in Bangladesh</span>

              <span
                className="mx-1 hidden h-1 w-1 rounded-full bg-base-content/30 sm:block"
                aria-hidden="true"
              />

              <span>Working Worldwide</span>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              {...fadeUp(1.15)}
              className="mt-8 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:flex-wrap"
            >
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
                className="group btn btn-primary min-h-12 h-12 rounded-xl border-none px-6 font-semibold shadow-lg shadow-primary/20 sm:px-7"
              >
                <span>View My Work</span>

                <FiArrowUpRight className="text-lg transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </motion.a>

              <motion.a
                href="/omar-faruk-resume.pdf"
                download
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
                className="btn min-h-12 h-12 rounded-xl border border-base-300 bg-base-100 px-6 font-semibold text-base-content shadow-sm hover:border-primary/40 hover:bg-base-200 sm:px-7"
              >
                <FiDownload className="text-lg" />
                <span>Download Resume</span>
              </motion.a>
            </motion.div>

            {/* Social Links */}
            <motion.div
              {...fadeUp(1.25)}
              className="mt-8 flex items-center gap-3 sm:mt-10"
            >
              <span className="mr-1 text-xs font-medium uppercase tracking-[0.16em] text-base-content/35">
                Connect
              </span>

              {SOCIAL_LINKS.map((social) => {
                const Icon = social.icon;
                const isExternal = social.href.startsWith("http");

                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noopener noreferrer" : undefined}
                    aria-label={social.label}
                    whileHover={
                      shouldReduceMotion
                        ? undefined
                        : {
                            y: -3,
                            scale: 1.04,
                          }
                    }
                    whileTap={
                      shouldReduceMotion
                        ? undefined
                        : {
                            scale: 0.95,
                          }
                    }
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-base-300 bg-base-100/60 text-base-content/60 transition-colors duration-200 hover:border-primary/40 hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                  >
                    <Icon className="text-lg" />
                  </motion.a>
                );
              })}
            </motion.div>

            {/* Core Technologies */}
            <motion.div
              {...fadeUp(1.35)}
              className="mt-10 border-t border-base-300 pt-6 sm:mt-12 sm:pt-7"
            >
              <p className="mb-3 text-xs font-medium uppercase tracking-[0.16em] text-base-content/35">
                Core Technologies
              </p>

              <div className="flex flex-wrap gap-2">
                {TECH_STACK.map((technology, index) => (
                  <motion.span
                    key={technology}
                    initial={
                      shouldReduceMotion
                        ? false
                        : {
                            opacity: 0,
                            y: 10,
                          }
                    }
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={
                      shouldReduceMotion
                        ? {
                            duration: 0,
                          }
                        : {
                            duration: 0.4,
                            delay: 1.4 + index * 0.08,
                          }
                    }
                    className="rounded-lg border border-base-300 bg-base-200/40 px-3 py-1.5 font-mono text-xs text-base-content/60 transition-colors hover:border-primary/30 hover:text-primary"
                  >
                    {technology}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Content */}
          <motion.div
            {...fadeUp(0.3)}
            className="relative mx-auto w-full max-w-[500px] lg:mx-0 lg:ml-auto"
          >
            {/* Photo Glow */}
            <motion.div
              animate={
                shouldReduceMotion
                  ? undefined
                  : {
                      scale: [1, 1.06, 1],
                      opacity: [0.45, 0.75, 0.45],
                    }
              }
              transition={
                shouldReduceMotion
                  ? undefined
                  : {
                      duration: 7,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }
              }
              className="absolute -inset-8 rounded-[3rem] bg-primary/10 blur-3xl"
              aria-hidden="true"
            />

            {/* Decorative Ring */}
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
                      duration: 30,
                      repeat: Infinity,
                      ease: "linear",
                    }
              }
              className="absolute -right-6 -top-6 h-28 w-28 rounded-full border border-primary/20 sm:-right-10 sm:-top-10 sm:h-36 sm:w-36"
              aria-hidden="true"
            />

            {/* Decorative Ring */}
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
                      duration: 36,
                      repeat: Infinity,
                      ease: "linear",
                    }
              }
              className="absolute -bottom-6 -left-6 h-24 w-24 rounded-full border border-secondary/20 sm:-bottom-10 sm:-left-10 sm:h-32 sm:w-32"
              aria-hidden="true"
            />

            {/* Photo Card */}
            <div className="relative rounded-[2rem] border border-base-300 bg-base-200/50 p-2 shadow-2xl shadow-black/10 backdrop-blur-md sm:rounded-[2.5rem] sm:p-3">
              <div className="relative overflow-hidden rounded-[1.5rem] bg-base-100 sm:rounded-[2rem]">
                {/* Image */}
                <div className="relative aspect-[4/5] overflow-hidden bg-base-200">
                  <img
                    src={omarfarukPhoto}
                    alt="Omar Faruk - Full Stack Developer"
                    className="h-full w-full object-cover object-center"
                    loading="eager"
                    fetchPriority="high"
                  />

                  {/* Image Overlay */}
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-base-100 via-transparent to-transparent opacity-90"
                    aria-hidden="true"
                  />

                  <div
                    className="absolute -bottom-20 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-primary/20 blur-3xl"
                    aria-hidden="true"
                  />
                </div>

                {/* Developer Info */}
                <div className="relative -mt-16 px-5 pb-5 sm:-mt-20 sm:px-7 sm:pb-7">
                  <div className="rounded-2xl border border-base-300 bg-base-100/90 p-4 shadow-xl backdrop-blur-xl sm:rounded-3xl sm:p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-primary">
                          Developer
                        </p>

                        <h2 className="mt-1 text-xl font-bold tracking-tight text-base-content sm:text-2xl">
                          Omar Faruk
                        </h2>

                        <p className="mt-1 text-sm text-base-content/50">
                          Full Stack / MERN Developer
                        </p>
                      </div>

                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <FiCode className="text-lg" />
                      </div>
                    </div>

                    <div className="mt-4 flex items-center gap-2 border-t border-base-300 pt-4">
                      <span className="h-2 w-2 rounded-full bg-success" />

                      <span className="text-xs text-base-content/55">
                        Open to new opportunities
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Clean Code Card */}
            <motion.div
              animate={
                shouldReduceMotion
                  ? undefined
                  : {
                      y: [0, -8, 0],
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
              className="absolute -left-3 top-8 z-20 hidden rounded-2xl border border-base-300 bg-base-100/90 px-4 py-3 shadow-xl backdrop-blur-md sm:block lg:-left-8"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <FiTerminal />
                </div>

                <div>
                  <p className="text-xs font-semibold text-base-content">
                    Clean Code
                  </p>

                  <p className="text-[10px] text-base-content/45">
                    Built to scale
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Floating MERN Card */}
            <motion.div
              animate={
                shouldReduceMotion
                  ? undefined
                  : {
                      y: [0, -8, 0],
                    }
              }
              transition={
                shouldReduceMotion
                  ? undefined
                  : {
                      duration: 5,
                      delay: 1,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }
              }
              className="absolute -bottom-5 -right-2 z-20 hidden rounded-2xl border border-base-300 bg-base-100/90 px-4 py-3 shadow-xl backdrop-blur-md sm:block lg:-right-8"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  <FiCode />
                </div>

                <div>
                  <p className="text-xs font-semibold text-base-content">
                    MERN Stack
                  </p>

                  <p className="text-[10px] text-base-content/45">
                    Frontend + Backend
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Bottom Info Cards */}
            <motion.div
              {...fadeUp(0.8)}
              className="mt-5 grid grid-cols-2 gap-3 sm:mt-6"
            >
              <div className="rounded-2xl border border-base-300 bg-base-100/70 p-4 backdrop-blur-sm">
                <div className="flex items-center gap-2">
                  <FiCode className="text-primary" />

                  <span className="text-xs text-base-content/45">Stack</span>
                </div>

                <p className="mt-2 text-sm font-bold text-base-content">MERN</p>
              </div>

              <div className="rounded-2xl border border-base-300 bg-base-100/70 p-4 backdrop-blur-sm">
                <div className="flex items-center gap-2">
                  <FiTerminal className="text-secondary" />

                  <span className="text-xs text-base-content/45">Focus</span>
                </div>

                <p className="mt-2 text-sm font-bold text-base-content">
                  Web Apps
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.a
        href="#about"
        initial={
          shouldReduceMotion
            ? false
            : {
                opacity: 0,
              }
        }
        animate={{
          opacity: 1,
        }}
        transition={{
          delay: shouldReduceMotion ? 0 : 1.6,
          duration: shouldReduceMotion ? 0 : 0.5,
        }}
        className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-base-content/35 transition-colors hover:text-primary lg:flex"
        aria-label="Scroll to About section"
      >
        <span className="font-mono text-[9px] uppercase tracking-[0.2em]">
          Scroll
        </span>

        <motion.span
          animate={
            shouldReduceMotion
              ? undefined
              : {
                  y: [0, 5, 0],
                }
          }
          transition={
            shouldReduceMotion
              ? undefined
              : {
                  duration: 1.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }
          }
        >
          <FiArrowDown />
        </motion.span>
      </motion.a>
    </section>
  );
};

export default HeroSection;
