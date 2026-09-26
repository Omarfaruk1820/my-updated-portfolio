import { motion, useReducedMotion } from "framer-motion";
import {
  FiArrowUpRight,
  FiBriefcase,
  FiCheckCircle,
  FiCode,
  FiDatabase,
  FiLayers,
  FiMapPin,
  FiServer,
  FiTerminal,
  FiUser,
} from "react-icons/fi";

const ABOUT_POINTS = [
  {
    icon: FiCode,
    title: "Frontend Development",
    description:
      "Building responsive and accessible interfaces with React, modern JavaScript, and reusable component architecture.",
  },
  {
    icon: FiServer,
    title: "Backend Development",
    description:
      "Designing reliable APIs and server-side applications with Node.js, Express, authentication, and clean architecture.",
  },
  {
    icon: FiDatabase,
    title: "Database & APIs",
    description:
      "Working with MongoDB and REST APIs to create structured, scalable, and maintainable data-driven applications.",
  },
];

const VALUES = [
  "Clean and maintainable code",
  "Responsive and accessible interfaces",
  "Scalable application architecture",
  "Performance-focused development",
];

const ABOUT_STATS = [
  {
    value: "MERN",
    label: "Primary Stack",
  },
  {
    value: "Full Stack",
    label: "Development Focus",
  },
  {
    value: "Web Apps",
    label: "Core Expertise",
  },
];

