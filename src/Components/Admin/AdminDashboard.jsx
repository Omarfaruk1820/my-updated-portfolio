import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import {
  FiActivity,
  FiArrowRight,
  FiArrowUpRight,
  FiBriefcase,
  FiCheckCircle,
  FiClock,
  FiCode,
  FiExternalLink,
  FiFolder,
  FiMail,
  FiMessageSquare,
  FiRefreshCw,
  FiServer,
  FiShield,
  FiTrendingUp,
} from "react-icons/fi";

import { useAuth } from "../Auth/AuthProvider";

const API_ROOT = (
  import.meta.env.VITE_API_URL || "http://localhost:5000"
).replace(/\/+$/, "");

const API_URL = /\/api$/i.test(API_ROOT) ? API_ROOT : `${API_ROOT}/api`;

const API_RESOURCES = [
  {
    key: "projects",
    endpoint: "/projects",
    fields: ["projects"],
  },
  {
    key: "services",
    endpoint: "/services",
    fields: ["services"],
  },
  {
    key: "skills",
    endpoint: "/skills",
    fields: ["skills"],
  },
  {
    key: "contacts",
    endpoint: "/contact",
    fields: ["contacts", "inquiries"],
  },
];

const createInitialDashboardData = () => ({
  projects: { items: [], error: false },
  services: { items: [], error: false },
  skills: { items: [], error: false },
  contacts: { items: [], error: false },
});

const extractList = (body, keys = []) => {
  if (Array.isArray(body)) {
    return body;
  }

  if (Array.isArray(body?.data)) {
    return body.data;
  }

  if (Array.isArray(body?.items)) {
    return body.items;
  }

  for (const key of keys) {
    if (Array.isArray(body?.[key])) {
      return body[key];
    }
  }

  if (body?.data && typeof body.data === "object") {
    for (const key of keys) {
      if (Array.isArray(body.data[key])) {
        return body.data[key];
      }
    }
  }

  return [];
};

const getTimestamp = (value) => {
  if (!value) {
    return 0;
  }

  const timestamp = new Date(value).getTime();

  return Number.isFinite(timestamp) ? timestamp : 0;
};

