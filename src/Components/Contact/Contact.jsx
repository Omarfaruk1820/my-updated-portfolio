import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import axios from "axios";
import {
  FiArrowUpRight,
  FiBriefcase,
  FiCheck,
  FiCheckCircle,
  FiChevronRight,
  FiClock,
  FiCode,
  FiDatabase,
  FiGithub,
  FiGlobe,
  FiLayers,
  FiLinkedin,
  FiLoader,
  FiMail,
  FiMapPin,
  FiMessageCircle,
  FiPhone,
  FiSend,
  FiServer,
  FiShield,
  FiUser,
} from "react-icons/fi";
import { Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const OWNER_EMAIL = "omarfarukfci9th@gmail.com";

const CONTACT_INFO = [
  {
    icon: FiMail,
    label: "Email",
    value: OWNER_EMAIL,
    href: `mailto:${OWNER_EMAIL}`,
  },
  {
    icon: FiMapPin,
    label: "Location",
    value: "Bangladesh",
    href: null,
  },
  {
    icon: FiClock,
    label: "Availability",
    value: "Available for freelance projects",
    href: null,
  },
];

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
];

const SERVICES = [
  {
    icon: FiGlobe,
    title: "Business Websites",
    description:
      "Professional, responsive websites designed to build trust and convert visitors into customers.",
  },
  {
    icon: FiCode,
    title: "Full-Stack Applications",
    description:
      "Complete MERN stack applications with modern frontend, scalable backend, REST APIs, and MongoDB.",
  },
  {
    icon: FiLayers,
    title: "E-commerce Solutions",
    description:
      "Feature-rich online stores with product management, authentication, dashboards, and order workflows.",
  },
  {
    icon: FiServer,
    title: "Backend & REST APIs",
    description:
      "Secure and maintainable Node.js and Express.js APIs for web applications and third-party integrations.",
  },
  {
    icon: FiDatabase,
    title: "Database Solutions",
    description:
      "MongoDB database architecture, data modeling, queries, indexes, and application data management.",
  },
  {
    icon: FiShield,
    title: "Authentication & Security",
    description:
      "Secure authentication, protected routes, role-based access, validation, and production-ready API practices.",
  },
];

const PROJECT_TYPES = [
  "Business Website",
  "Full-Stack Web Application",
  "E-commerce Website",
  "Admin Dashboard",
  "REST API / Backend",
  "Website Improvement",
  "Custom Software",
];

const INITIAL_FORM_VALUES = {
  name: "",
  email: "",
  phone: "",
  service: "",
  subject: "",
  message: "",
  website: "",
};

