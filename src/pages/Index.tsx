
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
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useClerkAuth";

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
