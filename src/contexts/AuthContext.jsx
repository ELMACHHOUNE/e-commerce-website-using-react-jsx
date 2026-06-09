/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect, useCallback } from "react";

const AuthContext = createContext(null);

const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL || "admin@admin.com";
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || "admin123";

function getStoredUsers() {
  try {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const hasAdmin = users.some((u) => u.email === ADMIN_EMAIL);
    if (!hasAdmin) {
      users.push({
        email: ADMIN_EMAIL,
        password: ADMIN_PASSWORD,
        fullName: "Admin",
        phone: "",
        avatar: "",
        role: "admin",
      });
      localStorage.setItem("users", JSON.stringify(users));
    }
    return users;
  } catch {
    return [];
  }
}

function getStoredUser() {
  try {
    return JSON.parse(localStorage.getItem("currentUser")) || null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(getStoredUser);
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user));
    } else {
      localStorage.removeItem("currentUser");
    }
  }, [user]);

  function login({ email, password }) {
    setError("");
    if (!email || !password) {
      setError("Email and password are required.");
      return false;
    }
    const users = getStoredUsers();
    const found = users.find(
      (u) => u.email === email && u.password === password
    );
    if (!found) {
      setError("Invalid email or password.");
      return false;
    }
    setUser({
      email,
      name: found.fullName || email.split("@")[0],
      fullName: found.fullName || "",
      phone: found.phone || "",
      avatar: found.avatar || "",
      role: found.role || "user",
    });
    return true;
  }

  function register({ email, password, fullName, phone, avatar }) {
    setError("");
    if (!email || !password) {
      setError("Email and password are required.");
      return false;
    }
    const users = getStoredUsers();
    if (users.find((u) => u.email === email)) {
      setError("An account with this email already exists.");
      return false;
    }
    users.push({ email, password, fullName, phone, avatar: avatar || "", role: "user" });
    localStorage.setItem("users", JSON.stringify(users));
    return true;
  }

  const updateProfile = useCallback(({ fullName, phone, avatar }) => {
    setError("");
    const users = getStoredUsers();
    const idx = users.findIndex((u) => u.email === user?.email);
    if (idx === -1) {
      setError("User not found.");
      return false;
    }
    users[idx] = { ...users[idx], fullName, phone, avatar };
    localStorage.setItem("users", JSON.stringify(users));
    setUser((prev) => ({ ...prev, fullName, phone, avatar }));
    return true;
  }, [user]);

  function logout() {
    setUser(null);
    setError("");
  }

  function clearError() {
    setError("");
  }

  return (
    <AuthContext.Provider
      value={{ user, login, register, updateProfile, logout, error, clearError }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
