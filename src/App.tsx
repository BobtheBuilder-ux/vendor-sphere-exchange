
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { AuthProvider } from "@/hooks/useAuth";
import { SearchProvider } from "@/contexts/SearchContext";
import Index from "./pages/Index";
import LoginPage from "./pages/LoginPage";
import VendorRegisterPage from "./pages/VendorRegisterPage";
import AdminRegisterPage from "./pages/AdminRegisterPage";
import VendorDashboard from "./pages/VendorDashboard";
import MessagesPage from "./pages/MessagesPage";
import ElectronicsPage from "./pages/ElectronicsPage";
import FashionPage from "./pages/FashionPage";
import HomeGardenPage from "./pages/HomeGardenPage";
import ServicesPage from "./pages/ServicesPage";
import AutomotivePage from "./pages/AutomotivePage";
import AllVendorsPage from "./pages/AllVendorsPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import AdminDashboard from "./pages/AdminDashboard";
import CustomerDashboard from "./pages/CustomerDashboard";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import SearchPage from "./pages/SearchPage";
import WishlistPage from "./components/WishlistPage";
import NotFound from "./pages/NotFound";
import AnalyticsTracker from "./components/AnalyticsTracker";

const queryClient = new QueryClient();

// PayPal configuration
const paypalOptions = {
  clientId: "AZDxjDPsJXkSFMLl5jNH5mmrZoODGJgTyM2Za7I8k9WNOw_6xnvnQiGfJ5lMnXRPCHqeIJsYYSKgBT-S", // Sandbox client ID
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

const App = () => (
  <QueryClientProvider client={queryClient}>
    <PayPalScriptProvider options={paypalOptions}>
      <AuthProvider>
        <SearchProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <AnalyticsTracker />
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/vendor/register" element={<VendorRegisterPage />} />
                <Route path="/admin/register" element={<AdminRegisterPage />} />
                <Route path="/vendor/dashboard" element={<VendorDashboard />} />
                <Route path="/messages" element={<MessagesPage />} />
                <Route path="/categories/electronics" element={<ElectronicsPage />} />
                <Route path="/categories/fashion" element={<FashionPage />} />
                <Route path="/categories/home-garden" element={<HomeGardenPage />} />
                <Route path="/categories/services" element={<ServicesPage />} />
                <Route path="/categories/automotive" element={<AutomotivePage />} />
                <Route path="/vendors" element={<AllVendorsPage />} />
                <Route path="/products/:id" element={<ProductDetailsPage />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/customer/dashboard" element={<CustomerDashboard />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/wishlist" element={<WishlistPage />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </SearchProvider>
      </AuthProvider>
    </PayPalScriptProvider>
  </QueryClientProvider>
);

export default App;
