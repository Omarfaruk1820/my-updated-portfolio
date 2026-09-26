import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Link, NavLink } from "react-router-dom";
import {
  FiArrowUpRight,
  FiCode,
  FiMenu,
  FiMoon,
  FiSun,
  FiX,
} from "react-icons/fi";

const NAV_ITEMS = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Skills", to: "/skills" },
  { label: "Projects", to: "/projects" },
  { label: "Services", to: "/services" },
  { label: "Resume", to: "/resume" },
  { label: "Contact", to: "/contact" },
];

const THEME_KEY = "portfolio-theme";

const getInitialTheme = () => {
  if (typeof window === "undefined") {
    return "dark";
  }

  const savedTheme = localStorage.getItem(THEME_KEY);

  if (savedTheme === "light" || savedTheme === "dark") {
    return savedTheme;
  }

  return window.matchMedia?.("(prefers-color-scheme: light)").matches
    ? "light"
    : "dark";
};

const Navbar = () => {
  const shouldReduceMotion = useReducedMotion();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [theme, setTheme] = useState(getInitialTheme);

  const isDark = theme === "dark";

  /* --------------------------------
     Apply theme
  --------------------------------- */
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  /* --------------------------------
     Scroll state
  --------------------------------- */
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  /* --------------------------------
     Close mobile menu on resize
  --------------------------------- */
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  /* --------------------------------
     Keyboard accessibility
  --------------------------------- */
  useEffect(() => {
    if (!isMenuOpen) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuOpen]);

  /* --------------------------------
     Prevent background scroll
  --------------------------------- */
  useEffect(() => {
    if (!isMenuOpen) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isMenuOpen]);

  /* --------------------------------
     Theme toggle
  --------------------------------- */
  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === "dark" ? "light" : "dark"));
  };

  /* --------------------------------
     Close mobile menu
  --------------------------------- */
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  /* --------------------------------
     Toggle mobile menu
  --------------------------------- */
  const toggleMenu = () => {
    setIsMenuOpen((previous) => !previous);
  };

  /* --------------------------------
     Animation settings
  --------------------------------- */
  const navAnimation = shouldReduceMotion
    ? {
        initial: false,
        animate: { opacity: 1 },
      }
    : {
        initial: { opacity: 0, y: -12 },
        animate: { opacity: 1, y: 0 },
        transition: {
          duration: 0.45,
          ease: "easeOut",
        },
      };

  return (
    <>
      {/* =================================
          Main Navbar
      ================================== */}
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "border-b border-base-300/60 bg-base-100/85 shadow-lg shadow-black/5 backdrop-blur-xl"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.nav
            {...navAnimation}
            className={`flex items-center justify-between transition-[height] duration-300 ${
              isScrolled ? "h-16 sm:h-[68px]" : "h-[72px] sm:h-20"
            }`}
            aria-label="Main navigation"
          >
            {/* =================================
                Logo
            ================================== */}
            <Link
              to="/"
              onClick={closeMenu}
              className="group flex min-w-0 items-center gap-2.5 sm:gap-3"
              aria-label="Omar Faruk - Home"
            >
              <motion.div
                whileHover={
                  shouldReduceMotion
                    ? undefined
                    : {
                        rotate: -5,
                        scale: 1.05,
                      }
                }
                whileTap={
                  shouldReduceMotion
                    ? undefined
                    : {
                        scale: 0.95,
                      }
                }
                className="relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-primary text-primary-content shadow-lg shadow-primary/20 sm:h-10 sm:w-10"
              >
                <FiCode className="text-lg sm:text-xl" />

                <span
                  className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-500 group-hover:translate-x-full"
                  aria-hidden="true"
                />
              </motion.div>

              <div className="hidden min-w-0 xs:block sm:block">
                <p className="truncate text-sm font-bold leading-none tracking-tight text-base-content sm:text-base">
                  Omar<span className="text-primary">.</span>
                </p>

                <p className="mt-1 hidden truncate font-mono text-[9px] uppercase tracking-[0.16em] text-base-content/50 min-[400px]:block sm:text-[10px] sm:tracking-[0.18em]">
                  Full Stack Developer
                </p>
              </div>
            </Link>

            {/* =================================
                Desktop Navigation
            ================================== */}
            <div className="hidden items-center lg:flex">
              <div className="flex items-center gap-0.5 rounded-full border border-base-300/60 bg-base-100/50 p-1.5 backdrop-blur-md xl:gap-1">
                {NAV_ITEMS.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.to === "/"}
                    className={({ isActive }) =>
                      `relative rounded-full px-3 py-2 text-sm font-medium transition-all duration-200 xl:px-3.5 2xl:px-4 ${
                        isActive
                          ? "text-primary"
                          : "text-base-content/70 hover:text-base-content"
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {isActive && (
                          <motion.span
                            layoutId="active-navbar-item"
                            className="absolute inset-0 rounded-full bg-primary/10"
                            transition={
                              shouldReduceMotion
                                ? { duration: 0 }
                                : {
                                    type: "spring",
                                    stiffness: 380,
                                    damping: 30,
                                  }
                            }
                            aria-hidden="true"
                          />
                        )}

                        <span className="relative z-10 whitespace-nowrap">
                          {item.label}
                        </span>
                      </>
                    )}
                  </NavLink>
                ))}
              </div>
            </div>

            {/* =================================
                Desktop Actions
            ================================== */}
            <div className="hidden items-center gap-2.5 lg:flex xl:gap-3">
              {/* Theme Toggle */}
              <motion.button
                type="button"
                whileHover={
                  shouldReduceMotion
                    ? undefined
                    : {
                        scale: 1.05,
                      }
                }
                whileTap={
                  shouldReduceMotion
                    ? undefined
                    : {
                        scale: 0.95,
                      }
                }
                onClick={toggleTheme}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-base-300 bg-base-100 text-base-content/70 transition-colors hover:border-primary/40 hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                aria-label={
                  isDark ? "Switch to light theme" : "Switch to dark theme"
                }
                title={
                  isDark ? "Switch to light theme" : "Switch to dark theme"
                }
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={isDark ? "moon" : "sun"}
                    initial={
                      shouldReduceMotion
                        ? false
                        : {
                            opacity: 0,
                            rotate: -90,
                            scale: 0.5,
                          }
                    }
                    animate={{
                      opacity: 1,
                      rotate: 0,
                      scale: 1,
                    }}
                    exit={
                      shouldReduceMotion
                        ? undefined
                        : {
                            opacity: 0,
                            rotate: 90,
                            scale: 0.5,
                          }
                    }
                    transition={{
                      duration: shouldReduceMotion ? 0 : 0.2,
                    }}
                  >
                    {isDark ? (
                      <FiMoon className="text-lg" />
                    ) : (
                      <FiSun className="text-lg" />
                    )}
                  </motion.span>
                </AnimatePresence>
              </motion.button>

              {/* Hire Me */}
              <motion.div
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
                        scale: 0.97,
                      }
                }
              >
                <Link
                  to="/contact"
                  className="group btn btn-primary min-h-10 h-10 rounded-full border-none px-4 font-semibold shadow-lg shadow-primary/20 sm:px-5"
                >
                  <span>Hire Me</span>

                  <FiArrowUpRight className="text-lg transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </motion.div>
            </div>

            {/* =================================
                Mobile Actions
            ================================== */}
            <div className="flex items-center gap-2 lg:hidden">
              {/* Mobile Theme Toggle */}
              <motion.button
                type="button"
                whileTap={
                  shouldReduceMotion
                    ? undefined
                    : {
                        scale: 0.9,
                      }
                }
                onClick={toggleTheme}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-base-300 bg-base-100 text-base-content/70 transition-colors hover:border-primary/40 hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                aria-label={
                  isDark ? "Switch to light theme" : "Switch to dark theme"
                }
                title={
                  isDark ? "Switch to light theme" : "Switch to dark theme"
                }
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={isDark ? "mobile-moon" : "mobile-sun"}
                    initial={
                      shouldReduceMotion
                        ? false
                        : {
                            opacity: 0,
                            rotate: -90,
                            scale: 0.5,
                          }
                    }
                    animate={{
                      opacity: 1,
                      rotate: 0,
                      scale: 1,
                    }}
                    exit={
                      shouldReduceMotion
                        ? undefined
                        : {
                            opacity: 0,
                            rotate: 90,
                            scale: 0.5,
                          }
                    }
                    transition={{
                      duration: shouldReduceMotion ? 0 : 0.2,
                    }}
                  >
                    {isDark ? (
                      <FiMoon className="text-lg" />
                    ) : (
                      <FiSun className="text-lg" />
                    )}
                  </motion.span>
                </AnimatePresence>
              </motion.button>

              {/* Mobile Menu Button */}
              <motion.button
                type="button"
                whileTap={
                  shouldReduceMotion
                    ? undefined
                    : {
                        scale: 0.9,
                      }
                }
                onClick={toggleMenu}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-base-300 bg-base-100 text-base-content transition-colors hover:border-primary/40 hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                aria-label={
                  isMenuOpen ? "Close navigation menu" : "Open navigation menu"
                }
                aria-expanded={isMenuOpen}
                aria-controls="mobile-navigation"
                title={
                  isMenuOpen ? "Close navigation menu" : "Open navigation menu"
                }
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={isMenuOpen ? "close" : "menu"}
                    initial={
                      shouldReduceMotion
                        ? false
                        : {
                            opacity: 0,
                            rotate: -45,
                          }
                    }
                    animate={{
                      opacity: 1,
                      rotate: 0,
                    }}
                    exit={
                      shouldReduceMotion
                        ? undefined
                        : {
                            opacity: 0,
                            rotate: 45,
                          }
                    }
                    transition={{
                      duration: shouldReduceMotion ? 0 : 0.15,
                    }}
                  >
                    {isMenuOpen ? (
                      <FiX className="text-xl" />
                    ) : (
                      <FiMenu className="text-xl" />
                    )}
                  </motion.span>
                </AnimatePresence>
              </motion.button>
            </div>
          </motion.nav>
        </div>
      </header>

      {/* =================================
          Mobile Navigation
      ================================== */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
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
              exit={
                shouldReduceMotion
                  ? undefined
                  : {
                      opacity: 0,
                    }
              }
              transition={{
                duration: shouldReduceMotion ? 0 : 0.2,
              }}
              onClick={closeMenu}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
              aria-hidden="true"
            />

            {/* Mobile Panel */}
            <motion.div
              id="mobile-navigation"
              initial={
                shouldReduceMotion
                  ? false
                  : {
                      opacity: 0,
                      y: -15,
                      scale: 0.98,
                    }
              }
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={
                shouldReduceMotion
                  ? undefined
                  : {
                      opacity: 0,
                      y: -15,
                      scale: 0.98,
                    }
              }
              transition={
                shouldReduceMotion
                  ? { duration: 0 }
                  : {
                      type: "spring",
                      stiffness: 300,
                      damping: 28,
                    }
              }
              className="fixed inset-x-3 top-[68px] z-50 max-h-[calc(100vh-84px)] overflow-y-auto rounded-2xl border border-base-300 bg-base-100 shadow-2xl sm:inset-x-6 sm:top-[76px] lg:hidden"
              role="dialog"
              aria-label="Mobile navigation"
            >
              <div className="p-3 sm:p-4">
                {/* Mobile Links */}
                <div className="space-y-1">
                  {NAV_ITEMS.map((item, index) => (
                    <motion.div
                      key={item.to}
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
                        delay: shouldReduceMotion ? 0 : index * 0.04,
                      }}
                    >
                      <NavLink
                        to={item.to}
                        end={item.to === "/"}
                        onClick={closeMenu}
                        className={({ isActive }) =>
                          `flex items-center justify-between rounded-xl px-4 py-3.5 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary/30 ${
                            isActive
                              ? "bg-primary/10 text-primary"
                              : "text-base-content/75 hover:bg-base-200 hover:text-base-content"
                          }`
                        }
                      >
                        {({ isActive }) => (
                          <>
                            <span>{item.label}</span>

                            {isActive && (
                              <span
                                className="h-1.5 w-1.5 rounded-full bg-primary"
                                aria-hidden="true"
                              />
                            )}
                          </>
                        )}
                      </NavLink>
                    </motion.div>
                  ))}
                </div>

                {/* Mobile CTA */}
                <div className="mt-3 border-t border-base-300 pt-3">
                  <Link
                    to="/contact"
                    onClick={closeMenu}
                    className="btn btn-primary min-h-12 h-12 w-full rounded-xl border-none font-semibold shadow-lg shadow-primary/20"
                  >
                    <span>Let's Work Together</span>

                    <FiArrowUpRight className="text-lg" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
