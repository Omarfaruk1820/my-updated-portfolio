import { motion, useReducedMotion } from "framer-motion";
import {
  FiArrowLeft,
  FiArrowUpRight,
  FiCheckCircle,
  FiCode,
  FiShield,
} from "react-icons/fi";
import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

import { useAuth } from "./AuthProvider";

const API_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:5000/api"
).replace(/\/+$/, "");

const GoogleIcon = ({ size = 19 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    aria-hidden="true"
    focusable="false"
  >
    <path
      fill="currentColor"
      d="M21.35 12.27c0-.72-.06-1.42-.18-2.09H12v3.95h5.23a4.47 4.47 0 0 1-1.94 2.93v2.43h3.14c1.84-1.69 2.92-4.18 2.92-7.22Z"
    />
    <path
      fill="currentColor"
      d="M12 21.5c2.63 0 4.84-.87 6.45-2.36l-3.14-2.43c-.87.58-1.98.92-3.31.92-2.54 0-4.69-1.72-5.46-4.03H3.3v2.51A9.74 9.74 0 0 0 12 21.5Z"
      opacity=".85"
    />
    <path
      fill="currentColor"
      d="M6.54 13.6A5.85 5.85 0 0 1 6.23 12c0-.56.11-1.1.31-1.6V7.89H3.3A9.73 9.73 0 0 0 2.25 12c0 1.57.38 3.05 1.05 4.11l3.24-2.51Z"
      opacity=".7"
    />
    <path
      fill="currentColor"
      d="M12 6.38c1.43 0 2.71.49 3.72 1.46l2.79-2.79C16.84 3.42 14.63 2.5 12 2.5a9.74 9.74 0 0 0-8.7 5.39l3.24 2.51C7.31 8.1 9.46 6.38 12 6.38Z"
      opacity=".9"
    />
  </svg>
);

const getVerificationErrorMessage = (error) => {
  const status = error?.response?.status;

  if (status === 400) {
    return "The authentication request is invalid. Please sign in again.";
  }

  if (status === 401) {
    return "Your session is invalid or expired. Please sign in again.";
  }

  if (status === 403) {
    return "This Google account is not authorized to access the admin workspace.";
  }

  if (status === 404) {
    return "Admin verification endpoint was not found. Check the backend /api/auth/me route.";
  }

  if (status === 429) {
    return "Too many requests. Please wait a moment and try again.";
  }

  if (error?.code === "ECONNABORTED" || error?.code === "ETIMEDOUT") {
    return "The server took too long to respond. Please try again.";
  }

  if (!error?.response) {
    return "Unable to connect to the server. Check that your backend is running.";
  }

  return (
    error?.response?.data?.message ||
    "Unable to verify administrator access. Please try again."
  );
};

const AdminLogin = () => {
  const navigate = useNavigate();
  const shouldReduceMotion = useReducedMotion();

  const {
    user,
    loading: authLoading,
    adminGoogleLogin,
    adminLogout,
  } = useAuth();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [checkingAdmin, setCheckingAdmin] = useState(false);

  const verificationInProgress = useRef(false);
  const loginInProgress = useRef(false);
  const verifiedUserUid = useRef(null);

  const verifyAdminAccess = useCallback(
    async (currentUser, showSuccessToast = false) => {
      if (!currentUser || verificationInProgress.current) {
        return false;
      }

      verificationInProgress.current = true;
      setCheckingAdmin(true);

      try {
        const idToken = await currentUser.getIdToken();

        if (!idToken) {
          throw new Error(
            "Could not generate a Firebase authentication token.",
          );
        }

        // VITE_API_URL already ends with /api.
        // Do not add /api again in this endpoint.
        const response = await axios.get(`${API_URL}/auth/me`, {
          headers: {
            Authorization: `Bearer ${idToken}`,
            Accept: "application/json",
          },
          timeout: 15000,
        });

        if (response.data?.success !== true) {
          throw new Error(
            response.data?.message ||
              "The backend could not verify administrator access.",
          );
        }

        verifiedUserUid.current = currentUser.uid;

        if (showSuccessToast) {
          toast.success("Admin authentication successful.");
        }

        navigate("/admin", { replace: true });

        return true;
      } catch (error) {
        console.error("Admin authorization verification failed:", {
          status: error?.response?.status,
          message: error?.response?.data?.message || error?.message,
          url: `${API_URL}/auth/me`,
        });

        const status = error?.response?.status;

        if (status === 401 || status === 403) {
          try {
            await adminLogout();
          } catch (logoutError) {
            console.error("Failed to sign out unauthorized user:", logoutError);
          }

          verifiedUserUid.current = null;
        }

        toast.error(getVerificationErrorMessage(error));

        return false;
      } finally {
        verificationInProgress.current = false;
        setCheckingAdmin(false);
      }
    },
    [adminLogout, navigate],
  );

  useEffect(() => {
    if (
      authLoading ||
      !user ||
      isSubmitting ||
      loginInProgress.current ||
      verificationInProgress.current
    ) {
      return;
    }

    if (verifiedUserUid.current === user.uid) {
      return;
    }

    void verifyAdminAccess(user);
  }, [authLoading, user, isSubmitting, verifyAdminAccess]);

  const handleGoogleLogin = async () => {
    if (
      loginInProgress.current ||
      verificationInProgress.current ||
      isSubmitting ||
      checkingAdmin
    ) {
      return;
    }

    loginInProgress.current = true;
    setIsSubmitting(true);

    try {
      const authenticatedUser = await adminGoogleLogin();

      if (!authenticatedUser) {
        throw new Error("Google authentication did not return a valid user.");
      }

      await verifyAdminAccess(authenticatedUser, true);
    } catch (error) {
      console.error("Google admin login failed:", error);

      toast.error(error?.message || "Google login failed. Please try again.");
    } finally {
      loginInProgress.current = false;
      setIsSubmitting(false);
    }
  };

  const isBusy = authLoading || isSubmitting || checkingAdmin;

  const containerVariants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 18,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.5,
        ease: "easeOut",
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      scale: shouldReduceMotion ? 1 : 0.98,
      y: shouldReduceMotion ? 0 : 12,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.45,
        delay: shouldReduceMotion ? 0 : 0.08,
        ease: "easeOut",
      },
    },
  };

  const features = [
    "Manage portfolio content",
    "Review client inquiries",
    "Update services and skills",
    "Control your public profile",
  ];

  if (authLoading || checkingAdmin) {
    return (
      <main
        className="flex min-h-screen items-center justify-center bg-base-100 px-4 text-base-content"
        aria-live="polite"
        aria-busy="true"
      >
        <div className="flex flex-col items-center text-center">
          <span
            className="loading loading-spinner loading-lg text-primary"
            aria-hidden="true"
          />
          <p className="mt-4 text-sm font-medium text-base-content/60">
            {authLoading
              ? "Checking your secure session..."
              : "Verifying administrator access..."}
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-base-100 text-base-content">
      <div className="relative isolate min-h-screen">
        <div
          className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
          aria-hidden="true"
        >
          <div className="absolute left-1/2 top-20 h-64 w-64 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl sm:h-80 sm:w-80" />
          <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-secondary/5 blur-3xl" />
          <div className="absolute right-0 top-1/3 h-64 w-64 rounded-full bg-accent/5 blur-3xl" />

          <div
            className="absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage:
                "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />
        </div>

        <header className="border-b border-base-300/60 bg-base-100/85 backdrop-blur-xl">
          <div className="mx-auto flex min-h-16 w-full max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
            <Link
              to="/"
              className="group inline-flex min-w-0 items-center gap-3"
              aria-label="Back to Omar Faruk portfolio homepage"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-base-300 bg-base-200/70 text-primary shadow-sm">
                <FiCode size={20} aria-hidden="true" />
              </span>

              <span className="min-w-0">
                <span className="block truncate text-sm font-semibold tracking-tight">
                  Omar Faruk
                </span>
                <span className="hidden truncate text-xs text-base-content/55 sm:block">
                  Full Stack Developer
                </span>
              </span>
            </Link>

            <Link
              to="/"
              className="group inline-flex shrink-0 items-center gap-2 rounded-lg px-2.5 py-2 text-xs font-medium text-base-content/65 transition-colors hover:bg-base-200 hover:text-base-content sm:px-3 sm:text-sm"
            >
              <FiArrowLeft
                size={16}
                className="transition-transform duration-200 group-hover:-translate-x-0.5"
                aria-hidden="true"
              />
              <span>Back to website</span>
            </Link>
          </div>
        </header>

        <section className="px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-20">
          <div className="mx-auto grid w-full max-w-6xl items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="order-2 lg:order-1"
            >
              <div className="mx-auto max-w-xl lg:mx-0">
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-base-300 bg-base-200/60 px-3.5 py-2 text-xs font-medium text-base-content/70 shadow-sm">
                  <span
                    className="h-2 w-2 rounded-full bg-success"
                    aria-hidden="true"
                  />
                  <span>Private workspace</span>
                  <FiShield
                    size={13}
                    className="text-primary"
                    aria-hidden="true"
                  />
                </div>

                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-primary">
                  Admin Portal
                </p>

                <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                  Manage your
                  <span className="block text-base-content/55">
                    digital portfolio.
                  </span>
                </h1>

                <p className="mt-5 max-w-lg text-base leading-7 text-base-content/65 sm:text-lg">
                  Manage projects, services, skills, experience, education,
                  testimonials, and client inquiries from one professional
                  workspace.
                </p>

                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                  {features.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-center gap-3 rounded-xl border border-base-300/70 bg-base-200/40 px-4 py-3"
                    >
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-success/10 text-success">
                        <FiCheckCircle size={16} aria-hidden="true" />
                      </span>
                      <span className="text-sm font-medium text-base-content/75">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex items-center gap-3 border-t border-base-300/60 pt-6">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <FiCode size={18} aria-hidden="true" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold">Omar Faruk</p>
                    <p className="text-xs text-base-content/50">
                      MERN Stack · Full Stack Development
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              className="order-1 lg:order-2"
            >
              <div className="mx-auto w-full max-w-md">
                <div className="rounded-3xl border border-base-300/70 bg-base-100/95 p-5 shadow-2xl shadow-base-content/5 backdrop-blur-xl sm:p-7">
                  <div className="mb-7 text-center">
                    <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-base-300 bg-base-200 text-base-content shadow-sm">
                      <GoogleIcon size={30} />
                    </div>

                    <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                      Secure Google authentication
                    </p>

                    <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                      Admin Login
                    </h2>

                    <p className="mx-auto mt-2 max-w-xs text-sm leading-6 text-base-content/55">
                      Continue with your authorized Google account to access
                      your portfolio management dashboard.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleGoogleLogin}
                    disabled={isBusy}
                    aria-busy={isBusy}
                    className="btn btn-outline h-13 min-h-13 w-full rounded-xl border-base-300 bg-base-100 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 hover:border-base-content/20 hover:bg-base-200 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isSubmitting ? (
                      <>
                        <span
                          className="loading loading-spinner loading-sm"
                          aria-hidden="true"
                        />
                        <span>Signing in...</span>
                      </>
                    ) : (
                      <>
                        <GoogleIcon />
                        <span>Continue with Google</span>
                        <FiArrowUpRight size={17} aria-hidden="true" />
                      </>
                    )}
                  </button>

                  <div className="mt-6 rounded-2xl border border-base-300/70 bg-base-200/40 p-4">
                    <div className="flex gap-3">
                      <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <FiShield size={17} aria-hidden="true" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold">
                          Protected workspace
                        </p>
                        <p className="mt-1 text-xs leading-5 text-base-content/55">
                          Firebase authenticates your Google account. The
                          backend must independently verify your token and
                          administrator permissions.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 rounded-xl border border-base-300/60 px-4 py-3">
                    <div className="flex items-start gap-3">
                      <FiCode
                        size={16}
                        className="mt-0.5 shrink-0 text-primary"
                        aria-hidden="true"
                      />
                      <p className="text-xs leading-5 text-base-content/55">
                        Only the authorized portfolio administrator can access
                        this workspace.
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 text-center">
                    <Link
                      to="/"
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-base-content/50 transition-colors hover:text-primary"
                    >
                      <span>Return to portfolio</span>
                      <FiArrowUpRight size={13} aria-hidden="true" />
                    </Link>
                  </div>
                </div>

                <p className="mt-5 text-center text-[11px] leading-5 text-base-content/40">
                  Secure admin area · Omar Faruk Portfolio
                </p>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default AdminLogin;
