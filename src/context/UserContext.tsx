import React, { createContext, useContext, useState, useEffect } from "react";
import { fetchApi } from "../api/fetchClient";
import { useNavigate } from "react-router-dom";
import { useCart } from "./CartContext";

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalcode: string;
  country: string;
  isGuest: boolean;
  avatar?: string;
  isAdmin?: boolean;
}

interface UserContextType {
  user: User | null;
  isGuest: boolean;
  setUser: (user: User | null) => void;
  token: string | null;
  login: (token: string, user: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { clearCart } = useCart(); // 👈 Import cart context
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );

  const isGuest = !user || !token;

  const login = (token: string, user: User) => {
    setToken(token);
    setUser({ ...user, isGuest: false });
    localStorage.setItem("token", token);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    clearCart();
    localStorage.removeItem("token");
    localStorage.removeItem("cart");
  };

  // Persist user session on page reload
  useEffect(() => {
    if (token && !user) {
      fetchApi("/users/profile")
        .then((data) => setUser(data))
        .catch(() => localStorage.removeItem("token"));
    }
  }, [token, user]);
  const isAuthenticated = !!token && user !== null;
  return (
    <UserContext.Provider
      value={{ user, isGuest, setUser, token, login, logout, isAuthenticated }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used within UserProvider");
  return ctx;
};
