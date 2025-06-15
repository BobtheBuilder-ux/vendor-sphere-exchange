
import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, useNavigationType, createRoutesFromChildren, matchRoutes } from "react-router-dom";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { AuthProvider } from "@/hooks/useAuth";
import { SearchProvider } from "@/contexts/SearchContext";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { RouteMiddleware } from "@/middleware/routeMiddleware";
import { initSentry } from "@/lib/sentry";
import Index from "./pages/Index";
import LoginPage from "./pages/LoginPage";
import AdminLoginPage from "./pages/AdminLoginPage";
import VendorRegisterPage from "./pages/VendorRegisterPage";
import VendorDashboard from "./pages/VendorDashboard";
import MessagesPage from "./pages/MessagesPage";
import ElectronicsPage from "./pages/ElectronicsPage";
import FashionPage from "./pages/FashionPage";
import HomeGardenPage from "./pages/HomeGardenPage";
import ServicesPage from "./pages/ServicesPage";
import AutomotivePage from "./pages/AutomotivePage";
import AllVendorsPage from "./pages/AllVendorsPage";
import VendorDetailsPage from "./pages/VendorDetailsPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import AdminDashboard from "./pages/AdminDashboard";
import CustomerDashboard from "./pages/CustomerDashboard";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import SearchPage from "./pages/SearchPage";
import WishlistPage from "./components/WishlistPage";
import TermsOfService from "./pages/TermsOfService";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import NotFound from "./pages/NotFound";
import AnalyticsTracker from "./components/AnalyticsTracker";

const queryClient = new QueryClient();

// Initialize Sentry
initSentry();

// PayPal configuration
const paypalOptions = {
  clientId: "AZDxjDPsJXkSFMLl5jNH5mmrZoODGJgTyM2Za7I8k9WNOw_6xnvnQiGfJ5lMnXRPCHqeIJsYYSKgBT-S",
  currency: "USD",
  intent: "capture",
  components: "buttons",
  "data-client-token": undefined,
  "enable-funding": "venmo,paylater",
  "disable-funding": "card",
  "buyer-country": "US",
  locale: "en_US",
  debug: true
};

const App = () => {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <PayPalScriptProvider options={paypalOptions}>
          <AuthProvider>
            <SearchProvider>
              <TooltipProvider>
                <Toaster />
                <SonnerToaster />
                <BrowserRouter>
                  <AnalyticsTracker />
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/admin/login" element={<AdminLoginPage />} />
                    <Route path="/vendor/register" element={<VendorRegisterPage />} />
                    <Route 
                      path="/vendor/dashboard" 
                      element={
                        <RouteMiddleware options={{ requireAuth: true, allowedRoles: ["vendor"] }}>
                          <VendorDashboard />
                        </RouteMiddleware>
                      } 
                    />
                    <Route path="/messages" element={<MessagesPage />} />
                    <Route path="/categories/electronics" element={<ElectronicsPage />} />
                    <Route path="/categories/fashion" element={<FashionPage />} />
                    <Route path="/categories/home-garden" element={<HomeGardenPage />} />
                    <Route path="/categories/services" element={<ServicesPage />} />
                    <Route path="/categories/automotive" element={<AutomotivePage />} />
                    <Route path="/vendors" element={<AllVendorsPage />} />
                    <Route path="/vendors/:vendorSlug" element={<VendorDetailsPage />} />
                    <Route path="/products/:id" element={<ProductDetailsPage />} />
                    <Route 
                      path="/admin/dashboard" 
                      element={
                        <RouteMiddleware options={{ requireAuth: true, allowedRoles: ["admin"] }}>
                          <AdminDashboard />
                        </RouteMiddleware>
                      } 
                    />
                    <Route 
                      path="/customer/dashboard" 
                      element={
                        <RouteMiddleware options={{ requireAuth: true, allowedRoles: ["buyer"] }}>
                          <CustomerDashboard />
                        </RouteMiddleware>
                      } 
                    />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/checkout" element={<CheckoutPage />} />
                    <Route path="/search" element={<SearchPage />} />
                    <Route path="/wishlist" element={<WishlistPage />} />
                    <Route path="/terms" element={<TermsOfService />} />
                    <Route path="/privacy" element={<PrivacyPolicy />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </BrowserRouter>
              </TooltipProvider>
            </SearchProvider>
          </AuthProvider>
        </PayPalScriptProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;
