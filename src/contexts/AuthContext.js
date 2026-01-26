"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  login as apiLogin,
  register as apiRegister,
  verifyMFA as apiVerifyMFA,
  logout as apiLogout,
  getCurrentUser,
  isAuthenticated,
} from "@/lib/api";

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  // Check authentication status on mount
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      if (isAuthenticated()) {
        const userData = await getCurrentUser();
        // Parse nested data structure if needed
        const parsedUser = userData.data || userData;
        setUser(parsedUser);
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const data = await apiLogin(email, password);
      // Returns challengeId, not user data
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const register = async (userData) => {
    try {
      const data = await apiRegister(userData);
      // Returns challengeId, not user data
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const verifyMFA = async (challengeId, code) => {
    try {
      // Verify OTP and get JWT token
      await apiVerifyMFA(challengeId, code);

      // Fetch user data after successful verification
      const userData = await getCurrentUser();
      // Parse nested data structure if needed
      const parsedUser = userData.data || userData;
      setUser(parsedUser);

      return { success: true, user: parsedUser };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    apiLogout();
    setUser(null);
    router.push("/register");
  };

  const value = {
    user,
    login,
    register,
    verifyMFA,
    logout,
    loading,
    isAuthenticated: !!user,
    refreshUser: checkAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
