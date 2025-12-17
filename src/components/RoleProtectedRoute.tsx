import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthProvider";

const RoleProtectedRoute = ({
  children,
  allowedRoles = [],
  redirectTo = "/login",
}: {
  children: React.ReactNode;
  allowedRoles: string[];
  redirectTo?: string;
}) => {
  const { user, loading } = useAuth();

  if (loading) return null;

  const role = (user as any)?.user_metadata?.role ?? (user as any)?.role ?? null;

  if (!user) return <Navigate to={redirectTo} replace />;
  if (allowedRoles.length === 0) return <>{children}</>;
  return allowedRoles.includes(String(role)) ? <>{children}</> : <Navigate to={redirectTo} replace />;
};

export default RoleProtectedRoute;
