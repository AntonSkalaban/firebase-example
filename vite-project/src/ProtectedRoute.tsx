import { Navigate } from "react-router-dom";
import {  ReactNode } from "react";
import { useAuth } from "./useAuth";

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const context  = useAuth();

  if (!context?.user) {
    return <Navigate to="/" />;
  }

  return children;
};