const About = () => {
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
          duration: 0.7,
          delay,
          ease: [0.22, 1, 0.36, 1],
        },
  });

  return (
    <section
      id="about"
      aria-labelledby="about-title"
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
        {/* Top Glow */}
        <motion.div
          animate={
            shouldReduceMotion
              ? undefined
              : {
                  x: [0, 30, 0],
                  y: [0, -20, 0],
                  scale: [1, 1.05, 1],
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
          className="
            absolute
            left-1/2
            top-[-180px]
            h-[360px]
            w-[360px]
            -translate-x-1/2
            rounded-full
            bg-primary/7
            blur-3xl
            sm:h-[480px]
            sm:w-[480px]
            lg:h-[600px]
            lg:w-[600px]
          "
        />

        {/* Right Glow */}
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
                  duration: 14,
                  repeat: Infinity,
                  ease: "easeInOut",
                }
          }
          className="
            absolute
            -right-40
            top-[35%]
            h-[300px]
            w-[300px]
            rounded-full
            bg-secondary/7
            blur-3xl
            sm:h-[420px]
            sm:w-[420px]
          "
        />

        {/* Left Accent */}
        <div
          className="
            absolute
            -left-32
            bottom-[5%]
            h-[260px]
            w-[260px]
            rounded-full
            bg-accent/5
            blur-3xl
            sm:h-[360px]
            sm:w-[360px]
          "
        />

        {/* Subtle Grid */}
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
          CONTAINER
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
            <FiUser />

            <span>About Me</span>
          </motion.div>

          <motion.h2
            id="about-title"
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
            Turning ideas into{" "}
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
              meaningful products.
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
            I&apos;m a Full Stack Developer focused on building modern,
            scalable, and user-centered web applications that combine clean
            engineering with thoughtful user experiences.
          </motion.p>
        </div>

        {/* =======================================================
            MAIN ABOUT CONTENT
        ======================================================== */}
        <div
          className="
            mt-14
            grid
            items-center
            gap-10
            lg:mt-20
            lg:grid-cols-[0.9fr_1.1fr]
            lg:gap-16
            xl:gap-24
          "
        >
          {/* =====================================================
              PROFILE / VISUAL SIDE
          ====================================================== */}
          <motion.div
            {...fadeUp(0.15)}
            className="relative mx-auto w-full max-w-xl lg:mx-0"
          >
            {/* Main Visual Card */}
            <div
              className="
                relative
                overflow-hidden
                rounded-[2rem]
                border
                border-base-300
                bg-base-200/40
                p-3
                shadow-2xl
                shadow-black/10
                backdrop-blur-md
                sm:rounded-[2.5rem]
                sm:p-4
              "
            >
              {/* Top Code Header */}
              <div
                className="
                  flex
                  items-center
                  justify-between
                  border-b
                  border-base-300
                  px-3
                  pb-3
                  sm:px-4
                  sm:pb-4
                "
              >
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-error/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-warning/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-success/70" />
                </div>

                <div
                  className="
                    flex
                    items-center
                    gap-2
                    font-mono
                    text-[10px]
                    text-base-content/35
                    sm:text-xs
                  "
                >
                  <FiTerminal />

                  <span>developer.profile</span>
                </div>
              </div>

              {/* Code Content */}
              <div
                className="
                  relative
                  min-h-[330px]
                  px-4
                  py-7
                  sm:min-h-[390px]
                  sm:px-7
                  sm:py-9
                "
              >
                {/* Decorative Orbit */}
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
                          duration: 32,
                          repeat: Infinity,
                          ease: "linear",
                        }
                  }
                  className="
                    absolute
                    right-[-100px]
                    top-[-70px]
                    h-[240px]
                    w-[240px]
                    rounded-full
                    border
                    border-primary/10
                    sm:right-[-110px]
                    sm:top-[-80px]
                    sm:h-[300px]
                    sm:w-[300px]
                  "
                >
                  <span
                    className="
                      absolute
                      bottom-1/2
                      left-[-3px]
                      h-1.5
                      w-1.5
                      rounded-full
                      bg-primary
                      shadow-lg
                      shadow-primary/50
                    "
                  />
                </motion.div>

                {/* Decorative Orbit */}
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
                          duration: 42,
                          repeat: Infinity,
                          ease: "linear",
                        }
                  }
                  className="
                    absolute
                    bottom-[-100px]
                    left-[-80px]
                    h-[230px]
                    w-[230px]
                    rounded-full
                    border
                    border-secondary/10
                    sm:bottom-[-120px]
                    sm:left-[-100px]
                    sm:h-[290px]
                    sm:w-[290px]
                  "
                >
                  <span
                    className="
                      absolute
                      right-[-3px]
                      top-1/2
                      h-1.5
                      w-1.5
                      -translate-y-1/2
                      rounded-full
                      bg-secondary
                      shadow-lg
                      shadow-secondary/50
                    "
                  />
                </motion.div>

                {/* Code Lines */}
                <div
                  className="
                    relative
                    z-10
                    font-mono
                    text-xs
                    leading-7
                    text-base-content/45
                    sm:text-sm
                    sm:leading-8
                  "
                >
                  <p>
                    <span className="text-primary">const</span>{" "}
                    <span className="text-base-content">developer</span>{" "}
                    <span className="text-secondary">=</span>{" "}
                    <span className="text-accent">{"{"}</span>
                  </p>

                  <p className="pl-5">
                    <span className="text-base-content/35">name:</span>{" "}
                    <span className="text-success">&quot;Omar Faruk&quot;</span>
                    ,
                  </p>

                  <p className="pl-5">
                    <span className="text-base-content/35">role:</span>{" "}
                    <span className="text-success">
                      &quot;Full Stack Developer&quot;
                    </span>
                    ,
                  </p>

                  <p className="pl-5">
                    <span className="text-base-content/35">stack:</span>{" "}
                    <span className="text-accent">[</span>
                  </p>

                  <p className="pl-10 text-primary">
                    &quot;React&quot;, &quot;Node.js&quot;,
                  </p>

                  <p className="pl-10 text-primary">
                    &quot;Express&quot;, &quot;MongoDB&quot;
                  </p>

                  <p className="pl-5">
                    <span className="text-accent">]</span>,
                  </p>

                  <p className="pl-5">
                    <span className="text-base-content/35">location:</span>{" "}
                    <span className="text-success">&quot;Bangladesh&quot;</span>
                    ,
                  </p>

                  <p className="pl-5">
                    <span className="text-base-content/35">focus:</span>{" "}
                    <span className="text-success">
                      &quot;Scalable Web Apps&quot;
                    </span>
                  </p>

                  <p>
                    <span className="text-accent">{"}"}</span>;
                  </p>
                </div>

                {/* Status */}
                <div
                  className="
                    absolute
                    bottom-5
                    left-4
                    right-4
                    z-10
                    flex
                    items-center
                    justify-between
                    rounded-2xl
                    border
                    border-base-300
                    bg-base-100/80
                    px-4
                    py-3
                    backdrop-blur-xl
                    sm:bottom-6
                    sm:left-7
                    sm:right-7
                  "
                >
                  <div className="flex items-center gap-2.5">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-50" />
                      <span className="relative h-2.5 w-2.5 rounded-full bg-success" />
                    </span>

                    <span className="text-xs font-medium text-base-content/65">
                      Currently building
                    </span>
                  </div>

                  <FiCode className="text-primary" />
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="mt-4 grid grid-cols-3 gap-3 sm:mt-5">
              {ABOUT_STATS.map((stat, index) => (
                <motion.div
                  key={stat.label}
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
                    amount: 0.2,
                  }}
                  transition={
                    shouldReduceMotion
                      ? {
                          duration: 0,
                        }
                      : {
                          duration: 0.5,
                          delay: 0.25 + index * 0.1,
                        }
                  }
                  className="
                    rounded-2xl
                    border
                    border-base-300
                    bg-base-100/70
                    p-3
                    text-center
                    backdrop-blur-sm
                    sm:p-4
                  "
                >
                  <p
                    className="
                      text-sm
                      font-black
                      tracking-tight
                      text-base-content
                      sm:text-base
                    "
                  >
                    {stat.value}
                  </p>

                  <p className="mt-1 text-[10px] text-base-content/45 sm:text-xs">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* =====================================================
              CONTENT SIDE
          ====================================================== */}
          <div className="relative z-10">
            <motion.div {...fadeUp(0.2)}>
              <div className="mb-4 flex items-center gap-2">
                <span className="h-px w-8 bg-primary" />

                <span
                  className="
                    font-mono
                    text-xs
                    font-semibold
                    uppercase
                    tracking-[0.18em]
                    text-primary
                  "
                >
                  Who I Am
                </span>
              </div>

              <h3
                className="
                  max-w-2xl
                  text-2xl
                  font-bold
                  leading-tight
                  tracking-tight
                  text-base-content
                  sm:text-3xl
                  lg:text-4xl
                "
              >
                I care about both{" "}
                <span className="text-primary">how things look</span> and{" "}
                <span className="text-secondary">how they work.</span>
              </h3>

              <div
                className="
                  mt-6
                  space-y-4
                  text-base
                  leading-7
                  text-base-content/60
                  sm:text-lg
                  sm:leading-8
                "
              >
                <p>
                  I&apos;m Omar Faruk, a Full Stack Developer who enjoys turning
                  ideas, requirements, and real-world problems into reliable
                  digital products.
                </p>

                <p>
                  My development approach combines modern frontend engineering
                  with solid backend architecture. I focus on creating
                  interfaces that feel intuitive while keeping the underlying
                  code clean, reusable, and easy to maintain.
                </p>

                <p>
                  From designing responsive React interfaces to developing APIs,
                  authentication systems, and MongoDB-powered applications, I
                  enjoy working across the complete development lifecycle.
                </p>
              </div>
            </motion.div>

            {/* Location / Availability */}
            <motion.div
              {...fadeUp(0.3)}
              className="
                mt-7
                flex
                flex-wrap
                gap-3
              "
            >
              <div
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-xl
                  border
                  border-base-300
                  bg-base-200/40
                  px-3.5
                  py-2.5
                  text-sm
                  text-base-content/60
                "
              >
                <FiMapPin className="text-primary" />

                <span>Bangladesh</span>
              </div>

              <div
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-xl
                  border
                  border-base-300
                  bg-base-200/40
                  px-3.5
                  py-2.5
                  text-sm
                  text-base-content/60
                "
              >
                <FiBriefcase className="text-secondary" />

                <span>Open to opportunities</span>
              </div>
            </motion.div>

            {/* Values */}
            <motion.div
              {...fadeUp(0.4)}
              className="
                mt-9
                border-t
                border-base-300
                pt-7
              "
            >
              <div className="mb-5 flex items-center gap-2">
                <FiLayers className="text-primary" />

                <h4 className="text-sm font-bold text-base-content">
                  What I Bring
                </h4>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {VALUES.map((value, index) => (
                  <motion.div
                    key={value}
                    initial={
                      shouldReduceMotion
                        ? false
                        : {
                            opacity: 0,
                            x: -12,
                          }
                    }
                    whileInView={{
                      opacity: 1,
                      x: 0,
                    }}
                    viewport={{
                      once: true,
                      amount: 0.2,
                    }}
                    transition={
                      shouldReduceMotion
                        ? {
                            duration: 0,
                          }
                        : {
                            duration: 0.45,
                            delay: 0.45 + index * 0.08,
                          }
                    }
                    className="
                      flex
                      items-start
                      gap-3
                      rounded-xl
                      border
                      border-base-300
                      bg-base-100/50
                      p-3.5
                      transition-colors
                      duration-200
                      hover:border-primary/30
                      hover:bg-base-200/40
                    "
                  >
                    <FiCheckCircle
                      className="
                        mt-0.5
                        shrink-0
                        text-sm
                        text-primary
                      "
                    />

                    <span className="text-sm leading-6 text-base-content/65">
                      {value}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* CTA */}
            <motion.div {...fadeUp(0.55)} className="mt-8">
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
                  inline-flex
                  min-h-12
                  items-center
                  gap-2.5
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
                  sm:px-6
                "
              >
                <span>Explore My Work</span>

                <FiArrowUpRight
                  className="
                    text-lg
                    transition-transform
                    duration-200
                    group-hover:-translate-y-0.5
                    group-hover:translate-x-0.5
                  "
                />
              </motion.a>
            </motion.div>
          </div>
        </div>

        {/* =======================================================
            EXPERTISE CARDS
        ======================================================== */}
        <div className="mt-20 sm:mt-24 lg:mt-32">
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
                  Expertise
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
                Building across the full stack.
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
              From user interfaces to APIs and databases, I focus on creating
              complete products that are reliable, maintainable, and ready to
              grow.
            </p>
          </motion.div>

          <div className="grid gap-4 md:grid-cols-3">
            {ABOUT_POINTS.map((point, index) => {
              const Icon = point.icon;

              return (
                <motion.article
                  key={point.title}
                  initial={
                    shouldReduceMotion
                      ? false
                      : {
                          opacity: 0,
                          y: 24,
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
                          duration: 0.6,
                          delay: index * 0.1,
                          ease: [0.22, 1, 0.36, 1],
                        }
                  }
                  whileHover={
                    shouldReduceMotion
                      ? undefined
                      : {
                          y: -5,
                        }
                  }
                  className="
                    group
                    rounded-2xl
                    border
                    border-base-300
                    bg-base-100/70
                    p-5
                    shadow-sm
                    backdrop-blur-sm
                    transition-all
                    duration-300
                    hover:border-primary/30
                    hover:shadow-xl
                    hover:shadow-primary/5
                    sm:p-6
                  "
                >
                  {/* Icon */}
                  <div
                    className="
                      flex
                      h-12
                      w-12
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

                  <h4
                    className="
                      mt-5
                      text-lg
                      font-bold
                      tracking-tight
                      text-base-content
                    "
                  >
                    {point.title}
                  </h4>

                  <p
                    className="
                      mt-2.5
                      text-sm
                      leading-6
                      text-base-content/55
                    "
                  >
                    {point.description}
                  </p>

                  {/* Bottom Accent */}
                  <div
                    className="
                      mt-6
                      h-px
                      w-10
                      bg-primary/30
                      transition-all
                      duration-300
                      group-hover:w-16
                      group-hover:bg-primary
                    "
                  />
                </motion.article>
              );
            })}
          </div>
        </div>

        {/* =======================================================
            BOTTOM STATEMENT
        ======================================================== */}
        <motion.div
          {...fadeUp(0.2)}
          className="
            relative
            mt-14
            overflow-hidden
            rounded-2xl
            border
            border-base-300
            bg-base-200/30
            p-6
            text-center
            backdrop-blur-sm
            sm:mt-16
            sm:p-8
            lg:mt-20
          "
        >
          {/* Decorative Line */}
          <div
            className="
              absolute
              left-1/2
              top-0
              h-px
              w-32
              -translate-x-1/2
              bg-gradient-to-r
              from-transparent
              via-primary
              to-transparent
            "
            aria-hidden="true"
          />

          <FiTerminal className="mx-auto text-xl text-primary/70" />

          <p
            className="
              mx-auto
              mt-4
              max-w-3xl
              text-base
              font-medium
              leading-7
              text-base-content/65
              sm:text-lg
              sm:leading-8
            "
          >
            Good software is more than code. It&apos;s about understanding the
            problem, designing the right solution, and building something that
            people can actually rely on.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
