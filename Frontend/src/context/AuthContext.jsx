import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../utils/api.js";

const AuthCtx = createContext();

export function AuthProvider({ children }) {
  const [user, setUser]   = useState(null);
  const [loading, setL]   = useState(true);
  const [isAuth, setAuth] = useState(false);

  // bootstrap session on first mount
  useEffect(() => {
    (async () => {
      try {
        const res  = await api.me();
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
          setAuth(true);
        }
      } finally {
        setL(false);
      }
    })();
  }, []);

  const login = async (email, password) => {
    const r = await api.login({ email, password });
    const d = await r.json();
    if (!r.ok) throw new Error(d.message);
    setUser(d.user);
    setAuth(true);
  };

  const logout = async () => {
    await api.logout();
    setUser(null);
    setAuth(false);
  };

  return (
    <AuthCtx.Provider value={{ user, loading, isAuthenticated: isAuth, login, logout }}>
      {children}
    </AuthCtx.Provider>
  );
}

export const useAuth = () => useContext(AuthCtx);
