import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import {
  FiActivity,
  FiArrowDownRight,
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

const API_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:5000"
).replace(/\/+$/, "");

const extractList = (body, keys = []) => {
  if (Array.isArray(body)) return body;

  if (Array.isArray(body?.data)) return body.data;
  if (Array.isArray(body?.items)) return body.items;

  for (const key of keys) {
    if (Array.isArray(body?.[key])) return body[key];
  }

  if (body?.data && typeof body.data === "object") {
    for (const key of keys) {
      if (Array.isArray(body.data[key])) return body.data[key];
    }
  }

  return [];
};

const formatDate = (value) => {
  if (!value) return "Date unavailable";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "Date unavailable";

  return new Intl.DateTimeFormat("en-BD", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
};

const getInitials = (name = "") => {
  const words = name.trim().split(/\s+/).filter(Boolean);

  if (!words.length) return "AD";

  return words
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join("");
};

const getGreeting = () => {
  const hour = new Date().getHours();

  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";

  return "Good evening";
};

const statusStyles = {
  unread: "bg-warning/10 text-warning border-warning/20",
  read: "bg-info/10 text-info border-info/20",
  replied: "bg-success/10 text-success border-success/20",
  pending: "bg-warning/10 text-warning border-warning/20",
  sent: "bg-success/10 text-success border-success/20",
  failed: "bg-error/10 text-error border-error/20",
};

const AdminDashboard = () => {
  const { user } = useAuth();
  const shouldReduceMotion = useReducedMotion();

  const [dashboardData, setDashboardData] = useState({
    projects: { items: [], error: false },
    services: { items: [], error: false },
    skills: { items: [], error: false },
    contacts: { items: [], error: false },
  });

  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const loadDashboard = useCallback(
    async (signal) => {
      if (!user) {
        setLoading(false);
        setLoadError(true);
        return;
      }

      setLoading(true);
      setLoadError(false);

      try {
        const token = await user.getIdToken();

        const resources = [
          {
            key: "projects",
            endpoint: "/api/projects",
            fields: ["projects"],
          },
          {
            key: "services",
            endpoint: "/api/services",
            fields: ["services"],
          },
          {
            key: "skills",
            endpoint: "/api/skills",
            fields: ["skills"],
          },
          {
            key: "contacts",
            endpoint: "/api/contact",
            fields: ["contacts", "inquiries"],
          },
        ];

        const results = await Promise.all(
          resources.map(async ({ key, endpoint, fields }) => {
            try {
              const response = await fetch(`${API_URL}${endpoint}`, {
                method: "GET",
                headers: {
                  Authorization: `Bearer ${token}`,
                  Accept: "application/json",
                },
                signal,
              });

              if (!response.ok) {
                throw new Error(`Unable to load ${key}`);
              }

              const body = await response.json();

              if (body?.success === false) {
                throw new Error(body.message || `Unable to load ${key}`);
              }

              return {
                key,
                items: extractList(body, fields),
                error: false,
              };
            } catch (error) {
              if (error.name === "AbortError") throw error;

              return {
                key,
                items: [],
                error: true,
              };
            }
          }),
        );

        if (signal.aborted) return;

        const nextData = {};

        results.forEach(({ key, items, error }) => {
          nextData[key] = { items, error };
        });

        setDashboardData(nextData);
        setLoadError(results.every((result) => result.error));
      } catch (error) {
        if (error.name === "AbortError") return;

        setLoadError(true);
        setDashboardData({
          projects: { items: [], error: true },
          services: { items: [], error: true },
          skills: { items: [], error: true },
          contacts: { items: [], error: true },
        });
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

    return () => controller.abort();
  }, [loadDashboard, refreshKey]);

  const metrics = [
    {
      title: "Projects",
      value: dashboardData.projects.error
        ? "—"
        : dashboardData.projects.items.length,
      description: "Projects available through the API",
      icon: FiFolder,
      accent: "text-primary",
      iconBackground: "bg-primary/10",
      href: "/admin/projects",
    },
    {
      title: "Services",
      value: dashboardData.services.error
        ? "—"
        : dashboardData.services.items.length,
      description: "Services available through the API",
      icon: FiBriefcase,
      accent: "text-secondary",
      iconBackground: "bg-secondary/10",
      href: "/admin/services",
    },
    {
      title: "Technical skills",
      value: dashboardData.skills.error
        ? "—"
        : dashboardData.skills.items.length,
      description: "Skills available through the API",
      icon: FiCode,
      accent: "text-accent",
      iconBackground: "bg-accent/10",
      href: "/admin/skills",
    },
    {
      title: "Inquiries",
      value: dashboardData.contacts.error
        ? "—"
        : dashboardData.contacts.items.length,
      description: dashboardData.contacts.error
        ? "Could not load inquiries"
        : "Contact submissions received",
      icon: FiMail,
      accent: "text-info",
      iconBackground: "bg-info/10",
      href: "/admin/contacts",
    },
  ];

  const contactItems = [...dashboardData.contacts.items]
    .sort((a, b) => {
      const dateA = new Date(a.createdAt || a.created_at || 0).getTime();
      const dateB = new Date(b.createdAt || b.created_at || 0).getTime();

      return dateB - dateA;
    })
    .slice(0, 5);

  const displayName =
    user?.displayName?.trim() || user?.email?.split("@")[0] || "Administrator";

  const pageAnimation = shouldReduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 12 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.35 },
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
              <FiActivity size={16} />
            </span>

            <span className="text-xs font-bold uppercase tracking-[0.18em] text-base-content/55">
              Workspace overview
            </span>
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-base-content sm:text-3xl lg:text-4xl">
            {getGreeting()},{" "}
            <span className="text-primary">{displayName.split(" ")[0]}</span>
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-base-content/60 sm:text-base">
            Here is what is happening with your portfolio. Manage your work,
            review client inquiries, and keep everything up to date.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setRefreshKey((current) => current + 1)}
            disabled={loading}
            className="btn btn-outline btn-sm gap-2 rounded-xl border-base-300 sm:btn-md"
          >
            <FiRefreshCw size={15} className={loading ? "animate-spin" : ""} />
            Refresh
          </button>

          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="btn btn-primary btn-sm gap-2 rounded-xl sm:btn-md"
          >
            View portfolio
            <FiExternalLink size={15} />
          </a>
        </div>
      </section>

      {/* Connection notice */}
      {loadError && (
        <div
          role="status"
          className="flex flex-col gap-3 rounded-2xl border border-warning/20 bg-warning/5 p-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="flex items-start gap-3">
            <FiServer className="mt-0.5 shrink-0 text-warning" size={19} />

            <div>
              <p className="text-sm font-semibold text-base-content">
                Some dashboard data could not be loaded
              </p>
              <p className="mt-1 text-sm text-base-content/60">
                Check your API server, authentication token, and endpoint
                permissions, then try refreshing.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setRefreshKey((current) => current + 1)}
            className="btn btn-ghost btn-sm self-start rounded-xl sm:self-center"
          >
            Try again
          </button>
        </div>
      )}

      {/* Metric cards */}
      <section aria-labelledby="overview-metrics-heading">
        <div className="mb-4 flex items-center justify-between gap-3">
          <h2
            id="overview-metrics-heading"
            className="text-base font-bold text-base-content sm:text-lg"
          >
            Portfolio overview
          </h2>

          <span className="flex items-center gap-2 text-xs text-base-content/50">
            <span className="h-2 w-2 rounded-full bg-success" />
            Live API data
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 2xl:grid-cols-4">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;

            return (
              <motion.div
                key={metric.title}
                {...(shouldReduceMotion
                  ? {}
                  : {
                      initial: { opacity: 0, y: 12 },
                      animate: { opacity: 1, y: 0 },
                      transition: {
                        duration: 0.3,
                        delay: index * 0.06,
                      },
                    })}
              >
                <Link
                  to={metric.href}
                  className="group block h-full rounded-2xl border border-base-300/70 bg-base-100 p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md sm:p-6"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div
                      className={`flex h-11 w-11 items-center justify-center rounded-2xl ${metric.iconBackground} ${metric.accent}`}
                    >
                      <Icon size={21} />
                    </div>

                    <span className="flex h-8 w-8 items-center justify-center rounded-full text-base-content/35 transition group-hover:bg-primary/10 group-hover:text-primary">
                      <FiArrowUpRight size={17} />
                    </span>
                  </div>

                  <div className="mt-6">
                    <p className="text-sm font-medium text-base-content/60">
                      {metric.title}
                    </p>

                    <div className="mt-1 flex items-end justify-between gap-3">
                      <p className="text-3xl font-bold tracking-tight text-base-content sm:text-4xl">
                        {loading ? (
                          <span className="inline-block h-9 w-12 animate-pulse rounded-lg bg-base-300" />
                        ) : (
                          metric.value
                        )}
                      </p>
                    </div>

                    <p className="mt-2 text-xs leading-5 text-base-content/50">
                      {metric.description}
                    </p>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Main content */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        {/* Recent inquiries */}
        <section className="overflow-hidden rounded-2xl border border-base-300/70 bg-base-100 shadow-sm xl:col-span-2">
          <div className="flex flex-col gap-3 border-b border-base-300/70 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
            <div>
              <div className="flex items-center gap-2">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-info/10 text-info">
                  <FiMessageSquare size={18} />
                </span>

                <h2 className="text-base font-bold text-base-content sm:text-lg">
                  Recent inquiries
                </h2>
              </div>

              <p className="mt-2 text-sm text-base-content/55">
                Keep track of messages from potential clients.
              </p>
            </div>

            <Link
              to="/admin/contacts"
              className="inline-flex items-center gap-2 self-start text-sm font-semibold text-primary transition hover:gap-3 sm:self-center"
            >
              View all
              <FiArrowRight size={15} />
            </Link>
          </div>

          {loading ? (
            <div
              className="space-y-4 p-5 sm:p-6"
              aria-label="Loading inquiries"
            >
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="flex animate-pulse items-center gap-3"
                >
                  <div className="h-10 w-10 rounded-xl bg-base-300" />
                  <div className="flex-1 space-y-2">
                    <div className="h-3 w-1/3 rounded bg-base-300" />
                    <div className="h-3 w-2/3 rounded bg-base-200" />
                  </div>
                </div>
              ))}
            </div>
          ) : dashboardData.contacts.error ? (
            <div className="p-8 text-center sm:p-10">
              <FiMail className="mx-auto text-base-content/30" size={28} />
              <p className="mt-3 text-sm font-semibold text-base-content">
                Inquiries are unavailable
              </p>
              <p className="mt-1 text-sm text-base-content/55">
                The contact endpoint could not be reached.
              </p>
            </div>
          ) : contactItems.length === 0 ? (
            <div className="p-8 text-center sm:p-10">
              <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-base-200 text-base-content/50">
                <FiMessageSquare size={21} />
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
                const contactStatus = String(
                  contact.status || "unread",
                ).toLowerCase();

                return (
                  <div
                    key={
                      contact._id || contact.id || `${contactEmail}-${index}`
                    }
                    className="flex flex-col gap-3 px-5 py-4 transition hover:bg-base-200/40 sm:flex-row sm:items-center sm:gap-4 sm:px-6"
                  >
                    <div className="flex min-w-0 flex-1 items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-xs font-bold text-primary">
                        {getInitials(contactName)}
                      </div>

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
                          statusStyles[contactStatus] ||
                          "border-base-300 bg-base-200 text-base-content/65"
                        }`}
                      >
                        {contactStatus === "replied" ? (
                          <FiCheckCircle size={12} />
                        ) : (
                          <FiClock size={12} />
                        )}
                        {contactStatus}
                      </span>

                      <span className="whitespace-nowrap text-xs text-base-content/50">
                        {formatDate(contact.createdAt || contact.created_at)}
                      </span>

                      <Link
                        to="/admin/contacts"
                        aria-label={`View inquiry from ${contactName}`}
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-base-content/50 transition hover:bg-primary/10 hover:text-primary"
                      >
                        <FiArrowUpRight size={16} />
                      </Link>
                    </div>
                  </div>
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
        <section className="rounded-2xl border border-base-300/70 bg-base-100 p-5 shadow-sm sm:p-6">
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <FiTrendingUp size={18} />
            </span>

            <h2 className="text-base font-bold text-base-content sm:text-lg">
              Quick actions
            </h2>
          </div>

          <p className="mt-2 text-sm leading-6 text-base-content/55">
            Shortcuts to the areas you manage most.
          </p>

          <div className="mt-5 space-y-3">
            <Link
              to="/admin/projects"
              className="group flex items-center gap-3 rounded-xl border border-base-300/70 p-3.5 transition hover:border-primary/30 hover:bg-primary/5"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <FiFolder size={18} />
              </span>

              <span className="min-w-0 flex-1">
                <span className="block text-sm font-semibold text-base-content">
                  Manage projects
                </span>
                <span className="mt-1 block text-xs text-base-content/55">
                  Update your portfolio work
                </span>
              </span>

              <FiArrowUpRight
                className="shrink-0 text-base-content/35 transition group-hover:text-primary"
                size={17}
              />
            </Link>

            <Link
              to="/admin/services"
              className="group flex items-center gap-3 rounded-xl border border-base-300/70 p-3.5 transition hover:border-secondary/30 hover:bg-secondary/5"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
                <FiBriefcase size={18} />
              </span>

              <span className="min-w-0 flex-1">
                <span className="block text-sm font-semibold text-base-content">
                  Update services
                </span>
                <span className="mt-1 block text-xs text-base-content/55">
                  Keep your offerings current
                </span>
              </span>

              <FiArrowUpRight
                className="shrink-0 text-base-content/35 transition group-hover:text-secondary"
                size={17}
              />
            </Link>

            <Link
              to="/admin/skills"
              className="group flex items-center gap-3 rounded-xl border border-base-300/70 p-3.5 transition hover:border-accent/30 hover:bg-accent/5"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                <FiCode size={18} />
              </span>

              <span className="min-w-0 flex-1">
                <span className="block text-sm font-semibold text-base-content">
                  Manage skills
                </span>
                <span className="mt-1 block text-xs text-base-content/55">
                  Maintain your technical stack
                </span>
              </span>

              <FiArrowUpRight
                className="shrink-0 text-base-content/35 transition group-hover:text-accent"
                size={17}
              />
            </Link>

            <Link
              to="/admin/contacts"
              className="group flex items-center gap-3 rounded-xl border border-base-300/70 p-3.5 transition hover:border-info/30 hover:bg-info/5"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-info/10 text-info">
                <FiMail size={18} />
              </span>

              <span className="min-w-0 flex-1">
                <span className="block text-sm font-semibold text-base-content">
                  Review inquiries
                </span>
                <span className="mt-1 block text-xs text-base-content/55">
                  Respond to potential clients
                </span>
              </span>

              <FiArrowUpRight
                className="shrink-0 text-base-content/35 transition group-hover:text-info"
                size={17}
              />
            </Link>
          </div>

          <div className="mt-5 rounded-xl border border-success/20 bg-success/5 p-4">
            <div className="flex items-start gap-3">
              <FiShield className="mt-0.5 shrink-0 text-success" size={18} />

              <div>
                <p className="text-sm font-semibold text-base-content">
                  Admin workspace
                </p>
                <p className="mt-1 text-xs leading-5 text-base-content/55">
                  Keep your content accurate and review incoming client messages
                  regularly.
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
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 self-start transition hover:text-primary sm:self-auto"
        >
          Open public website
          <FiArrowUpRight size={13} />
        </a>
      </footer>
    </motion.div>
  );
};

export default AdminDashboard;
