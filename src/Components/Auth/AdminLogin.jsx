import { motion, useReducedMotion } from "framer-motion";
import {
  FiArrowLeft,
  FiArrowUpRight,
  FiCheckCircle,
  FiCode,
  FiShield,
} from "react-icons/fi";
import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

import { useAuth } from "./AuthProvider";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const GoogleIcon = ({ size = 19 }) => {
  return (
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

  /*
   * Verify the currently authenticated Firebase user
   * against the backend admin authorization.
   */
  const verifyAdminAccess = useCallback(
    async (currentUser, showSuccessToast = false) => {
      if (!currentUser) {
        return false;
      }

      try {
        setCheckingAdmin(true);

        const idToken = await currentUser.getIdToken();

        if (!idToken) {
          throw new Error("Authentication token could not be generated.");
        }

        const response = await axios.get(`${API_URL}/api/auth/me`, {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
          timeout: 10000,
        });

        if (!response.data?.success) {
          throw new Error(
            response.data?.message ||
              "You are not authorized to access the admin workspace.",
          );
        }

        if (showSuccessToast) {
          toast.success("Welcome back, Omar.");
        }

        navigate("/admin", {
          replace: true,
        });

        return true;
      } catch (error) {
        console.error("❌ Admin authorization verification failed:", error);

        /*
         * Firebase user is authenticated but does not have
         * administrator permission.
         */
        if (error?.response?.status === 403) {
          try {
            await adminLogout();
          } catch (logoutError) {
            console.error(
              "❌ Failed to sign out unauthorized user:",
              logoutError,
            );
          }

          toast.error("You are not authorized to access the admin workspace.");

          return false;
        }

        /*
         * Firebase token is invalid, expired, or missing.
         */
        if (error?.response?.status === 401) {
          try {
            await adminLogout();
          } catch (logoutError) {
            console.error(
              "❌ Failed to sign out unauthenticated user:",
              logoutError,
            );
          }

          toast.error(
            error?.response?.data?.message ||
              "Your authentication session is invalid. Please sign in again.",
          );

          return false;
        }

        /*
         * Backend/server/network issue.
         */
        if (error?.response) {
          toast.error(
            error?.response?.data?.message ||
              "Unable to verify administrator access. Please try again.",
          );

          return false;
        }

        toast.error(
          error?.message ||
            "Unable to verify administrator access. Please try again.",
        );

        return false;
      } finally {
        setCheckingAdmin(false);
      }
    },
    [adminLogout, navigate],
  );

  /*
   * If Firebase already has a logged-in user,
   * verify that user with the backend before allowing
   * access to the admin dashboard.
   */
  useEffect(() => {
    if (authLoading || !user || isSubmitting) {
      return;
    }

    verifyAdminAccess(user);
  }, [authLoading, user, isSubmitting, verifyAdminAccess]);

  /*
   * Google-only admin authentication.
   */
  const handleGoogleLogin = async () => {
    if (isSubmitting || checkingAdmin) {
      return;
    }

    setIsSubmitting(true);

    try {
      /*
       * Step 1:
       * Authenticate through Firebase Google Authentication.
       */
      const authenticatedUser = await adminGoogleLogin();

      if (!authenticatedUser) {
        throw new Error("Google authentication did not return a valid user.");
      }

      /*
       * Step 2:
       * Verify Firebase ID token + ADMIN_UID through backend.
       */
      await verifyAdminAccess(authenticatedUser, true);
    } catch (error) {
      console.error("❌ Google admin login failed:", error);

      /*
       * If the error came from Firebase/AuthProvider,
       * display its user-friendly message.
       */
      if (error?.response?.status === 403) {
        return;
      }

      if (error?.response?.status === 401) {
        return;
      }

      toast.error(error?.message || "Google login failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const containerVariants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 18,
    },

    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.55,
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
        duration: shouldReduceMotion ? 0 : 0.5,
        delay: shouldReduceMotion ? 0 : 0.08,
        ease: "easeOut",
      },
    },
  };

  const features = [
    "Manage portfolio content",
    "Review client inquiries",
    "Update services & skills",
    "Control your public profile",
  ];

  /*
   * Initial Firebase session check.
   */
  if (authLoading || checkingAdmin) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-base-100 px-4 text-base-content">
        <div className="flex flex-col items-center text-center">
          <span className="loading loading-spinner loading-lg text-primary" />

          <p className="mt-4 text-sm font-medium text-base-content/60">
            {authLoading
              ? "Checking secure session..."
              : "Verifying administrator access..."}
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-base-100 text-base-content">
      <div className="relative min-h-screen overflow-hidden">
        {/* Background */}
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
        >
          <div className="absolute left-1/2 top-24 h-80 w-80 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl sm:top-20" />

          <div className="absolute -bottom-32 -left-32 h-72 w-72 rounded-full bg-secondary/5 blur-3xl" />

          <div className="absolute right-0 top-1/3 h-72 w-72 rounded-full bg-accent/5 blur-3xl" />

          <div
            className="absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage:
                "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />
        </div>

        {/* Header */}
        <header className="relative z-10 mt-16 border-b border-base-300/60 bg-base-100/95 backdrop-blur-xl sm:mt-20">
          <div className="mx-auto flex min-h-16 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
            <Link
              to="/"
              className="group inline-flex min-w-0 items-center gap-3"
              aria-label="Back to Omar Faruk portfolio homepage"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-base-300 bg-base-200/70 text-primary shadow-sm">
                <FiCode size={20} aria-hidden="true" />
              </span>

              <span className="hidden min-w-0 sm:block">
                <span className="block truncate text-sm font-semibold tracking-tight">
                  Omar Faruk
                </span>

                <span className="block truncate text-xs text-base-content/55">
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

        {/* Main Content */}
        <section className="relative z-10 px-4 pb-12 pt-12 sm:px-6 sm:pb-16 sm:pt-16 lg:px-8 lg:pb-20 lg:pt-20">
          <div className="mx-auto grid w-full max-w-6xl items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            {/* Information */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="order-2 lg:order-1"
            >
              <div className="mx-auto max-w-xl lg:mx-0">
                {/* Private Workspace */}
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
                  Securely manage projects, services, skills, experience,
                  education, testimonials, and client inquiries from one
                  professional workspace.
                </p>

                {/* Features */}
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

                {/* Developer Identity */}
                <div className="mt-8 flex items-center gap-3 border-t border-base-300/60 pt-6">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <FiCode size={18} aria-hidden="true" />
                  </div>

                  <div className="min-w-0">
                    <p className="text-sm font-semibold">Omar Faruk</p>

                    <p className="text-xs text-base-content/50">
                      MERN Stack • Full Stack Development
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Login Card */}
            <motion.div
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              className="order-1 lg:order-2"
            >
              <div className="mx-auto w-full max-w-md">
                <div className="rounded-3xl border border-base-300/70 bg-base-100/95 p-5 shadow-2xl shadow-base-content/5 backdrop-blur-xl sm:p-7">
                  {/* Login Header */}
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

                  {/* Google Login */}
                  <button
                    type="button"
                    onClick={handleGoogleLogin}
                    disabled={isSubmitting || checkingAdmin}
                    aria-busy={isSubmitting || checkingAdmin}
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

                  {/* Authentication Explanation */}
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
                          Your Google account is authenticated by Firebase and
                          administrator access is verified securely by the
                          backend.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Admin Access Notice */}
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

                  {/* Return to Portfolio */}
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
                  Secure admin area • Omar Faruk Portfolio
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
