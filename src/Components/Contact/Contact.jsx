import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import axios from "axios";
import {
  FiArrowUpRight,
  FiCheckCircle,
  FiClock,
  FiGithub,
  FiLinkedin,
  FiMail,
  FiMapPin,
  FiMessageCircle,
  FiSend,
  FiUser,
} from "react-icons/fi";
import { Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const CONTACT_INFO = [
  {
    icon: FiMail,
    label: "Email",
    value: "hello@example.com",
    href: "mailto:hello@example.com",
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
    value: "Available for freelance work",
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

const INITIAL_FORM_VALUES = {
  name: "",
  email: "",
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
        subject: data.subject.trim(),
        message: data.message.trim(),
      };

      await axios.post(`${API_URL}/api/contact`, payload);

      toast.success(
        "Thanks for reaching out! Your message has been sent successfully.",
      );

      reset(INITIAL_FORM_VALUES);
    } catch (error) {
      console.error("Contact form submission error:", error);

      const message =
        error?.response?.data?.message ||
        "Something went wrong. Please try again later.";

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
      {/* Background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute left-[-8rem] top-[-8rem] h-72 w-72 rounded-full bg-primary/10 blur-3xl" />

        <div className="absolute right-[-8rem] top-[20rem] h-80 w-80 rounded-full bg-secondary/10 blur-3xl" />

        <div className="absolute bottom-[-10rem] left-1/3 h-80 w-80 rounded-full bg-accent/5 blur-3xl" />

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
        {/* Page Header */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="mx-auto max-w-3xl text-center"
        >
          <motion.div variants={fadeUp}>
            <span className="inline-flex items-center gap-2 rounded-full border border-base-300 bg-base-200/60 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              <FiMessageCircle className="text-sm" />
              Get in touch
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="mt-6 text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl"
          >
            Let&apos;s build something{" "}
            <span className="text-primary">meaningful.</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-base-content/65 sm:text-base sm:leading-8"
          >
            Have a project in mind, need a full-stack developer, or simply want
            to discuss an idea? Send me a message and I&apos;ll get back to you
            as soon as possible.
          </motion.p>
        </motion.div>

        {/* Main Contact Area */}
        <div className="mt-14 grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:gap-10">
          {/* Left Content */}
          <motion.aside
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={staggerContainer}
            className="space-y-6"
          >
            {/* Intro Card */}
            <motion.div
              variants={fadeUp}
              className="rounded-3xl border border-base-300 bg-base-200/40 p-6 shadow-sm sm:p-7"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <FiSend className="text-xl" />
              </div>

              <h2 className="mt-5 text-2xl font-bold">Start a conversation</h2>

              <p className="mt-3 text-sm leading-7 text-base-content/65">
                Whether you&apos;re looking for a complete MERN application, a
                modern frontend, a secure REST API, or help improving an
                existing project, I&apos;d be happy to hear about it.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {[
                  "MERN Stack",
                  "React.js",
                  "Node.js",
                  "MongoDB",
                  "REST API",
                  "Responsive UI",
                ].map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-base-300 bg-base-100 px-3 py-1.5 text-xs font-medium text-base-content/70"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              variants={fadeUp}
              className="rounded-3xl border border-base-300 bg-base-200/40 p-6 shadow-sm sm:p-7"
            >
              <h2 className="text-lg font-bold">Contact information</h2>

              <div className="mt-5 space-y-4">
                {CONTACT_INFO.map((item) => {
                  const Icon = item.icon;

                  const content = (
                    <div className="flex items-start gap-4 rounded-2xl border border-base-300 bg-base-100/60 p-4 transition-colors duration-200 hover:border-primary/40">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <Icon className="text-lg" />
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

            {/* Social Links */}
            <motion.div
              variants={fadeUp}
              className="rounded-3xl border border-base-300 bg-base-200/40 p-6 shadow-sm sm:p-7"
            >
              <h2 className="text-lg font-bold">Find me online</h2>

              <p className="mt-2 text-sm leading-6 text-base-content/60">
                You can also connect with me through my professional profiles.
              </p>

              <div className="mt-5 flex flex-wrap gap-3">
                {SOCIAL_LINKS.map((social) => {
                  const Icon = social.icon;

                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      className="group inline-flex items-center gap-2 rounded-xl border border-base-300 bg-base-100 px-4 py-2.5 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:text-primary"
                    >
                      <Icon className="text-base" />
                      {social.label}
                      <FiArrowUpRight className="text-xs opacity-50 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  );
                })}
              </div>
            </motion.div>
          </motion.aside>

          {/* Contact Form */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={fadeUp}
            className="rounded-3xl border border-base-300 bg-base-200/50 p-5 shadow-xl shadow-base-content/5 sm:p-7 lg:p-8"
          >
            <div className="flex flex-col gap-4 border-b border-base-300 pb-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">
                  Contact form
                </p>

                <h2 className="mt-2 text-2xl font-bold sm:text-3xl">
                  Tell me about your project
                </h2>

                <p className="mt-2 max-w-xl text-sm leading-6 text-base-content/60">
                  Share a few details about what you&apos;re building and
                  I&apos;ll get back to you.
                </p>
              </div>

              <div className="hidden shrink-0 sm:flex">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary">
                  <FiMail className="text-xl" />
                </div>
              </div>
            </div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="mt-7 space-y-5"
              noValidate
            >
              {/* Honeypot */}
              <div
                className="absolute -left-[9999px] h-px w-px overflow-hidden"
                aria-hidden="true"
              >
                <label htmlFor="website">Website</label>
                <input
                  id="website"
                  type="text"
                  tabIndex="-1"
                  autoComplete="off"
                  {...register("website")}
                />
              </div>

              {/* Name + Email */}
              <div className="grid gap-5 sm:grid-cols-2">
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

              {/* Subject */}
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
                  placeholder="Let's build a full-stack web application"
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

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-semibold"
                >
                  Message <span className="text-error">*</span>
                </label>

                <textarea
                  id="message"
                  rows={7}
                  placeholder="Tell me about your project, goals, features, timeline, or anything else that would help me understand what you need..."
                  className={`textarea textarea-bordered min-h-40 w-full resize-y leading-7 ${
                    errors.message ? "textarea-error" : ""
                  }`}
                  {...register("message", {
                    required: "Please enter your message.",
                    minLength: {
                      value: 20,
                      message: "Message must be at least 20 characters.",
                    },
                    maxLength: {
                      value: 3000,
                      message: "Message cannot exceed 3000 characters.",
                    },
                  })}
                />

                {errors.message && (
                  <p className="mt-1.5 text-xs text-error">
                    {errors.message.message}
                  </p>
                )}
              </div>

              {/* Submit */}
              <div className="flex flex-col gap-4 border-t border-base-300 pt-6 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-2 text-xs leading-5 text-base-content/50">
                  <FiCheckCircle className="mt-0.5 shrink-0 text-success" />

                  <span>
                    Your information will only be used to respond to your
                    message.
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary w-full gap-2 rounded-xl px-6 sm:w-auto"
                >
                  {isSubmitting ? (
                    <>
                      <span className="loading loading-spinner loading-sm" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <FiSend />
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.section>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.6 }}
          className="mt-10 rounded-3xl border border-base-300 bg-base-200/40 p-6 text-center sm:p-8"
        >
          <p className="text-sm text-base-content/55">
            Not ready to send a message yet?
          </p>

          <h2 className="mt-2 text-xl font-bold sm:text-2xl">
            Explore my work first.
          </h2>

          <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-base-content/60">
            Take a look at my skills and featured projects to see how I approach
            real-world web application development.
          </p>

          <div className="mt-5 flex flex-col justify-center gap-3 sm:flex-row">
            <Link to="/projects" className="btn btn-primary rounded-xl gap-2">
              View Projects
              <FiArrowUpRight />
            </Link>

            <Link to="/skills" className="btn btn-outline rounded-xl">
              Explore Skills
            </Link>
          </div>
        </motion.div>
      </div>
    </main>
  );
};

export default Contact;
