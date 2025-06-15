
import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { authMiddleware, AuthMiddlewareOptions } from "./authMiddleware";

interface RouteMiddlewareProps {
  children: ReactNode;
  options?: AuthMiddlewareOptions;
}

export const RouteMiddleware = ({ children, options }: RouteMiddlewareProps) => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading) {
      const { allowed, redirectTo } = authMiddleware(user, options);
      
      if (!allowed && redirectTo) {
        navigate(redirectTo);
      }
    }
  }, [user, isLoading, navigate, options]);

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  const { allowed } = authMiddleware(user, options);
  
  return allowed ? <>{children}</> : null;
};
