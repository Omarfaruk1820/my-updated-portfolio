import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";

import { auth } from "../Auth/firebase.config";

const AdminProtectedRoute = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (currentUser) => {
        setUser(currentUser);
        setLoading(false);
      },
      (error) => {
        console.error("Authentication check failed:", error);
        setUser(null);
        setLoading(false);
      },
    );

    return unsubscribe;
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-base-200">
        <div className="flex flex-col items-center gap-3">
          <span className="loading loading-spinner loading-lg text-primary" />
          <p className="text-sm text-base-content/60">
            Verifying administrator access...
          </p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/admin/login" replace state={{ from: location }} />;
  }

  const adminUid = import.meta.env.VITE_ADMIN_UID?.trim();

  if (!adminUid || user.uid !== adminUid) {
    console.error("Admin access denied:", {
      signedInUid: user.uid,
      adminUidConfigured: Boolean(adminUid),
      uidMatches: user.uid === adminUid,
    });

    return (
      <div className="flex min-h-screen items-center justify-center bg-base-200 px-4">
        <div className="w-full max-w-md rounded-2xl border border-base-300 bg-base-100 p-8 text-center shadow-xl">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-error/10 text-error">
            <span className="text-2xl font-bold">!</span>
          </div>

          <h1 className="text-2xl font-bold">Access Denied</h1>

          <p className="mt-3 text-sm leading-6 text-base-content/65">
            Your account does not have administrator permissions. Please sign in
            with your authorized administrator account.
          </p>

          <button
            type="button"
            onClick={() => {
              window.location.href = "/admin/login";
            }}
            className="btn btn-primary mt-6 w-full rounded-xl"
          >
            Return to Admin Login
          </button>
        </div>
      </div>
    );
  }

  return <Outlet />;
};

export default AdminProtectedRoute;
