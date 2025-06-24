// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [user, setUser] = useState(null);

  // Auto-load user if token exists
  useEffect(() => {
    if (token) {
      axios
        .get("http://localhost:8080/api/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => setUser(res.data))
        .catch(() => {
          setToken("");
          setUser(null);
          localStorage.removeItem("token");
        });
    }
  }, [token]);

  // Register
  const register = async (userData) => {
    const res = await axios.post("http://localhost:8080/api/auth/register", userData);
    return res.data;
  };

  // Login
  const login = async (credentials) => {
    const res = await axios.post("http://localhost:8080/api/auth/login", credentials);
    const { token, user } = res.data;
    setToken(token);
    setUser(user);
    localStorage.setItem("token", token);
    return res.data;
  };

  // Logout
  const logout = () => {
    setToken("");
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ token, user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
