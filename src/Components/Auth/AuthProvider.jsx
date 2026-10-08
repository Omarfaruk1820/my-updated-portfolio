import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";

import { auth } from "./firebase.config";

export const AuthContext = createContext(null);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account",
});

const getFirebaseErrorMessage = (error) => {
  switch (error?.code) {
    case "auth/popup-closed-by-user":
      return "Google login was cancelled.";

    case "auth/popup-blocked":
      return "Google login popup was blocked by your browser.";

    case "auth/cancelled-popup-request":
      return "Another Google login request is already in progress.";

    case "auth/network-request-failed":
      return "Network error. Please check your internet connection.";

    case "auth/account-exists-with-different-credential":
      return "An account already exists with a different sign-in method.";

    case "auth/user-disabled":
      return "This account has been disabled.";

    case "auth/operation-not-allowed":
      return "Google authentication is not enabled for this Firebase project.";

    default:
      return "Google authentication failed. Please try again.";
  }
};

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * Google Admin Login
   */
  const adminGoogleLogin = useCallback(async () => {
    setError(null);

    try {
      const result = await signInWithPopup(auth, googleProvider);

      return result.user;
    } catch (error) {
      console.error("❌ Google login failed:", error);

      const message = getFirebaseErrorMessage(error);

      setError(message);

      throw new Error(message);
    }
  }, []);

  /**
   * Admin Logout
   */
  const adminLogout = useCallback(async () => {
    setError(null);

    try {
      await signOut(auth);
    } catch (error) {
      console.error("❌ Admin logout failed:", error);

      const message = "Unable to sign out. Please try again.";

      setError(message);

      throw new Error(message);
    }
  }, []);

  /**
   * Clear authentication error
   */
  const clearAuthError = useCallback(() => {
    setError(null);
  }, []);

  /**
   * Listen for Firebase authentication state changes
   */
  useEffect(() => {
    setLoading(true);

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const authInfo = useMemo(
    () => ({
      user,
      loading,
      error,
      adminGoogleLogin,
      adminLogout,
      clearAuthError,
    }),
    [user, loading, error, adminGoogleLogin, adminLogout, clearAuthError],
  );

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside an AuthProvider.");
  }

  return context;
};

export default AuthProvider;
