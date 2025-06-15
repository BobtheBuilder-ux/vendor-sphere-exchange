
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
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
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
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
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
