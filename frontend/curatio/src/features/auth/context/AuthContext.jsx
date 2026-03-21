import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  createSession as createSessionRequest,
  deleteSession as deleteSessionRequest,
  getCurrentSession,
} from "@/lib/http/identity";
import { adaptBackendUserToUi } from "@/lib/adapters/userAdapter";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isBootstrapping, setIsBootstrapping] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const bootstrap = async () => {
      try {
        const response = await getCurrentSession();
        if (!isMounted) return;

        setUser(adaptBackendUserToUi(response?.data?.user));
      } catch (error) {
        if (!isMounted) return;
        setUser(null);
      } finally {
        if (isMounted) {
          setIsBootstrapping(false);
        }
      }
    };

    const handleSessionExpired = () => {
      if (!isMounted) return;
      setUser(null);
    };

    window.addEventListener("session-expired", handleSessionExpired);
    bootstrap();

    return () => {
      isMounted = false;
      window.removeEventListener("session-expired", handleSessionExpired);
    };
  }, []);

  const signIn = async (payload) => {
    const response = await createSessionRequest(payload);
    const adaptedUser = adaptBackendUserToUi(response?.data?.user);
    setUser(adaptedUser);
    return adaptedUser;
  };

  const signOut = async () => {
    try {
      await deleteSessionRequest();
    } finally {
      setUser(null);
    }
  };

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      isBootstrapping,
      signIn,
      signOut,
    }),
    [user, isBootstrapping]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}