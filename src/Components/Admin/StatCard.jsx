import { useMemo } from "react";
import {
  FiArrowDownRight,
  FiArrowUpRight,
  FiMinus,
  FiMoreHorizontal,
} from "react-icons/fi";

const ICON_STYLES = {
  primary: {
    icon: "bg-primary/10 text-primary",
    accent: "bg-primary",
  },
  secondary: {
    icon: "bg-secondary/10 text-secondary",
    accent: "bg-secondary",
  },
  accent: {
    icon: "bg-accent/10 text-accent",
    accent: "bg-accent",
  },
  success: {
    icon: "bg-success/10 text-success",
    accent: "bg-success",
  },
  warning: {
    icon: "bg-warning/10 text-warning",
    accent: "bg-warning",
  },
  error: {
    icon: "bg-error/10 text-error",
    accent: "bg-error",
  },
  neutral: {
    icon: "bg-base-200 text-base-content/70",
    accent: "bg-base-content/40",
  },
};

const StatCard = ({
  title = "Total Items",
  value = 0,
  description,
  icon: Icon,
  color = "primary",
  trend,
  trendLabel,
  trendDirection,
  loading = false,
  footer,
  onClick,
  href,
  className = "",
}) => {
  const styles = ICON_STYLES[color] || ICON_STYLES.primary;

  const formattedValue = useMemo(() => {
    if (value === null || value === undefined || value === "") {
      return "—";
    }

    if (typeof value === "number" && Number.isFinite(value)) {
      return new Intl.NumberFormat("en-US", {
        maximumFractionDigits: 2,
      }).format(value);
    }

    return String(value);
  }, [value]);

  const resolvedTrendDirection =
    trendDirection ||
    (typeof trend === "number"
      ? trend > 0
        ? "up"
        : trend < 0
          ? "down"
          : "neutral"
      : "neutral");

  const trendStyles = {
    up: "bg-success/10 text-success",
    down: "bg-error/10 text-error",
    neutral: "bg-base-200 text-base-content/60",
  };

  const TrendIcon =
    resolvedTrendDirection === "up"
      ? FiArrowUpRight
      : resolvedTrendDirection === "down"
        ? FiArrowDownRight
        : FiMinus;

  const hasTrend = trend !== null && trend !== undefined;
  const isInteractive = Boolean(onClick || href);

  const cardContent = (
    <>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-base-content/60">
            {title}
          </p>

          {loading ? (
            <div
              className="mt-4 h-9 w-24 animate-pulse rounded-lg bg-base-300/70"
              aria-label={`Loading ${title}`}
            />
          ) : (
            <p
              className="mt-3 break-words text-3xl font-bold tracking-tight text-base-content sm:text-[2rem]"
              aria-live="polite"
            >
              {formattedValue}
            </p>
          )}

          {description && (
            <p className="mt-2 text-xs leading-5 text-base-content/50 sm:text-sm">
              {description}
            </p>
          )}
        </div>

        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${styles.icon} sm:h-12 sm:w-12`}
          aria-hidden="true"
        >
          {Icon ? (
            <Icon size={22} strokeWidth={1.8} />
          ) : (
            <FiMoreHorizontal size={22} />
          )}
        </div>
      </div>

      {(hasTrend || trendLabel) && (
        <div className="mt-5 flex flex-wrap items-center gap-2">
          {hasTrend && (
            <span
              className={`inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-semibold ${trendStyles[resolvedTrendDirection] || trendStyles.neutral}`}
            >
              <TrendIcon size={14} aria-hidden="true" />
              <span>
                {typeof trend === "number"
                  ? `${Math.abs(trend)}%`
                  : String(trend)}
              </span>
            </span>
          )}

          {trendLabel && (
            <span className="text-xs leading-5 text-base-content/50">
              {trendLabel}
            </span>
          )}
        </div>
      )}

      {footer && (
        <div className="mt-4 border-t border-base-300/60 pt-3 text-xs leading-5 text-base-content/55">
          {footer}
        </div>
      )}
    </>
  );

  const sharedClasses = [
    "group relative flex h-full min-h-[180px] flex-col justify-between overflow-hidden rounded-2xl border border-base-300/70 bg-base-100 p-5 shadow-sm transition-all duration-200 sm:min-h-[195px] sm:p-6",
    isInteractive
      ? "cursor-pointer hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-lg hover:shadow-base-content/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-base-100"
      : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (href) {
    return (
      <a
        href={href}
        className={sharedClasses}
        aria-label={`${title}: ${loading ? "Loading" : formattedValue}`}
      >
        <span
          className={`absolute inset-x-0 top-0 h-[3px] ${styles.accent} opacity-70 transition-opacity group-hover:opacity-100`}
          aria-hidden="true"
        />
        {cardContent}
      </a>
    );
  }

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        disabled={loading}
        className={`${sharedClasses} text-left disabled:cursor-wait disabled:opacity-70`}
        aria-label={`${title}: ${loading ? "Loading" : formattedValue}`}
      >
        <span
          className={`absolute inset-x-0 top-0 h-[3px] ${styles.accent} opacity-70 transition-opacity group-hover:opacity-100`}
          aria-hidden="true"
        />
        {cardContent}
      </button>
    );
  }

  return (
    <article className={sharedClasses}>
      <span
        className={`absolute inset-x-0 top-0 h-[3px] ${styles.accent} opacity-70`}
        aria-hidden="true"
      />
      {cardContent}
    </article>
  );
};

export default StatCard;
