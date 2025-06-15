
import * as Sentry from "@sentry/react";
import { useEffect } from "react";
import { useLocation, useNavigationType, createRoutesFromChildren, matchRoutes } from "react-router-dom";

export const initSentry = () => {
  Sentry.init({
    dsn: import.meta.env.VITE_SENTRY_DSN || "", // You'll need to set this in your environment
    environment: import.meta.env.MODE,
    integrations: [
      Sentry.browserTracingIntegration({
        routingInstrumentation: Sentry.reactRouterV6BrowserTracingIntegration(
          useEffect,
          useLocation,
          useNavigationType,
          createRoutesFromChildren,
          matchRoutes
        ),
      }),
    ],
    tracesSampleRate: import.meta.env.PROD ? 0.1 : 1.0,
    beforeSend(event) {
      // Filter out development errors in production
      if (import.meta.env.DEV && event.environment === 'development') {
        return null;
      }
      return event;
    },
  });
};

// Re-export Sentry components for use in React
export const SentryErrorBoundary = Sentry.ErrorBoundary;
export const SentryProfiler = Sentry.withProfiler;
