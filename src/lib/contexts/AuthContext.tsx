"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { User, authApi } from "@/lib/api/auth";

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (
    fullName: string,
    phone: string,
    email: string,
    password: string,
    confirmPassword: string
  ) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = !!user && !!token;

  // Load auth data from localStorage on app start
  useEffect(() => {
    const loadAuthData = async () => {
      try {
        const savedToken = localStorage.getItem("auth_token");
        const savedUser = localStorage.getItem("auth_user");

        if (savedToken && savedUser) {
          // Validate token with backend
          const validation = await authApi.validateToken(savedToken);

          if (validation.valid && validation.user) {
            setToken(savedToken);
            setUser(validation.user);
          } else {
            // Token invalid, clear storage
            localStorage.removeItem("auth_token");
            localStorage.removeItem("auth_user");
          }
        }
      } catch (error) {
        console.error("Error loading auth data:", error);
        // Clear invalid data
        localStorage.removeItem("auth_token");
        localStorage.removeItem("auth_user");
      } finally {
        setIsLoading(false);
      }
    };

    loadAuthData();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await authApi.login({ email, password });

      const { user: userData, token: authToken } = response.data;

      // Save to state
      setUser(userData);
      setToken(authToken);

      // Save to localStorage
      localStorage.setItem("auth_token", authToken);
      localStorage.setItem("auth_user", JSON.stringify(userData));
    } catch (error) {
      throw error;
    }
  };

  const register = async (
    fullName: string,
    phone: string,
    email: string,
    password: string,
    confirmPassword: string
  ) => {
    try {
      const response = await authApi.register({
        fullName,
        phone,
        email,
        password,
        confirmPassword,
      });

      // Registration successful, but don't auto-login
      // User should be redirected to login page
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("auth_token");
    localStorage.removeItem("auth_user");
  };

  const value: AuthContextType = {
    user,
    token,
    isLoading,
    isAuthenticated,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
