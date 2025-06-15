
import * as Sentry from "@sentry/react";

export interface ErrorInfo {
  message: string;
  stack?: string;
  component?: string;
  userId?: string;
}

export const logError = (error: Error, errorInfo?: ErrorInfo) => {
  // Log to console in development
  if (import.meta.env.DEV) {
    console.error("Error caught by middleware:", error);
    console.error("Error info:", errorInfo);
  }

  // Send to Sentry
  Sentry.withScope((scope) => {
    if (errorInfo?.userId) {
      scope.setUser({ id: errorInfo.userId });
    }
    if (errorInfo?.component) {
      scope.setTag("component", errorInfo.component);
    }
    if (errorInfo) {
      // Convert ErrorInfo to a proper context object
      const context: Record<string, any> = {
        message: errorInfo.message,
        ...(errorInfo.stack && { stack: errorInfo.stack }),
        ...(errorInfo.component && { component: errorInfo.component }),
        ...(errorInfo.userId && { userId: errorInfo.userId }),
      };
      scope.setContext("errorInfo", context);
    }
    Sentry.captureException(error);
  });
};

export const logMessage = (message: string, level: "info" | "warning" | "error" = "info") => {
  if (import.meta.env.DEV) {
    console[level](message);
  }
  
  Sentry.addBreadcrumb({
    message,
    level,
    timestamp: Date.now(),
  });
};
