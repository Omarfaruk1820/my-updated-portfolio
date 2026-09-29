import { Link } from "react-router-dom";
import {
  FiArrowUpRight,
  FiCode,
  FiGithub,
  FiHeart,
  FiLinkedin,
  FiMail,
  FiMapPin,
} from "react-icons/fi";

const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Skills", to: "/skills" },
  { label: "Projects", to: "/projects" },
  { label: "Services", to: "/services" },
  { label: "Contact", to: "/contact" },
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
  {
    label: "Email",
    href: "mailto:hello@example.com",
    icon: FiMail,
  },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const handleBackToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="relative overflow-hidden border-t border-base-300 bg-base-100">
      {/* =========================================
          Background Decoration
      ========================================== */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        {/* Primary glow */}
        <div className="absolute -right-32 -top-32 h-72 w-72 rounded-full bg-primary/5 blur-3xl sm:h-96 sm:w-96" />

        {/* Secondary glow */}
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-secondary/5 blur-3xl sm:h-96 sm:w-96" />

        {/* Subtle grid */}
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
        {/* =========================================
            Main Footer Content
        ========================================== */}
        <div className="grid gap-12 py-14 sm:py-16 lg:grid-cols-[1.4fr_0.8fr_0.8fr_1fr] lg:gap-10 lg:py-20">
          {/* =====================================
              Brand
          ====================================== */}
          <div className="max-w-md">
            <Link
              to="/"
              className="group inline-flex items-center gap-3"
              aria-label="Omar Faruk - Home"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-primary-content shadow-lg shadow-primary/20 transition-transform duration-300 group-hover:-rotate-3 group-hover:scale-105">
                <FiCode className="text-xl" />
              </span>

              <span>
                <span className="block text-lg font-bold leading-none tracking-tight text-base-content">
                  Omar<span className="text-primary">.</span>
                </span>

                <span className="mt-1 block font-mono text-[9px] uppercase tracking-[0.18em] text-base-content/40">
                  Full Stack Developer
                </span>
              </span>
            </Link>

            <p className="mt-6 max-w-md text-sm leading-7 text-base-content/60 sm:text-[15px]">
              I build modern, scalable, and user-focused web applications using
              the MERN stack, turning ideas into reliable digital experiences.
            </p>

            {/* Location */}
            <div className="mt-5 flex items-center gap-2 text-sm text-base-content/50">
              <FiMapPin className="shrink-0 text-primary" />

              <span>Based in Bangladesh</span>

              <span
                className="mx-1 h-1 w-1 rounded-full bg-base-content/30"
                aria-hidden="true"
              />

              <span>Working Worldwide</span>
            </div>

            {/* Social Links */}
            <div className="mt-7 flex items-center gap-2.5">
              {SOCIAL_LINKS.map((social) => {
                const Icon = social.icon;

                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target={
                      social.href.startsWith("http") ? "_blank" : undefined
                    }
                    rel={
                      social.href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    aria-label={social.label}
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-base-300 bg-base-100 text-base-content/55 transition-all duration-200 hover:-translate-y-1 hover:border-primary/40 hover:bg-primary/5 hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                  >
                    <Icon className="text-lg" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* =====================================
              Navigation
          ====================================== */}
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-base-content">
              Navigation
            </h2>

            <ul className="mt-5 space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="group inline-flex items-center gap-1.5 text-sm text-base-content/55 transition-colors duration-200 hover:text-primary"
                  >
                    <span>{link.label}</span>

                    <FiArrowUpRight className="text-xs opacity-0 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* =====================================
              Services
          ====================================== */}
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-base-content">
              Expertise
            </h2>

            <ul className="mt-5 space-y-3 text-sm text-base-content/55">
              <li>Frontend Development</li>
              <li>Backend Development</li>
              <li>MERN Stack Development</li>
              <li>REST API Development</li>
              <li>Responsive Web Design</li>
              <li>Database Integration</li>
            </ul>
          </div>

          {/* =====================================
              Contact CTA
          ====================================== */}
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-base-content">
              Let&apos;s Work Together
            </h2>

            <p className="mt-5 text-sm leading-6 text-base-content/55">
              Have a project, idea, or opportunity in mind? I&apos;d love to
              hear about it.
            </p>

            <a
              href="mailto:hello@example.com"
              className="group mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
            >
              <span>hello@example.com</span>

              <FiArrowUpRight className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>

            <Link
              to="/contact"
              className="group btn btn-primary mt-6 min-h-11 h-11 rounded-xl border-none px-5 font-semibold shadow-lg shadow-primary/20"
            >
              Start a Project
              <FiArrowUpRight className="text-lg transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>

        {/* =========================================
            Divider
        ========================================== */}
        <div className="border-t border-base-300" />

        {/* =========================================
            Bottom Bar
        ========================================== */}
        <div className="flex flex-col gap-5 py-6 text-sm sm:py-7 lg:flex-row lg:items-center lg:justify-between">
          {/* Copyright */}
          <p className="text-center text-xs text-base-content/45 sm:text-left">
            © {currentYear} Omar Faruk. All rights reserved.
          </p>

          {/* Made With */}
          <p className="flex items-center justify-center gap-1.5 text-xs text-base-content/45">
            <span>Built with</span>

            <FiHeart className="text-primary" aria-label="love" />

            <span>using React &amp; MERN Stack</span>
          </p>

          {/* Back To Top */}
          <button
            type="button"
            onClick={handleBackToTop}
            className="group mx-auto flex items-center gap-2 rounded-full border border-base-300 bg-base-100 px-4 py-2 text-xs font-medium text-base-content/55 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary/30 sm:mx-0"
            aria-label="Back to top"
          >
            <span>Back to top</span>

            <FiArrowUpRight className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
