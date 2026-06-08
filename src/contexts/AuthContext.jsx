/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

function getStoredUsers() {
  try {
    return JSON.parse(localStorage.getItem("users")) || [];
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
      return;
    }
    const users = getStoredUsers();
    const found = users.find(
      (u) => u.email === email && u.password === password
    );
    if (!found) {
      setError("Invalid email or password.");
      return;
    }
    setUser({
      email,
      name: found.fullName || email.split("@")[0],
      fullName: found.fullName || "",
      phone: found.phone || "",
    });
  }

  function register({ email, password, fullName, phone }) {
    setError("");
    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }
    const users = getStoredUsers();
    if (users.find((u) => u.email === email)) {
      setError("An account with this email already exists.");
      return;
    }
    users.push({ email, password, fullName, phone });
    localStorage.setItem("users", JSON.stringify(users));
    setUser({ email, name: fullName || email.split("@")[0], fullName, phone });
  }

  function logout() {
    setUser(null);
    setError("");
  }

  function clearError() {
    setError("");
  }

  return (
    <AuthContext.Provider
      value={{ user, login, register, logout, error, clearError }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
