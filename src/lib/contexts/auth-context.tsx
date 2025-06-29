"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthService } from "../api/services";
import { TokenManager } from "../api/client";
import type { User } from "../api/client";

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (nama: string, password: string) => Promise<boolean>;
  register: (data: {
    fullName: string;
    phone: string;
    email: string;
    password: string;
  }) => Promise<boolean>;
  logout: () => void;
  updateUser: (user: User) => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = !!user && !!token;

  const refreshUser = async () => {
    try {
      if (AuthService.isAuthenticated()) {
        const response = await AuthService.getCurrentUser();
        if (response.success && response.data) {
          setUser(response.data.user);
          updateUser(response.data.user);
        }
      }
    } catch (error) {
      console.error("Refresh user error:", error);
      // If refresh fails, logout user
      logout();
    }
  };

  useEffect(() => {
    // Initialize auth state
    const initAuth = async () => {
      try {
        if (AuthService.isAuthenticated()) {
          const savedUser = AuthService.getCurrentUserData();
          if (savedUser) {
            setUser(savedUser);
            // Get the stored token
            const token = AuthService.getToken();
            if (token) {
              setToken(token);
            }
            // Optionally refresh user data from server (commented out for now)
            // await refreshUser();
          }
        }
      } catch (error) {
        console.error("Auth initialization error:", error);
        AuthService.logout();
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (nama: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const response = await AuthService.login({ nama, password });
      if (response.success && response.data) {
        setUser(response.data.user);
        setToken(response.data.token);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Login error:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: {
    fullName: string;
    phone: string;
    email: string;
    password: string;
  }): Promise<boolean> => {
    setIsLoading(true);
    try {
      const response = await AuthService.register(data);
      if (response.success && response.data) {
        setUser(response.data.user);
        setToken(response.data.token);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Registration error:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    AuthService.logout();
    setUser(null);
    setToken(null);
  };

  const updateUser = (updatedUser: User) => {
    setUser(updatedUser);
    // Update localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("velora_user", JSON.stringify(updatedUser));
    }
  };

  const value: AuthContextType = {
    user,
    token,
    isLoading,
    isAuthenticated,
    login,
    register,
    logout,
    updateUser,
    refreshUser,
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

// Named and default exports
export { AuthProvider as default };
