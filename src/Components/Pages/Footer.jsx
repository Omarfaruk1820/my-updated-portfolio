import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

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
  { label: "Resume", to: "/resume" },
  { label: "Contact", to: "/contact" },
];

const SERVICE_LINKS = [
  {
    label: "Full-Stack Development",
    to: "/services",
  },
  {
    label: "Frontend Development",
    to: "/services",
  },
  {
    label: "Backend & REST APIs",
    to: "/services",
  },
  {
    label: "E-commerce Solutions",
    to: "/services",
  },
  {
    label: "Database Solutions",
    to: "/services",
  },
  {
    label: "Authentication & Security",
    to: "/services",
  },
];

const SOCIAL_LINKS = [
  {
    label: "GitHub",
    href: "https://github.com/Omarfaruk1820",
    icon: FiGithub,
    external: true,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/md-omar-faruk-6a592b252/?isSelfProfile=true",
    icon: FiLinkedin,
    external: true,
  },
  {
    label: "Email",
    href: "mailto:omarfarukfci9th@gmail.com",
    icon: FiMail,
    external: false,
  },
];

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const currentYear = new Date().getFullYear();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [location.pathname]);

  const handleNavigation = (event, to) => {
    if (location.pathname === to) {
      event.preventDefault();

      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });

      return;
    }

    navigate(to);
  };

  const handleBackToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="relative overflow-hidden border-t border-base-300 bg-base-100">
      {/* Background Decoration */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute -right-32 -top-32 h-72 w-72 rounded-full bg-primary/5 blur-3xl sm:h-96 sm:w-96" />

        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-secondary/5 blur-3xl sm:h-96 sm:w-96" />

        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid gap-12 py-14 sm:py-16 lg:grid-cols-[1.35fr_0.75fr_1fr_1fr] lg:gap-10 lg:py-20">
          {/* Brand */}
          <div className="max-w-md">
            <button
              type="button"
              onClick={handleBackToTop}
              className="group inline-flex items-center gap-3 text-left focus:outline-none focus:ring-2 focus:ring-primary/30 focus:ring-offset-2 focus:ring-offset-base-100"
              aria-label="Back to top"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-content shadow-lg shadow-primary/20 transition-transform duration-300 group-hover:-rotate-3 group-hover:scale-105">
                <FiCode className="text-xl" />
              </span>

              <span>
                <span className="block text-lg font-bold leading-none tracking-tight text-base-content">
                  Omar Faruk<span className="text-primary">.</span>
                </span>

                <span className="mt-1 block font-mono text-[9px] uppercase tracking-[0.18em] text-base-content/40">
                  Full Stack Developer
                </span>
              </span>
            </button>

            <p className="mt-6 max-w-md text-sm leading-7 text-base-content/60 sm:text-[15px]">
              I build modern, scalable, and user-focused web applications using
              the MERN stack — helping businesses turn ideas into reliable
              digital products.
            </p>

            {/* Location */}
            <div className="mt-5 flex flex-wrap items-center gap-2 text-sm text-base-content/50">
              <FiMapPin className="shrink-0 text-primary" aria-hidden="true" />

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
                    target={social.external ? "_blank" : undefined}
                    rel={social.external ? "noopener noreferrer" : undefined}
                    aria-label={social.label}
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-base-300 bg-base-100 text-base-content/55 transition-all duration-200 hover:-translate-y-1 hover:border-primary/40 hover:bg-primary/5 hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                  >
                    <Icon className="text-lg" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-base-content">
              Navigation
            </h2>

            <ul className="mt-5 space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    onClick={(event) => handleNavigation(event, link.to)}
                    className="group inline-flex items-center gap-1.5 text-sm text-base-content/55 transition-colors duration-200 hover:text-primary focus:text-primary focus:outline-none"
                  >
                    <span>{link.label}</span>

                    <FiArrowUpRight
                      className="text-xs opacity-0 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100"
                      aria-hidden="true"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-base-content">
              Services
            </h2>

            <ul className="mt-5 space-y-3">
              {SERVICE_LINKS.map((service) => (
                <li key={service.label}>
                  <Link
                    to={service.to}
                    onClick={(event) => handleNavigation(event, service.to)}
                    className="group inline-flex items-start gap-1.5 text-sm leading-6 text-base-content/55 transition-colors duration-200 hover:text-primary focus:text-primary focus:outline-none"
                  >
                    <span>{service.label}</span>

                    <FiArrowUpRight
                      className="mt-1 shrink-0 text-xs opacity-0 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100"
                      aria-hidden="true"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact CTA */}
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-base-content">
              Start a Project
            </h2>

            <p className="mt-5 text-sm leading-6 text-base-content/55">
              Have a project, business idea, or custom software requirement?
              Let&apos;s discuss your goals and build the right solution.
            </p>

            <a
              href="mailto:omarfarukfci9th@gmail.com"
              className="group mt-5 inline-flex max-w-full items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary/80 focus:outline-none focus:ring-2 focus:ring-primary/30"
            >
              <span className="truncate">omarfarukfci9th@gmail.com</span>

              <FiArrowUpRight
                className="shrink-0 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </a>

            <Link
              to="/contact"
              onClick={(event) => handleNavigation(event, "/contact")}
              className="group btn btn-primary mt-6 h-11 min-h-11 rounded-xl border-none px-5 font-semibold shadow-lg shadow-primary/20"
            >
              <span>Start a Project</span>

              <FiArrowUpRight
                className="text-lg transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-base-300" />

        {/* Bottom Bar */}
        <div className="flex flex-col gap-5 py-6 sm:py-7 lg:flex-row lg:items-center lg:justify-between lg:gap-6">
          <p className="text-center text-xs text-base-content/45 sm:text-left">
            © {currentYear} Omar Faruk. All rights reserved.
          </p>

          <p className="flex items-center justify-center gap-1.5 text-xs text-base-content/45">
            <span>Built with</span>

            <FiHeart className="text-primary" aria-hidden="true" />

            <span>using React &amp; MERN Stack</span>
          </p>

          <button
            type="button"
            onClick={handleBackToTop}
            className="group mx-auto inline-flex items-center gap-2 rounded-full border border-base-300 bg-base-100 px-4 py-2 text-xs font-medium text-base-content/55 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary/30 sm:mx-0"
            aria-label="Back to top"
          >
            <span>Back to top</span>

            <FiArrowUpRight
              className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