const Contact = () => {
  const shouldReduceMotion = useReducedMotion();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: INITIAL_FORM_VALUES,
    mode: "onBlur",
  });

  const onSubmit = async (data) => {
    // Honeypot spam protection
    if (data.website) {
      reset(INITIAL_FORM_VALUES);

      toast.success("Your message has been sent.");

      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        name: data.name.trim(),
        email: data.email.trim().toLowerCase(),
        phone: data.phone.trim(),
        service: data.service.trim(),
        subject: data.subject.trim(),
        message: data.message.trim(),
      };

      const response = await axios.post(`${API_URL}/api/contact`, payload, {
        timeout: 15000,
      });

      if (!response?.data?.success) {
        throw new Error(
          response?.data?.message || "Unable to submit your message.",
        );
      }

      toast.success(
        response.data.message ||
          "Thanks for reaching out! Your project inquiry has been sent successfully.",
      );

      reset(INITIAL_FORM_VALUES);
    } catch (error) {
      console.error("Contact form submission error:", error);

      const message =
        error?.response?.data?.message ||
        (error?.code === "ECONNABORTED"
          ? "The request took too long. Please try again."
          : "Something went wrong. Please try again later.");

      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const fadeUp = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 24,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.6,
        ease: "easeOut",
      },
    },
  };

  const staggerContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.08,
      },
    },
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-base-100 text-base-content">
      {/* =========================================================
          BACKGROUND
      ========================================================= */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute left-[-10rem] top-[-10rem] h-80 w-80 rounded-full bg-primary/10 blur-3xl" />

        <div className="absolute right-[-10rem] top-[25rem] h-96 w-96 rounded-full bg-secondary/10 blur-3xl" />

        <div className="absolute bottom-[-12rem] left-1/3 h-96 w-96 rounded-full bg-accent/5 blur-3xl" />

        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)",
            backgroundSize: "42px 42px",
          }}
        />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        {/* =========================================================
            HERO
        ========================================================= */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="mx-auto max-w-4xl text-center"
        >
          <motion.div variants={fadeUp}>
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-primary">
              <FiMessageCircle aria-hidden="true" className="text-sm" />
              Start a project
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="mt-6 text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl"
          >
            Let&apos;s build something{" "}
            <span className="text-primary">valuable.</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-base-content/65 sm:text-base sm:leading-8"
          >
            Have a website, web application, e-commerce platform, dashboard, or
            custom software idea? Tell me what you&apos;re building and
            I&apos;ll help turn your idea into a reliable digital product.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-7 flex flex-wrap items-center justify-center gap-3 text-xs font-medium text-base-content/55"
          >
            <span className="inline-flex items-center gap-2">
              <FiCheckCircle aria-hidden="true" className="text-primary" />
              Full-Stack Development
            </span>

            <span className="hidden text-base-content/20 sm:inline">•</span>

            <span className="inline-flex items-center gap-2">
              <FiCheckCircle aria-hidden="true" className="text-primary" />
              MERN Stack
            </span>

            <span className="hidden text-base-content/20 sm:inline">•</span>

            <span className="inline-flex items-center gap-2">
              <FiCheckCircle aria-hidden="true" className="text-primary" />
              Custom Software
            </span>
          </motion.div>
        </motion.div>

        {/* =========================================================
            MAIN GRID
        ========================================================= */}
        <div className="mt-14 grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-start lg:gap-10">
          {/* =====================================================
              LEFT COLUMN
          ===================================================== */}
          <motion.aside
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.1,
            }}
            variants={staggerContainer}
            className="space-y-6"
          >
            {/* Service Introduction */}
            <motion.div
              variants={fadeUp}
              className="rounded-3xl border border-base-300 bg-base-200/40 p-6 shadow-sm sm:p-7"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <FiBriefcase aria-hidden="true" className="text-xl" />
              </div>

              <p className="mt-5 text-xs font-bold uppercase tracking-[0.16em] text-primary">
                Software services
              </p>

              <h2 className="mt-2 text-2xl font-bold">
                From idea to production
              </h2>

              <p className="mt-3 text-sm leading-7 text-base-content/65">
                I help businesses, startups, and individuals build modern
                websites and full-stack software products that are responsive,
                maintainable, and ready for real-world use.
              </p>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-base-300 bg-base-100/70 p-4">
                  <p className="text-2xl font-black text-primary">MERN</p>

                  <p className="mt-1 text-xs text-base-content/55">
                    Full-stack development
                  </p>
                </div>

                <div className="rounded-2xl border border-base-300 bg-base-100/70 p-4">
                  <p className="text-2xl font-black text-primary">API</p>

                  <p className="mt-1 text-xs text-base-content/55">
                    Backend integration
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              variants={fadeUp}
              className="rounded-3xl border border-base-300 bg-base-200/40 p-6 shadow-sm sm:p-7"
            >
              <h2 className="text-lg font-bold">Contact information</h2>

              <p className="mt-2 text-sm leading-6 text-base-content/60">
                Prefer direct communication? You can reach me through the
                information below.
              </p>

              <div className="mt-5 space-y-3">
                {CONTACT_INFO.map((item) => {
                  const Icon = item.icon;

                  const content = (
                    <div className="flex items-start gap-4 rounded-2xl border border-base-300 bg-base-100/60 p-4 transition-all duration-200 hover:border-primary/40 hover:bg-base-100">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <Icon aria-hidden="true" className="text-lg" />
                      </div>

                      <div className="min-w-0">
                        <p className="text-xs font-medium uppercase tracking-wider text-base-content/45">
                          {item.label}
                        </p>

                        <p className="mt-1 break-words text-sm font-semibold text-base-content">
                          {item.value}
                        </p>
                      </div>
                    </div>
                  );

                  return item.href ? (
                    <a key={item.label} href={item.href} className="block">
                      {content}
                    </a>
                  ) : (
                    <div key={item.label}>{content}</div>
                  );
                })}
              </div>
            </motion.div>

            {/* Services */}
            <motion.div
              variants={fadeUp}
              className="rounded-3xl border border-base-300 bg-base-200/40 p-6 shadow-sm sm:p-7"
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">
                    What I can build
                  </p>

                  <h2 className="mt-2 text-lg font-bold">Software solutions</h2>
                </div>

                <FiArrowUpRight
                  aria-hidden="true"
                  className="shrink-0 text-xl text-primary"
                />
              </div>

              <div className="mt-5 space-y-3">
                {SERVICES.slice(0, 4).map((service) => {
                  const Icon = service.icon;

                  return (
                    <div
                      key={service.title}
                      className="group rounded-2xl border border-base-300 bg-base-100/50 p-4 transition-all duration-200 hover:border-primary/30 hover:bg-base-100"
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                          <Icon aria-hidden="true" className="text-base" />
                        </div>

                        <div className="min-w-0">
                          <h3 className="text-sm font-semibold">
                            {service.title}
                          </h3>

                          <p className="mt-1 text-xs leading-5 text-base-content/55">
                            {service.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {/* Social Links */}
            <motion.div
              variants={fadeUp}
              className="rounded-3xl border border-base-300 bg-base-200/40 p-6 shadow-sm sm:p-7"
            >
              <h2 className="text-lg font-bold">Find me online</h2>

              <p className="mt-2 text-sm leading-6 text-base-content/60">
                Explore my work, projects, and professional background.
              </p>

              <div className="mt-5 flex flex-wrap gap-3">
                {SOCIAL_LINKS.map((social) => {
                  const Icon = social.icon;

                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Visit my ${social.label} profile`}
                      className="group inline-flex items-center gap-2 rounded-xl border border-base-300 bg-base-100 px-4 py-2.5 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:text-primary"
                    >
                      <Icon aria-hidden="true" className="text-base" />

                      {social.label}

                      <FiArrowUpRight
                        aria-hidden="true"
                        className="text-xs opacity-50 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </a>
                  );
                })}
              </div>
            </motion.div>
          </motion.aside>

          {/* =====================================================
              RIGHT COLUMN — CONTACT FORM
          ===================================================== */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.1,
            }}
            variants={fadeUp}
            className="rounded-3xl border border-base-300 bg-base-200/50 p-5 shadow-xl shadow-base-content/5 sm:p-7 lg:p-8"
          >
            {/* Form Header */}
            <div className="flex flex-col gap-5 border-b border-base-300 pb-6 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">
                  Project inquiry
                </p>

                <h2 className="mt-2 text-2xl font-bold sm:text-3xl">
                  Tell me what you&apos;re building
                </h2>

                <p className="mt-2 max-w-xl text-sm leading-6 text-base-content/60">
                  Give me a few details about your project, and I&apos;ll review
                  your requirements and get back to you.
                </p>
              </div>

              <div className="hidden shrink-0 sm:flex">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary">
                  <FiSend aria-hidden="true" className="text-xl" />
                </div>
              </div>
            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="mt-7 space-y-5"
              noValidate
            >
              {/* =================================================
                  HONEYPOT
              ================================================= */}
              <div
                className="absolute -left-[9999px] h-px w-px overflow-hidden"
                aria-hidden="true"
              >
                <label htmlFor="website">Website</label>

                <input
                  id="website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  {...register("website")}
                />
              </div>

              {/* =================================================
                  NAME + EMAIL
              ================================================= */}
              <div className="grid gap-5 sm:grid-cols-2">
                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-semibold"
                  >
                    Your name <span className="text-error">*</span>
                  </label>

                  <div className="relative">
                    <FiUser
                      aria-hidden="true"
                      className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-base-content/40"
                    />

                    <input
                      id="name"
                      type="text"
                      autoComplete="name"
                      placeholder="John Doe"
                      maxLength={80}
                      disabled={isSubmitting}
                      className={`input input-bordered w-full pl-11 ${
                        errors.name ? "input-error" : ""
                      }`}
                      {...register("name", {
                        required: "Please enter your name.",
                        minLength: {
                          value: 2,
                          message: "Name must be at least 2 characters.",
                        },
                        maxLength: {
                          value: 80,
                          message: "Name cannot exceed 80 characters.",
                        },
                      })}
                    />
                  </div>

                  {errors.name && (
                    <p className="mt-1.5 text-xs text-error">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-semibold"
                  >
                    Email address <span className="text-error">*</span>
                  </label>

                  <div className="relative">
                    <FiMail
                      aria-hidden="true"
                      className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-base-content/40"
                    />

                    <input
                      id="email"
                      type="email"
                      autoComplete="email"
                      placeholder="john@example.com"
                      maxLength={120}
                      disabled={isSubmitting}
                      className={`input input-bordered w-full pl-11 ${
                        errors.email ? "input-error" : ""
                      }`}
                      {...register("email", {
                        required: "Please enter your email address.",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Please enter a valid email address.",
                        },
                        maxLength: {
                          value: 120,
                          message: "Email cannot exceed 120 characters.",
                        },
                      })}
                    />
                  </div>

                  {errors.email && (
                    <p className="mt-1.5 text-xs text-error">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              {/* =================================================
                  PHONE + SERVICE
              ================================================= */}
              <div className="grid gap-5 sm:grid-cols-2">
                {/* Phone */}
                <div>
                  <label
                    htmlFor="phone"
                    className="mb-2 block text-sm font-semibold"
                  >
                    Phone number{" "}
                    <span className="font-normal text-base-content/45">
                      (optional)
                    </span>
                  </label>

                  <div className="relative">
                    <FiPhone
                      aria-hidden="true"
                      className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-base-content/40"
                    />

                    <input
                      id="phone"
                      type="tel"
                      autoComplete="tel"
                      placeholder="+880 1XXXXXXXXX"
                      maxLength={25}
                      disabled={isSubmitting}
                      className={`input input-bordered w-full pl-11 ${
                        errors.phone ? "input-error" : ""
                      }`}
                      {...register("phone", {
                        validate: (value) => {
                          const phone = value?.trim() || "";

                          if (!phone) {
                            return true;
                          }

                          return (
                            /^\+?[0-9\s().-]{7,25}$/.test(phone) ||
                            "Please enter a valid phone number."
                          );
                        },
                        maxLength: {
                          value: 25,
                          message: "Phone number cannot exceed 25 characters.",
                        },
                      })}
                    />
                  </div>

                  {errors.phone && (
                    <p className="mt-1.5 text-xs text-error">
                      {errors.phone.message}
                    </p>
                  )}
                </div>

                {/* Service */}
                <div>
                  <label
                    htmlFor="service"
                    className="mb-2 block text-sm font-semibold"
                  >
                    Service you need <span className="text-error">*</span>
                  </label>

                  <select
                    id="service"
                    disabled={isSubmitting}
                    className={`select select-bordered w-full ${
                      errors.service ? "select-error" : ""
                    }`}
                    {...register("service", {
                      required: "Please select a service.",
                    })}
                  >
                    <option value="">Select a service</option>

                    {PROJECT_TYPES.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>

                  {errors.service && (
                    <p className="mt-1.5 text-xs text-error">
                      {errors.service.message}
                    </p>
                  )}
                </div>
              </div>

              {/* =================================================
                  SUBJECT
              ================================================= */}
              <div>
                <label
                  htmlFor="subject"
                  className="mb-2 block text-sm font-semibold"
                >
                  Subject <span className="text-error">*</span>
                </label>

                <input
                  id="subject"
                  type="text"
                  placeholder="I need a full-stack web application"
                  maxLength={150}
                  disabled={isSubmitting}
                  className={`input input-bordered w-full ${
                    errors.subject ? "input-error" : ""
                  }`}
                  {...register("subject", {
                    required: "Please enter a subject.",
                    minLength: {
                      value: 5,
                      message: "Subject must be at least 5 characters.",
                    },
                    maxLength: {
                      value: 150,
                      message: "Subject cannot exceed 150 characters.",
                    },
                  })}
                />

                {errors.subject && (
                  <p className="mt-1.5 text-xs text-error">
                    {errors.subject.message}
                  </p>
                )}
              </div>

              {/* =================================================
                  PROJECT DETAILS
              ================================================= */}
              <div>
                <div className="mb-2 flex items-center justify-between gap-3">
                  <label
                    htmlFor="message"
                    className="block text-sm font-semibold"
                  >
                    Project details <span className="text-error">*</span>
                  </label>

                  <span className="hidden text-xs text-base-content/40 sm:block">
                    More details = better understanding
                  </span>
                </div>

                <textarea
                  id="message"
                  rows={8}
                  minLength={20}
                  maxLength={3000}
                  placeholder="Tell me about your project, goals, required features, target users, timeline, budget range, or anything else that would help me understand what you need..."
                  disabled={isSubmitting}
                  className={`textarea textarea-bordered min-h-48 w-full resize-y leading-7 ${
                    errors.message ? "textarea-error" : ""
                  }`}
                  {...register("message", {
                    required: "Please tell me about your project.",
                    minLength: {
                      value: 20,
                      message:
                        "Project details must be at least 20 characters.",
                    },
                    maxLength: {
                      value: 3000,
                      message: "Project details cannot exceed 3000 characters.",
                    },
                  })}
                />

                {errors.message && (
                  <p className="mt-1.5 text-xs text-error">
                    {errors.message.message}
                  </p>
                )}
              </div>

              {/* =================================================
                  TRUST NOTE + SUBMIT
              ================================================= */}
              <div className="flex flex-col gap-5 border-t border-base-300 pt-6 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex max-w-md items-start gap-2 text-xs leading-5 text-base-content/50">
                  <FiCheckCircle
                    aria-hidden="true"
                    className="mt-0.5 shrink-0 text-success"
                  />

                  <span>
                    Your information will only be used to understand your
                    project and respond to your inquiry.
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary w-full gap-2 rounded-xl px-7 sm:w-auto"
                >
                  {isSubmitting ? (
                    <>
                      <FiLoader aria-hidden="true" className="animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Project Inquiry
                      <FiSend aria-hidden="true" className="text-base" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.section>
        </div>

        {/* =========================================================
            SERVICES SECTION
        ========================================================= */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.08,
          }}
          variants={staggerContainer}
          className="mt-14"
        >
          <motion.div
            variants={fadeUp}
            className="mx-auto max-w-2xl text-center"
          >
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">
              Services
            </p>

            <h2 className="mt-2 text-2xl font-bold sm:text-3xl">
              What I can help you build
            </h2>

            <p className="mt-3 text-sm leading-7 text-base-content/60">
              From a simple business website to a complete full-stack software
              product, I focus on practical solutions built around your
              requirements.
            </p>
          </motion.div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((service) => {
              const Icon = service.icon;

              return (
                <motion.div
                  key={service.title}
                  variants={fadeUp}
                  className="group rounded-3xl border border-base-300 bg-base-200/35 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:bg-base-200/60"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-105">
                    <Icon aria-hidden="true" className="text-lg" />
                  </div>

                  <h3 className="mt-5 text-lg font-bold">{service.title}</h3>

                  <p className="mt-2 text-sm leading-6 text-base-content/60">
                    {service.description}
                  </p>

                  <div className="mt-5 flex items-center gap-1 text-xs font-semibold text-primary">
                    Discuss this service
                    <FiChevronRight
                      aria-hidden="true"
                      className="transition-transform duration-200 group-hover:translate-x-1"
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* =========================================================
            HOW I WORK
        ========================================================= */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.08,
          }}
          variants={staggerContainer}
          className="mt-14 rounded-3xl border border-base-300 bg-base-200/35 p-6 sm:p-8 lg:p-10"
        >
          <motion.div
            variants={fadeUp}
            className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center"
          >
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">
                Simple process
              </p>

              <h2 className="mt-2 text-2xl font-bold sm:text-3xl">
                From conversation to launch
              </h2>

              <p className="mt-4 max-w-lg text-sm leading-7 text-base-content/60">
                A clear development process keeps your project focused,
                transparent, and easier to manage from the first discussion to
                final delivery.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-base-300 bg-base-100/60 p-5">
                <span className="text-xs font-black text-primary">01</span>

                <h3 className="mt-2 font-bold">Understand</h3>

                <p className="mt-1 text-xs leading-5 text-base-content/55">
                  Discuss your goals, requirements, users, features, and project
                  scope.
                </p>
              </div>

              <div className="rounded-2xl border border-base-300 bg-base-100/60 p-5">
                <span className="text-xs font-black text-primary">02</span>

                <h3 className="mt-2 font-bold">Plan</h3>

                <p className="mt-1 text-xs leading-5 text-base-content/55">
                  Define the technology, architecture, pages, features, and
                  development approach.
                </p>
              </div>

              <div className="rounded-2xl border border-base-300 bg-base-100/60 p-5">
                <span className="text-xs font-black text-primary">03</span>

                <h3 className="mt-2 font-bold">Build</h3>

                <p className="mt-1 text-xs leading-5 text-base-content/55">
                  Develop the frontend, backend, database, APIs, authentication,
                  and required features.
                </p>
              </div>

              <div className="rounded-2xl border border-base-300 bg-base-100/60 p-5">
                <span className="text-xs font-black text-primary">04</span>

                <h3 className="mt-2 font-bold">Launch</h3>

                <p className="mt-1 text-xs leading-5 text-base-content/55">
                  Test, refine, deploy, and prepare the project for real-world
                  users.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.section>

        {/* =========================================================
            BOTTOM CTA
        ========================================================= */}
        <motion.div
          initial={{
            opacity: 0,
            y: shouldReduceMotion ? 0 : 20,
          }}
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
          className="mt-10 overflow-hidden rounded-3xl border border-primary/20 bg-primary/5 p-6 text-center sm:p-8 lg:p-10"
        >
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <FiCheck aria-hidden="true" className="text-xl" />
          </div>

          <p className="mt-5 text-xs font-bold uppercase tracking-[0.16em] text-primary">
            Ready when you are
          </p>

          <h2 className="mt-2 text-2xl font-black sm:text-3xl">
            Have an idea worth building?
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-base-content/60">
            Send your project details above. Whether you already have a complete
            specification or only a rough idea, we can start with a
            conversation.
          </p>

          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=omarfarukfci9th@gmail.com&su=Project%20Inquiry%20from%20Omar%20Faruk%20Portfolio"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary inline-flex items-center justify-center gap-2 rounded-xl px-6"
              aria-label="Email Omar Faruk directly"
            >
              <span>Email Me Directly</span>
              <FiMail aria-hidden="true" />
            </a>

            <Link
              to="/projects"
              className="btn btn-outline inline-flex items-center justify-center gap-2 rounded-xl px-6"
            >
              <span>View My Projects</span>
              <FiArrowUpRight aria-hidden="true" />
            </Link>
          </div>
        </motion.div>
      </div>
    </main>
  );
};

export default Contact;