const formatDate = (value) => {
  const timestamp = getTimestamp(value);

  if (!timestamp) {
    return "Date unavailable";
  }

  return new Intl.DateTimeFormat("en-BD", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(timestamp);
};

const getInitials = (name = "") => {
  const words = String(name).trim().split(/\s+/).filter(Boolean);

  if (!words.length) {
    return "AD";
  }

  return words
    .slice(0, 2)
    .map((word) => word.charAt(0).toUpperCase())
    .join("");
};

const getGreeting = () => {
  const hour = new Date().getHours();

  if (hour < 12) {
    return "Good morning";
  }

  if (hour < 17) {
    return "Good afternoon";
  }

  return "Good evening";
};

const STATUS_STYLES = {
  unread: "border-warning/20 bg-warning/10 text-warning",
  new: "border-warning/20 bg-warning/10 text-warning",
  pending: "border-warning/20 bg-warning/10 text-warning",
  read: "border-info/20 bg-info/10 text-info",
  replied: "border-success/20 bg-success/10 text-success",
  sent: "border-success/20 bg-success/10 text-success",
  failed: "border-error/20 bg-error/10 text-error",
};

const getStatusLabel = (status) => {
  const normalized = String(status || "unread")
    .trim()
    .toLowerCase();

  return normalized || "unread";
};

const MetricCard = ({
  title,
  value,
  description,
  icon: Icon,
  color,
  iconBackground,
  href,
  loading,
  index,
  reduceMotion,
}) => (
  <motion.div
    className="h-full"
    initial={reduceMotion ? false : { opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    transition={
      reduceMotion
        ? { duration: 0 }
        : {
            duration: 0.3,
            delay: index * 0.06,
          }
    }
  >
    <Link
      to={href}
      className="group flex h-full flex-col rounded-2xl border border-base-300/70 bg-base-100 p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-base-100 sm:p-6"
    >
      <div className="flex items-start justify-between gap-3">
        <span
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${iconBackground} ${color}`}
        >
          <Icon size={21} aria-hidden="true" />
        </span>

        <span className="flex h-8 w-8 items-center justify-center rounded-full text-base-content/35 transition group-hover:bg-primary/10 group-hover:text-primary">
          <FiArrowUpRight size={17} aria-hidden="true" />
        </span>
      </div>

      <div className="mt-6">
        <p className="text-sm font-medium text-base-content/60">{title}</p>

        <div
          className="mt-1 flex min-h-10 items-center text-3xl font-bold tracking-tight text-base-content sm:text-4xl"
          aria-live="polite"
        >
          {loading ? (
            <span
              className="inline-block h-9 w-14 animate-pulse rounded-lg bg-base-300"
              aria-label={`Loading ${title}`}
            />
          ) : (
            value
          )}
        </div>

        <p className="mt-2 text-xs leading-5 text-base-content/50">
          {description}
        </p>
      </div>
    </Link>
  </motion.div>
);

const LoadingInquiry = () => (
  <div className="flex animate-pulse items-center gap-3">
    <div className="h-10 w-10 shrink-0 rounded-xl bg-base-300" />

    <div className="min-w-0 flex-1 space-y-2">
      <div className="h-3 w-1/3 rounded bg-base-300" />
      <div className="h-3 w-2/3 rounded bg-base-200" />
    </div>

    <div className="hidden h-6 w-16 rounded-full bg-base-200 sm:block" />
  </div>
);

const AdminDashboard = () => {
  const { user } = useAuth();
  const shouldReduceMotion = useReducedMotion();

  const [dashboardData, setDashboardData] = useState(
    createInitialDashboardData,
  );
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const loadDashboard = useCallback(
    async (signal) => {
      if (!user) {
        if (!signal.aborted) {
          setDashboardData(createInitialDashboardData());
          setLoadError(true);
          setLoading(false);
        }

        return;
      }

      setLoading(true);
      setLoadError(false);

      try {
        const token = await user.getIdToken();

        if (signal.aborted) {
          return;
        }

        const results = await Promise.all(
          API_RESOURCES.map(async ({ key, endpoint, fields }) => {
            try {
              const response = await fetch(`${API_URL}${endpoint}`, {
                method: "GET",
                headers: {
                  Authorization: `Bearer ${token}`,
                  Accept: "application/json",
                },
                signal,
              });

              let body = {};

              try {
                body = await response.json();
              } catch {
                body = {};
              }

              if (!response.ok || body?.success === false) {
                throw new Error(body?.message || `Unable to load ${key}`);
              }

              return {
                key,
                items: extractList(body, fields),
                error: false,
              };
            } catch (error) {
              if (error.name === "AbortError") {
                throw error;
              }

              return {
                key,
                items: [],
                error: true,
              };
            }
          }),
        );

        if (signal.aborted) {
          return;
        }

        const nextData = createInitialDashboardData();

        results.forEach(({ key, items, error }) => {
          nextData[key] = { items, error };
        });

        setDashboardData(nextData);
        setLoadError(results.some((result) => result.error));
      } catch (error) {
        if (error.name === "AbortError" || signal.aborted) {
          return;
        }

        setDashboardData({
          projects: { items: [], error: true },
          services: { items: [], error: true },
          skills: { items: [], error: true },
          contacts: { items: [], error: true },
        });

        setLoadError(true);
      } finally {
        if (!signal.aborted) {
          setLoading(false);
        }
      }
    },
    [user],
  );

  useEffect(() => {
    const controller = new AbortController();

    loadDashboard(controller.signal);

    return () => {
      controller.abort();
    };
  }, [loadDashboard, refreshKey]);

  const metrics = useMemo(
    () => [
      {
        title: "Projects",
        value: dashboardData.projects.error
          ? "—"
          : dashboardData.projects.items.length,
        description: dashboardData.projects.error
          ? "Projects could not be loaded"
          : "Projects returned by the API",
        icon: FiFolder,
        color: "text-primary",
        iconBackground: "bg-primary/10",
        href: "/admin/projects",
      },
      {
        title: "Services",
        value: dashboardData.services.error
          ? "—"
          : dashboardData.services.items.length,
        description: dashboardData.services.error
          ? "Services could not be loaded"
          : "Services returned by the API",
        icon: FiBriefcase,
        color: "text-secondary",
        iconBackground: "bg-secondary/10",
        href: "/admin/services",
      },
      {
        title: "Technical skills",
        value: dashboardData.skills.error
          ? "—"
          : dashboardData.skills.items.length,
        description: dashboardData.skills.error
          ? "Skills could not be loaded"
          : "Skills returned by the API",
        icon: FiCode,
        color: "text-accent",
        iconBackground: "bg-accent/10",
        href: "/admin/skills",
      },
      {
        title: "Inquiries",
        value: dashboardData.contacts.error
          ? "—"
          : dashboardData.contacts.items.length,
        description: dashboardData.contacts.error
          ? "Inquiries could not be loaded"
          : "Contact submissions received",
        icon: FiMail,
        color: "text-info",
        iconBackground: "bg-info/10",
        href: "/admin/contacts",
      },
    ],
    [dashboardData],
  );

  const contactItems = useMemo(
    () =>
      [...dashboardData.contacts.items]
        .sort(
          (a, b) =>
            getTimestamp(b.createdAt || b.created_at) -
            getTimestamp(a.createdAt || a.created_at),
        )
        .slice(0, 5),
    [dashboardData.contacts.items],
  );

  const displayName =
    user?.displayName?.trim() || user?.email?.split("@")[0] || "Administrator";

  const firstName = displayName.split(/\s+/)[0];

  const pageAnimation = shouldReduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.3 },
      };

  const refreshDashboard = () => {
    setRefreshKey((current) => current + 1);
  };

  return (
    <motion.div
      {...pageAnimation}
      className="mx-auto w-full max-w-[1600px] space-y-6 sm:space-y-8"
    >
      {/* Page heading */}
      <section className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0">
          <div className="mb-3 flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <FiActivity size={16} aria-hidden="true" />
            </span>

            <span className="text-xs font-bold uppercase tracking-[0.18em] text-base-content/55">
              Workspace overview
            </span>
          </div>

          <h1 className="break-words text-2xl font-bold tracking-tight text-base-content sm:text-3xl lg:text-4xl">
            {getGreeting()}, <span className="text-primary">{firstName}</span>
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-base-content/60 sm:text-base">
            Here is what is happening with your portfolio. Manage your work,
            review client inquiries, and keep your professional profile up to
            date.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={refreshDashboard}
            disabled={loading}
            className="btn btn-outline btn-sm gap-2 rounded-xl border-base-300 sm:btn-md"
            aria-label="Refresh dashboard data"
          >
            <FiRefreshCw
              size={15}
              className={loading ? "animate-spin" : ""}
              aria-hidden="true"
            />
            Refresh
          </button>

          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary btn-sm gap-2 rounded-xl sm:btn-md"
          >
            View portfolio
            <FiExternalLink size={15} aria-hidden="true" />
          </a>
        </div>
      </section>

      {/* API status notice */}
      {loadError && (
        <section
          role="status"
          aria-live="polite"
          className="flex flex-col gap-3 rounded-2xl border border-warning/20 bg-warning/5 p-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="flex items-start gap-3">
            <FiServer
              className="mt-0.5 shrink-0 text-warning"
              size={19}
              aria-hidden="true"
            />

            <div>
              <p className="text-sm font-semibold text-base-content">
                Some dashboard data could not be loaded
              </p>

              <p className="mt-1 text-sm leading-6 text-base-content/60">
                Check the API server, Firebase authentication token, and
                endpoint permissions. You can retry without leaving this page.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={refreshDashboard}
            disabled={loading}
            className="btn btn-ghost btn-sm self-start rounded-xl sm:self-center"
          >
            Try again
          </button>
        </section>
      )}

      {/* Metrics */}
      <section aria-labelledby="overview-metrics-heading">
        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2
              id="overview-metrics-heading"
              className="text-base font-bold text-base-content sm:text-lg"
            >
              Portfolio overview
            </h2>

            <p className="mt-1 text-xs text-base-content/50">
              A snapshot of your portfolio content.
            </p>
          </div>

          <span className="inline-flex items-center gap-2 self-start text-xs text-base-content/50 sm:self-auto">
            <span
              className={`h-2 w-2 rounded-full ${
                loadError ? "bg-warning" : "bg-success"
              }`}
            />
            {loading
              ? "Updating data"
              : loadError
                ? "Some data unavailable"
                : "API data loaded"}
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {metrics.map((metric, index) => (
            <MetricCard
              key={metric.title}
              {...metric}
              loading={loading}
              index={index}
              reduceMotion={shouldReduceMotion}
            />
          ))}
        </div>
      </section>

      {/* Main dashboard content */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        {/* Recent inquiries */}
        <section
          aria-labelledby="recent-inquiries-heading"
          className="min-w-0 overflow-hidden rounded-2xl border border-base-300/70 bg-base-100 shadow-sm xl:col-span-2"
        >
          <div className="flex flex-col gap-3 border-b border-base-300/70 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
            <div>
              <div className="flex items-center gap-2">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-info/10 text-info">
                  <FiMessageSquare size={18} aria-hidden="true" />
                </span>

                <h2
                  id="recent-inquiries-heading"
                  className="text-base font-bold text-base-content sm:text-lg"
                >
                  Recent inquiries
                </h2>
              </div>

              <p className="mt-2 text-sm text-base-content/55">
                Messages from people interested in working with you.
              </p>
            </div>

            <Link
              to="/admin/contacts"
              className="inline-flex items-center gap-2 self-start text-sm font-semibold text-primary transition hover:gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:self-center"
            >
              View all
              <FiArrowRight size={15} aria-hidden="true" />
            </Link>
          </div>

          {loading ? (
            <div
              className="space-y-5 p-5 sm:p-6"
              aria-label="Loading recent inquiries"
              aria-busy="true"
            >
              {[1, 2, 3].map((item) => (
                <LoadingInquiry key={item} />
              ))}
            </div>
          ) : dashboardData.contacts.error ? (
            <div className="p-8 text-center sm:p-10">
              <FiMail
                className="mx-auto text-base-content/30"
                size={28}
                aria-hidden="true"
              />

              <p className="mt-3 text-sm font-semibold text-base-content">
                Inquiries are unavailable
              </p>

              <p className="mt-1 text-sm leading-6 text-base-content/55">
                The contact endpoint could not be reached. Check the backend
                route and try again.
              </p>

              <button
                type="button"
                onClick={refreshDashboard}
                className="btn btn-outline btn-sm mt-4 rounded-xl"
              >
                Retry
              </button>
            </div>
          ) : contactItems.length === 0 ? (
            <div className="p-8 text-center sm:p-10">
              <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-base-200 text-base-content/50">
                <FiMessageSquare size={21} aria-hidden="true" />
              </span>

              <p className="mt-4 text-sm font-semibold text-base-content">
                No inquiries yet
              </p>

              <p className="mx-auto mt-1 max-w-xs text-sm leading-6 text-base-content/55">
                When someone contacts you through your portfolio, their message
                will appear here.
              </p>

              <Link
                to="/admin/contacts"
                className="btn btn-outline btn-sm mt-4 rounded-xl"
              >
                Open inquiries
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-base-300/60">
              {contactItems.map((contact, index) => {
                const contactName = contact.name || "Unknown sender";
                const contactEmail = contact.email || "No email provided";
                const contactStatus = getStatusLabel(contact.status);

                const contactKey =
                  contact._id || contact.id || `${contactEmail}-${index}`;

                return (
                  <article
                    key={contactKey}
                    className="flex flex-col gap-3 px-5 py-4 transition hover:bg-base-200/40 sm:flex-row sm:items-center sm:gap-4 sm:px-6"
                  >
                    <div className="flex min-w-0 flex-1 items-center gap-3">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-xs font-bold text-primary">
                        {getInitials(contactName)}
                      </span>

                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-base-content">
                          {contactName}
                        </p>

                        <p className="mt-1 truncate text-xs text-base-content/55">
                          {contact.subject || contact.service || contactEmail}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-3 sm:justify-end">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold capitalize ${
                          STATUS_STYLES[contactStatus] ||
                          "border-base-300 bg-base-200 text-base-content/65"
                        }`}
                      >
                        {contactStatus === "replied" ||
                        contactStatus === "sent" ? (
                          <FiCheckCircle size={12} aria-hidden="true" />
                        ) : (
                          <FiClock size={12} aria-hidden="true" />
                        )}

                        {contactStatus}
                      </span>

                      <time
                        dateTime={contact.createdAt || contact.created_at || ""}
                        className="whitespace-nowrap text-xs text-base-content/50"
                      >
                        {formatDate(contact.createdAt || contact.created_at)}
                      </time>

                      <Link
                        to="/admin/contacts"
                        aria-label={`View inquiry from ${contactName}`}
                        title="View inquiry"
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-base-content/50 transition hover:bg-primary/10 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                      >
                        <FiArrowUpRight size={16} aria-hidden="true" />
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          )}

          {!loading &&
            !dashboardData.contacts.error &&
            contactItems.length > 0 && (
              <div className="border-t border-base-300/70 bg-base-200/30 px-5 py-3 sm:px-6">
                <p className="text-xs text-base-content/50">
                  Showing the latest {contactItems.length} inquiries.
                </p>
              </div>
            )}
        </section>

        {/* Quick actions */}
        <section
          aria-labelledby="quick-actions-heading"
          className="min-w-0 rounded-2xl border border-base-300/70 bg-base-100 p-5 shadow-sm sm:p-6"
        >
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <FiTrendingUp size={18} aria-hidden="true" />
            </span>

            <h2
              id="quick-actions-heading"
              className="text-base font-bold text-base-content sm:text-lg"
            >
              Quick actions
            </h2>
          </div>

          <p className="mt-2 text-sm leading-6 text-base-content/55">
            Shortcuts to the areas you manage most.
          </p>

          <div className="mt-5 space-y-3">
            <Link
              to="/admin/projects"
              className="group flex min-w-0 items-center gap-3 rounded-xl border border-base-300/70 p-3.5 transition hover:border-primary/30 hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <FiFolder size={18} aria-hidden="true" />
              </span>

              <span className="min-w-0 flex-1">
                <span className="block text-sm font-semibold text-base-content">
                  Manage projects
                </span>

                <span className="mt-1 block text-xs leading-5 text-base-content/55">
                  Update your portfolio work
                </span>
              </span>

              <FiArrowUpRight
                className="shrink-0 text-base-content/35 transition group-hover:text-primary"
                size={17}
                aria-hidden="true"
              />
            </Link>

            <Link
              to="/admin/services"
              className="group flex min-w-0 items-center gap-3 rounded-xl border border-base-300/70 p-3.5 transition hover:border-secondary/30 hover:bg-secondary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
                <FiBriefcase size={18} aria-hidden="true" />
              </span>

              <span className="min-w-0 flex-1">
                <span className="block text-sm font-semibold text-base-content">
                  Update services
                </span>

                <span className="mt-1 block text-xs leading-5 text-base-content/55">
                  Keep your offerings current
                </span>
              </span>

              <FiArrowUpRight
                className="shrink-0 text-base-content/35 transition group-hover:text-secondary"
                size={17}
                aria-hidden="true"
              />
            </Link>

            <Link
              to="/admin/skills"
              className="group flex min-w-0 items-center gap-3 rounded-xl border border-base-300/70 p-3.5 transition hover:border-accent/30 hover:bg-accent/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                <FiCode size={18} aria-hidden="true" />
              </span>

              <span className="min-w-0 flex-1">
                <span className="block text-sm font-semibold text-base-content">
                  Manage skills
                </span>

                <span className="mt-1 block text-xs leading-5 text-base-content/55">
                  Maintain your technical stack
                </span>
              </span>

              <FiArrowUpRight
                className="shrink-0 text-base-content/35 transition group-hover:text-accent"
                size={17}
                aria-hidden="true"
              />
            </Link>

            <Link
              to="/admin/contacts"
              className="group flex min-w-0 items-center gap-3 rounded-xl border border-base-300/70 p-3.5 transition hover:border-info/30 hover:bg-info/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-info/10 text-info">
                <FiMail size={18} aria-hidden="true" />
              </span>

              <span className="min-w-0 flex-1">
                <span className="block text-sm font-semibold text-base-content">
                  Review inquiries
                </span>

                <span className="mt-1 block text-xs leading-5 text-base-content/55">
                  Respond to potential clients
                </span>
              </span>

              <FiArrowUpRight
                className="shrink-0 text-base-content/35 transition group-hover:text-info"
                size={17}
                aria-hidden="true"
              />
            </Link>
          </div>

          <div className="mt-5 rounded-xl border border-success/20 bg-success/5 p-4">
            <div className="flex items-start gap-3">
              <FiShield
                className="mt-0.5 shrink-0 text-success"
                size={18}
                aria-hidden="true"
              />

              <div>
                <p className="text-sm font-semibold text-base-content">
                  Admin workspace
                </p>

                <p className="mt-1 text-xs leading-5 text-base-content/55">
                  Keep your portfolio content accurate and review incoming
                  client messages regularly.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="flex flex-col gap-2 border-t border-base-300/70 pt-5 text-xs text-base-content/50 sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {displayName}. Portfolio administration.
        </p>

        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 self-start transition hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:self-auto"
        >
          Open public website
          <FiArrowUpRight size={13} aria-hidden="true" />
        </a>
      </footer>
    </motion.div>
  );
};

export default AdminDashboard;
