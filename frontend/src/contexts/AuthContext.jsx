/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useEffect, useContext } from "react";
import api from "../api";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  // ---- LOGIN ----
  const login = async (email, password) => {
    try {
      const res = await api.post(`/api/auth/login`, { email, password });
      const { user: userData, token: tokenValue } = res.data || {};

      if (!tokenValue || !userData) {
        console.error("Login response missing token/user");
        return false;
      }

      setUser(userData);
      setToken(tokenValue);
      localStorage.setItem("token", tokenValue);
      localStorage.setItem("user", JSON.stringify(userData));
      return true;
    } catch (err) {
      console.error("Login failed:", err?.response?.data || err?.message);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  // Restore από localStorage στο mount
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");
    if (savedToken) setToken(savedToken);
    if (savedUser) {
      try { setUser(JSON.parse(savedUser)); }
      catch { localStorage.removeItem("user"); }
    }
  }, []);

  // sync μεταξύ tabs
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === "token" || e.key === "user") {
        const t = localStorage.getItem("token");
        const u = localStorage.getItem("user");
        setToken(t || null);
        setUser(u ? JSON.parse(u) : null);
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Μικρό helper hook για ομοιομορφία στις εισαγωγές
export const useAuth = () => useContext(AuthContext);
