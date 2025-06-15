
import { useState, useCallback } from "react";
import { Search, Store, MessageSquare, ShoppingCart, Star, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import FeaturedCategories from "@/components/FeaturedCategories";
import FeaturedProducts from "@/components/FeaturedProducts";
import FeaturedServices from "@/components/FeaturedServices";
import TrustIndicators from "@/components/TrustIndicators";
import PullToRefresh from "@/components/PullToRefresh";
import SeedDataButton from "@/components/SeedDataButton";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";

const Index = () => {
  const { toast } = useToast();
  const { user } = useAuth();

  const handleRefresh = useCallback(async () => {
    // Simulate refresh delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Refreshed",
      description: "Content has been updated",
    });
  }, [toast]);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Admin/Vendor Controls */}
      {user && (user.userType === 'admin' || user.userType === 'vendor') && (
        <div className="bg-gray-50 border-b">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-900">
                  Developer Tools
                </h3>
                <p className="text-xs text-gray-600">
                  Generate sample data to populate your ecommerce platform
                </p>
              </div>
              <SeedDataButton />
            </div>
          </div>
        </div>
      )}
      
      <PullToRefresh onRefresh={handleRefresh}>
        <HeroSection />
        <FeaturedCategories />
        <FeaturedProducts />
        <FeaturedServices />
        <TrustIndicators />
      </PullToRefresh>
    </div>
  );
};

export default Index;
