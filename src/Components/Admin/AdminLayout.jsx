import { useCallback, useEffect, useState } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import {
  FiChevronRight,
  FiCode,
  FiExternalLink,
  FiLogOut,
  FiMenu,
  FiMoon,
  FiSun,
} from "react-icons/fi";
import toast from "react-hot-toast";

import { auth } from "../Auth/firebase.config";
import { useAuth } from "../Auth/AuthProvider";
import AdminSidebar from "./AdminSidebar";

const getPageTitle = (pathname) => {
  const routes = [
    { path: "/admin/projects", title: "Projects" },
    { path: "/admin/services", title: "Services" },
    { path: "/admin/skills", title: "Skills" },
    { path: "/admin/contacts", title: "Contact Inquiries" },
    { path: "/admin/experience", title: "Experience" },
    { path: "/admin/education", title: "Education" },
  ];

  const matchedRoute = routes.find(
    ({ path }) => pathname === path || pathname.startsWith(`${path}/`),
  );

  if (matchedRoute) {
    return matchedRoute.title;
  }

  if (pathname === "/admin") {
    return "Dashboard Overview";
  }

  return "Admin Workspace";
};

const getStoredTheme = () => {
  if (typeof window === "undefined") {
    return "dark";
  }

  try {
    const storedTheme = window.localStorage.getItem("portfolio-theme");

    return storedTheme === "light" || storedTheme === "dark"
      ? storedTheme
      : "dark";
  } catch {
    return "dark";
  }
};

const AdminLayout = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const [theme, setTheme] = useState(getStoredTheme);

  const pageTitle = getPageTitle(location.pathname);
  const adminName = user?.displayName?.trim() || "Portfolio Admin";
  const firstName = adminName.split(/\s+/)[0];
  const adminEmail = user?.email || "Administrator";

  const closeSidebar = useCallback(() => {
    setSidebarOpen(false);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((currentTheme) => (currentTheme === "dark" ? "light" : "dark"));
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);

    try {
      window.localStorage.setItem("portfolio-theme", theme);
    } catch {
      // The theme still works for the current session if storage is unavailable.
    }
  }, [theme]);

  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!sidebarOpen) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setSidebarOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [sidebarOpen]);

  const handleLogout = async () => {
    if (loggingOut) {
      return;
    }

    setLoggingOut(true);

    try {
      await signOut(auth);

      toast.success("Signed out successfully.");

      navigate("/admin/login", {
        replace: true,
        state: { from: location.pathname },
      });
    } catch (error) {
      console.error("Admin logout failed:", error);

      toast.error("Unable to sign out. Please try again.");
      setLoggingOut(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200/50 text-base-content">
      <div className="flex min-h-screen">
        {/* Responsive sidebar */}
        <AdminSidebar isOpen={sidebarOpen} onClose={closeSidebar} />

        {/* Main workspace */}
        <div className="flex min-h-screen min-w-0 flex-1 flex-col">
          {/* Sticky header */}
          <header className="sticky top-0 z-30 border-b border-base-300/70 bg-base-100/90 backdrop-blur-xl">
            <div className="flex h-[72px] items-center justify-between gap-3 px-4 sm:px-6 xl:px-8">
              <div className="flex min-w-0 items-center gap-3">
                <button
                  type="button"
                  onClick={() => setSidebarOpen(true)}
                  className="btn btn-ghost btn-square btn-sm shrink-0 rounded-xl lg:hidden"
                  aria-label="Open navigation menu"
                  aria-controls="admin-sidebar"
                  aria-expanded={sidebarOpen}
                >
                  <FiMenu size={21} />
                </button>

                <div className="min-w-0">
                  <div className="mb-1 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-base-content/45 sm:text-[11px]">
                    <span>Workspace</span>
                    <FiChevronRight size={12} />
                    <span className="truncate">{pageTitle}</span>
                  </div>

                  <h1 className="truncate text-lg font-bold tracking-tight sm:text-xl">
                    {pageTitle}
                  </h1>
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-2 sm:gap-3">
                <div className="hidden items-center gap-2 rounded-full border border-base-300/70 px-3 py-2 md:flex">
                  <span className="h-2 w-2 rounded-full bg-success" />
                  <span className="text-xs font-medium text-base-content/60">
                    Workspace active
                  </span>
                </div>

                <button
                  type="button"
                  onClick={toggleTheme}
                  className="btn btn-ghost btn-square btn-sm rounded-xl"
                  aria-label={
                    theme === "dark"
                      ? "Switch to light theme"
                      : "Switch to dark theme"
                  }
                  title={
                    theme === "dark"
                      ? "Switch to light theme"
                      : "Switch to dark theme"
                  }
                >
                  {theme === "dark" ? (
                    <FiSun size={18} />
                  ) : (
                    <FiMoon size={18} />
                  )}
                </button>

                <div className="hidden h-8 w-px bg-base-300 sm:block" />

                <div className="hidden min-w-0 text-right sm:block">
                  <p className="max-w-[150px] truncate text-xs font-semibold text-base-content">
                    {adminName}
                  </p>
                  <p className="mt-0.5 text-[10px] text-base-content/50">
                    Administrator
                  </p>
                </div>

                <div className="avatar placeholder">
                  <div className="h-9 w-9 rounded-xl bg-primary/10 text-primary ring-1 ring-base-300/70">
                    {user?.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt={`${adminName} profile`}
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <span className="text-xs font-bold">
                        {adminName
                          .split(/\s+/)
                          .filter(Boolean)
                          .slice(0, 2)
                          .map((word) => word[0].toUpperCase())
                          .join("") || "A"}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Page content */}
          <main className="mx-auto flex w-full max-w-[1800px] flex-1 flex-col p-4 sm:p-6 xl:p-8 2xl:p-10">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3 sm:mb-7">
              <div className="min-w-0">
                <p className="text-sm text-base-content/65">
                  Welcome back, {firstName}.
                </p>
                <p className="mt-1 text-xs leading-5 text-base-content/45 sm:text-sm">
                  Manage your portfolio and keep your professional profile up to
                  date.
                </p>
              </div>

              <NavLink
                to="/"
                target="_blank"
                rel="noreferrer"
                className="btn btn-outline btn-sm shrink-0 gap-2 rounded-xl border-base-300 normal-case"
              >
                <FiExternalLink size={14} />
                <span className="hidden xs:inline">View website</span>
                <span className="xs:hidden">Website</span>
              </NavLink>
            </div>

            <div className="min-w-0 flex-1">
              <Outlet />
            </div>

            {/* Footer */}
            <footer className="mt-8 border-t border-base-300/70 pt-5 sm:mt-10">
              <div className="flex flex-col gap-2 text-xs text-base-content/45 sm:flex-row sm:items-center sm:justify-between">
                <p>
                  © {new Date().getFullYear()} Omar Faruk. Portfolio Studio.
                </p>

                <p className="flex items-center gap-1.5">
                  Built to manage your work
                  <FiCode size={13} />
                </p>
              </div>
            </footer>
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
