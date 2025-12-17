import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthProvider";

const ProtectedRoute = ({ children, redirectTo = "/login" }: { children: React.ReactNode; redirectTo?: string }) => {
  const { user, loading } = useAuth();

  if (loading) return null; // or a spinner component

  return user ? <>{children}</> : <Navigate to={redirectTo} replace />;
};

export default ProtectedRoute;
