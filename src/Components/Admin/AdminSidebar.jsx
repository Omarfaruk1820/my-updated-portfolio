import { useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import {
  FiActivity,
  FiBookOpen,
  FiBriefcase,
  FiChevronRight,
  FiCode,
  FiExternalLink,
  FiFolder,
  FiGrid,
  FiMail,
  FiX,
  FiCommand,
  FiUser,
} from "react-icons/fi";

import { useAuth } from "../Auth/AuthProvider";

const navigationGroups = [
  {
    title: "Workspace",
    items: [
      {
        label: "Overview",
        path: "/admin",
        icon: FiGrid,
        end: true,
      },
    ],
  },
  {
    title: "Content management",
    items: [
      {
        label: "Projects",
        path: "/admin/projects",
        icon: FiFolder,
      },
      {
        label: "Services",
        path: "/admin/services",
        icon: FiBriefcase,
      },
      {
        label: "Skills",
        path: "/admin/skills",
        icon: FiCode,
      },
      {
        label: "Contact inquiries",
        path: "/admin/contacts",
        icon: FiMail,
      },
    ],
  },
  {
    title: "Professional profile",
    items: [
      {
        label: "Experience",
        path: "/admin/experience",
        icon: FiActivity,
      },
      {
        label: "Education",
        path: "/admin/education",
        icon: FiBookOpen,
      },
    ],
  },
];

const getInitials = (name = "") => {
  const words = name.trim().split(/\s+/).filter(Boolean);

  if (!words.length) return "AD";

  return words
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join("");
};

const AdminSidebar = ({ isOpen = false, onClose = () => {} }) => {
  const { user } = useAuth();
  const location = useLocation();

  useEffect(() => {
    if (!isOpen) return undefined;

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    onClose();
  }, [location.pathname, onClose]);

  const displayName =
    user?.displayName?.trim() || user?.email?.split("@")[0] || "Administrator";

  const email = user?.email || "Admin account";

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <button
          type="button"
          aria-label="Close navigation menu"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-[2px] lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        id="admin-sidebar"
        aria-label="Admin sidebar"
        className={`fixed inset-y-0 left-0 z-50 flex h-dvh w-[280px] max-w-[85vw] flex-col border-r border-base-300/70 bg-base-100 shadow-xl transition-transform duration-300 ease-in-out lg:sticky lg:top-0 lg:z-auto lg:h-screen lg:max-w-none lg:translate-x-0 lg:shadow-none ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Brand */}
        <div className="flex h-[76px] shrink-0 items-center justify-between border-b border-base-300/70 px-5">
          <Link
            to="/admin"
            onClick={onClose}
            className="group flex min-w-0 items-center gap-3"
            aria-label="Admin dashboard home"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-content shadow-sm shadow-primary/20">
              <FiCommand size={23} />
            </span>

            <span className="min-w-0">
              <span className="block truncate text-base font-extrabold tracking-tight text-base-content">
                Omar<span className="text-primary">.</span>
              </span>
              <span className="mt-0.5 block text-[10px] font-bold uppercase tracking-[0.18em] text-base-content/50">
                Admin workspace
              </span>
            </span>
          </Link>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close sidebar"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-base-content/60 transition hover:bg-base-200 hover:text-base-content lg:hidden"
          >
            <FiX size={19} />
          </button>
        </div>

        {/* Workspace status */}
        <div className="px-4 pt-5">
          <div className="rounded-2xl border border-base-300/70 bg-base-200/40 p-3.5">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <FiActivity size={19} />
              </span>

              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-bold text-base-content">
                  Portfolio manager
                </p>
                <div className="mt-1.5 flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-success" />
                  <span className="text-[11px] text-base-content/55">
                    Workspace active
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav
          aria-label="Admin navigation"
          className="flex-1 space-y-6 overflow-y-auto px-4 py-6"
        >
          {navigationGroups.map((group) => (
            <div key={group.title}>
              <p className="mb-2 px-3 text-[10px] font-extrabold uppercase tracking-[0.16em] text-base-content/40">
                {group.title}
              </p>

              <div className="space-y-1">
                {group.items.map((item) => {
                  const Icon = item.icon;

                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      end={item.end}
                      onClick={onClose}
                      className={({ isActive }) =>
                        `group relative flex min-h-11 items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition duration-200 ${
                          isActive
                            ? "bg-primary/10 font-semibold text-primary"
                            : "text-base-content/65 hover:bg-base-200 hover:text-base-content"
                        }`
                      }
                    >
                      {({ isActive }) => (
                        <>
                          {isActive && (
                            <span className="absolute bottom-2 left-0 top-2 w-[3px] rounded-r-full bg-primary" />
                          )}

                          <span
                            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition ${
                              isActive
                                ? "bg-primary/10"
                                : "text-base-content/55 group-hover:text-base-content"
                            }`}
                          >
                            <Icon size={17} />
                          </span>

                          <span className="min-w-0 flex-1 truncate">
                            {item.label}
                          </span>

                          {isActive && (
                            <FiChevronRight
                              size={15}
                              className="shrink-0 text-primary"
                            />
                          )}
                        </>
                      )}
                    </NavLink>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Public website link */}
        <div className="shrink-0 px-4 pb-4">
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="group flex items-center gap-3 rounded-xl border border-base-300/70 p-3 transition hover:border-primary/30 hover:bg-primary/5"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-base-200 text-base-content/65 transition group-hover:bg-primary/10 group-hover:text-primary">
              <FiExternalLink size={17} />
            </span>

            <span className="min-w-0 flex-1">
              <span className="block truncate text-xs font-semibold text-base-content">
                View public website
              </span>
              <span className="mt-1 block truncate text-[10px] text-base-content/50">
                Open portfolio in a new tab
              </span>
            </span>
          </a>
        </div>

        {/* Admin profile */}
        <div className="shrink-0 border-t border-base-300/70 p-4">
          <div className="flex min-w-0 items-center gap-3 rounded-xl p-2">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-xs font-extrabold text-primary">
              {user?.photoURL ? (
                <img
                  src={user.photoURL}
                  alt=""
                  referrerPolicy="no-referrer"
                  className="h-full w-full rounded-xl object-cover"
                />
              ) : (
                getInitials(displayName)
              )}
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-base-content">
                {displayName}
              </p>
              <p className="mt-1 truncate text-[11px] text-base-content/50">
                {email}
              </p>
            </div>

            <span
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-base-content/45"
              title="Administrator profile"
              aria-label="Administrator profile"
            >
              <FiUser size={16} />
            </span>
          </div>

          <p className="mt-2 px-2 text-[10px] text-base-content/40">
            Personal portfolio administration
          </p>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;
