
import { User } from "@/types/firestore";

export interface AuthMiddlewareOptions {
  requireAuth?: boolean;
  allowedRoles?: string[];
  redirectTo?: string;
}

export const authMiddleware = (
  user: User | null,
  options: AuthMiddlewareOptions = {}
): { allowed: boolean; redirectTo?: string } => {
  const { requireAuth = false, allowedRoles = [], redirectTo = "/login" } = options;

  // If authentication is required but user is not logged in
  if (requireAuth && !user) {
    return { allowed: false, redirectTo };
  }

  // If specific roles are required
  if (allowedRoles.length > 0 && user) {
    if (!allowedRoles.includes(user.userType)) {
      return { allowed: false, redirectTo: "/" };
    }
  }

  return { allowed: true };
};
