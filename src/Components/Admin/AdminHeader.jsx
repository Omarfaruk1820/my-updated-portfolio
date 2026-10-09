import { useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FiArrowUpRight,
  FiBell,
  FiChevronRight,
  FiCommand,
  FiHome,
  FiMenu,
  FiSearch,
  FiShield,
} from "react-icons/fi";
import { useAuth } from "../Auth/AuthProvider";

const ROUTE_LABELS = {
  admin: "Overview",
  projects: "Projects",
  skills: "Skills",
  services: "Services",
  experience: "Experience",
  education: "Education",
  testimonials: "Testimonials",
  contacts: "Client Inquiries",
  messages: "Messages",
  settings: "Settings",
  profile: "Profile",
};

const getInitials = (name = "", email = "") => {
  const normalizedName = name.trim();

  if (normalizedName) {
    return normalizedName
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part.charAt(0))
      .join("")
      .toUpperCase();
  }

  if (email) {
    return email.charAt(0).toUpperCase();
  }

  return "OF";
};

const AdminHeader = ({
  onMenuClick,
  onSearchClick,
  onNotificationsClick,
  notificationCount = 0,
  breadcrumbs,
  title,
  subtitle,
  actions,
}) => {
  const location = useLocation();
  const { user } = useAuth();

  const routeBreadcrumbs = useMemo(() => {
    if (Array.isArray(breadcrumbs) && breadcrumbs.length > 0) {
      return breadcrumbs;
    }

    const segments = location.pathname.split("/").filter(Boolean);

    const adminIndex = segments.indexOf("admin");
    const visibleSegments =
      adminIndex >= 0 ? segments.slice(adminIndex) : segments;

    return visibleSegments.map((segment, index) => {
      const normalized = segment.toLowerCase();
      const label =
        ROUTE_LABELS[normalized] ||
        normalized
          .replace(/[-_]/g, " ")
          .replace(/\b\w/g, (character) => character.toUpperCase());

      const pathSegments = segments.slice(
        0,
        adminIndex >= 0 ? adminIndex + index + 1 : index + 1,
      );
      const path = `/${pathSegments.join("/")}`;

      return {
        label,
        path,
      };
    });
  }, [breadcrumbs, location.pathname]);

  const displayName =
    user?.displayName?.trim() || user?.email?.split("@")[0] || "Administrator";

  const initials = getInitials(user?.displayName, user?.email);

  const formattedNotificationCount =
    notificationCount > 99 ? "99+" : notificationCount;

  return (
    <header className="sticky top-0 z-30 w-full border-b border-base-300/70 bg-base-100/90 backdrop-blur-xl">
      <div className="mx-auto w-full max-w-[1800px] px-4 sm:px-6 xl:px-8">
        {/* Top navigation */}
        <div className="flex min-h-[68px] items-center justify-between gap-3 sm:min-h-[76px]">
          <div className="flex min-w-0 items-center gap-3">
            <button
              type="button"
              onClick={onMenuClick}
              className="btn btn-ghost btn-square btn-sm shrink-0 rounded-xl lg:hidden"
              aria-label="Open admin navigation menu"
            >
              <FiMenu size={21} aria-hidden="true" />
            </button>

            <Link
              to="/admin"
              className="group flex min-w-0 items-center gap-3"
              aria-label="Admin dashboard overview"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-primary/15 bg-primary/10 text-primary transition-colors group-hover:bg-primary/15 sm:h-11 sm:w-11">
                <FiCommand size={21} aria-hidden="true" />
              </span>

              <span className="hidden min-w-0 sm:block">
                <span className="block truncate text-sm font-bold tracking-tight text-base-content sm:text-base">
                  Omar Faruk
                </span>
                <span className="mt-0.5 block truncate text-[11px] font-medium text-base-content/50 sm:text-xs">
                  Portfolio Studio
                </span>
              </span>
            </Link>

            <span
              className="hidden h-8 w-px bg-base-300 md:block"
              aria-hidden="true"
            />

            <div className="hidden min-w-0 md:block">
              <p className="truncate text-xs font-medium text-base-content/45">
                Workspace
              </p>
              <p className="mt-0.5 truncate text-sm font-semibold text-base-content">
                Portfolio Management
              </p>
            </div>
          </div>

          {/* Right-side actions */}
          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
            <button
              type="button"
              onClick={onSearchClick}
              className="btn btn-ghost btn-square btn-sm rounded-xl text-base-content/65 hover:text-base-content sm:btn-md"
              aria-label="Search portfolio dashboard"
              title="Search"
            >
              <FiSearch size={19} aria-hidden="true" />
            </button>

            <button
              type="button"
              onClick={onNotificationsClick}
              className="btn btn-ghost btn-square btn-sm relative rounded-xl text-base-content/65 hover:text-base-content sm:btn-md"
              aria-label={
                notificationCount > 0
                  ? `${notificationCount} notifications`
                  : "Notifications"
              }
              title="Notifications"
            >
              <FiBell size={19} aria-hidden="true" />

              {notificationCount > 0 && (
                <span className="absolute right-1 top-1 flex h-[17px] min-w-[17px] items-center justify-center rounded-full bg-primary px-1 text-[9px] font-bold leading-none text-primary-content ring-2 ring-base-100">
                  {formattedNotificationCount}
                </span>
              )}
            </button>

            <span
              className="mx-1 hidden h-8 w-px bg-base-300 sm:block"
              aria-hidden="true"
            />

            <div className="flex min-w-0 items-center gap-2.5 rounded-xl py-1 pl-1 pr-1 sm:gap-3 sm:pl-2 sm:pr-2">
              <div className="relative shrink-0">
                {user?.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt=""
                    referrerPolicy="no-referrer"
                    className="h-9 w-9 rounded-xl border border-base-300 object-cover sm:h-10 sm:w-10"
                  />
                ) : (
                  <div
                    className="flex h-9 w-9 items-center justify-center rounded-xl border border-primary/15 bg-primary/10 text-xs font-bold text-primary sm:h-10 sm:w-10"
                    aria-hidden="true"
                  >
                    {initials}
                  </div>
                )}

                <span
                  className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-base-100 bg-success"
                  title="Signed in"
                  aria-label="Signed in"
                />
              </div>

              <div className="hidden min-w-0 max-w-36 lg:block xl:max-w-48">
                <p className="truncate text-sm font-semibold text-base-content">
                  {displayName}
                </p>
                <p className="mt-0.5 truncate text-xs text-base-content/50">
                  Administrator
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Page heading and breadcrumbs */}
        <div className="flex flex-col gap-4 border-t border-base-300/50 py-4 sm:flex-row sm:items-end sm:justify-between sm:gap-6 sm:py-5">
          <div className="min-w-0">
            <nav
              aria-label="Breadcrumb"
              className="mb-2 flex min-w-0 flex-wrap items-center gap-1.5 text-xs"
            >
              <Link
                to="/admin"
                className="inline-flex items-center gap-1.5 text-base-content/45 transition-colors hover:text-primary"
              >
                <FiHome size={12} aria-hidden="true" />
                <span>Dashboard</span>
              </Link>

              {routeBreadcrumbs.map((crumb, index) => {
                const isLast = index === routeBreadcrumbs.length - 1;

                return (
                  <span
                    key={`${crumb.path || crumb.label}-${index}`}
                    className="inline-flex min-w-0 items-center gap-1.5"
                  >
                    <FiChevronRight
                      size={12}
                      className="shrink-0 text-base-content/30"
                      aria-hidden="true"
                    />

                    {isLast ? (
                      <span
                        className="truncate font-medium text-base-content/75"
                        aria-current="page"
                      >
                        {crumb.label}
                      </span>
                    ) : (
                      <Link
                        to={crumb.path || "/admin"}
                        className="truncate text-base-content/45 transition-colors hover:text-primary"
                      >
                        {crumb.label}
                      </Link>
                    )}
                  </span>
                );
              })}
            </nav>

            <h1 className="text-xl font-bold tracking-tight text-base-content sm:text-2xl">
              {title ||
                routeBreadcrumbs[routeBreadcrumbs.length - 1]?.label ||
                "Overview"}
            </h1>

            {subtitle && (
              <p className="mt-1 max-w-2xl text-xs leading-5 text-base-content/55 sm:text-sm">
                {subtitle}
              </p>
            )}
          </div>

          {actions && (
            <div className="flex w-full flex-wrap items-center gap-2 sm:w-auto sm:justify-end">
              {actions}
            </div>
          )}
        </div>

        {/* Workspace status */}
        <div className="flex items-center justify-between gap-3 border-t border-base-300/40 py-2.5">
          <div className="flex min-w-0 items-center gap-2 text-[11px] text-base-content/50 sm:text-xs">
            <FiShield
              size={13}
              className="shrink-0 text-success"
              aria-hidden="true"
            />
            <span className="truncate">Secure administrator workspace</span>
          </div>

          <Link
            to="/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-1.5 text-[11px] font-medium text-base-content/55 transition-colors hover:text-primary sm:text-xs"
          >
            <span>View portfolio</span>
            <FiArrowUpRight size={13} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
