import React from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

export const ProtectedRoute = ({ children, adminOnly }: any) => {
  const { user, isGuest, isAuthenticated } = useUser();

  if (isGuest) return children;

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  if (adminOnly && !user?.isAdmin) return <Navigate to="/not-found" replace />;

  return children;
};
