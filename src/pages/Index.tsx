
import { useState, useEffect } from "react";
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

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <FeaturedCategories />
      <FeaturedProducts />
      <FeaturedServices />
      <TrustIndicators />
    </div>
  );
};

export default Index;
