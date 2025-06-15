
import { useState } from "react";
import { Search, Filter, Star, Calendar, MessageSquare, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link, useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { chatService } from "@/services/chatService";

const services = [
  {
    id: 1,
    title: "Professional Web Development",
    provider: "CodeCraft Studios",
    providerId: "provider_1",
    startingPrice: 500,
    rating: 4.9,
    reviews: 45,
    image: "/placeholder.svg",
    category: "Technology",
    location: "Remote",
    responseTime: "1 hour",
    badge: "Top Rated"
  },
  {
    id: 2,
    title: "Home Cleaning Service",
    provider: "CleanPro Services",
    providerId: "provider_2",
    startingPrice: 80,
    rating: 4.8,
    reviews: 128,
    image: "/placeholder.svg",
    category: "Home Services",
    location: "New York, NY",
    responseTime: "30 minutes",
    badge: "Verified"
  },
  {
    id: 3,
    title: "Personal Fitness Training",
    provider: "FitLife Trainers",
    providerId: "provider_3",
    startingPrice: 60,
    rating: 4.7,
    reviews: 89,
    image: "/placeholder.svg",
    category: "Health & Fitness",
    location: "Los Angeles, CA",
    responseTime: "2 hours",
    badge: "Popular"
  },
  {
    id: 4,
    title: "Digital Marketing Consultation",
    provider: "Growth Marketing Co",
    providerId: "provider_4",
    startingPrice: 150,
    rating: 4.9,
    reviews: 67,
    image: "/placeholder.svg",
    category: "Marketing",
    location: "Remote",
    responseTime: "1 hour",
    badge: "Expert"
  }
];

const ServicesPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const [category, setCategory] = useState("all");
  const { toast } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleBookNow = (service: typeof services[0]) => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please log in to book this service.",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }

    // Simulate booking process
    toast({
      title: "Booking Initiated",
      description: `Starting booking process for ${service.title}. You will be contacted within ${service.responseTime}.`,
    });

    // Store booking request in localStorage for demo purposes
    const bookingRequest = {
      serviceId: service.id,
      serviceName: service.title,
      provider: service.provider,
      userId: user.id,
      requestedAt: new Date().toISOString(),
      status: "pending"
    };

    const existingBookings = JSON.parse(localStorage.getItem("serviceBookings") || "[]");
    existingBookings.push(bookingRequest);
    localStorage.setItem("serviceBookings", JSON.stringify(existingBookings));
  };

  const handleStartChat = async (service: typeof services[0]) => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please log in to message service providers.",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }

    try {
      // Create or find existing conversation with the service provider
      const conversationId = await chatService.createConversation(
        [user.id, service.providerId],
        {
          [user.id]: `${user.firstName} ${user.lastName}`,
          [service.providerId]: service.provider
        }
      );

      // Send initial message about the service
      await chatService.sendMessage(
        conversationId,
        user.id,
        `${user.firstName} ${user.lastName}`,
        `Hi! I'm interested in your service: ${service.title}. Could you provide more information about pricing and availability?`
      );

      toast({
        title: "Message Sent",
        description: `Your message has been sent to ${service.provider}. They typically respond within ${service.responseTime}.`,
      });

      // Navigate to messages page
      navigate("/messages");
    } catch (error) {
      console.error("Failed to start chat:", error);
      toast({
        title: "Error",
        description: "Failed to start conversation. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Services</h1>
          <p className="text-gray-600">Find professional services from verified providers</p>
        </div>

        {/* Filters and Search */}
        <div className="mb-8 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative md:col-span-2">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="technology">Technology</SelectItem>
              <SelectItem value="home-services">Home Services</SelectItem>
              <SelectItem value="health-fitness">Health & Fitness</SelectItem>
              <SelectItem value="marketing">Marketing</SelectItem>
              <SelectItem value="consulting">Consulting</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger>
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="response-time">Fastest Response</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {services.map((service) => (
            <Card key={service.id} className="group hover:shadow-lg transition-all duration-300">
              <CardContent className="p-4">
                <div className="relative mb-4">
                  <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                    <img 
                      src={service.image} 
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="absolute top-2 left-2">
                    <Badge variant="default">
                      {service.badge}
                    </Badge>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Link to={`/services/${service.id}`}>
                    <h3 className="font-semibold text-gray-900 group-hover:text-primary transition-colors line-clamp-2">
                      {service.title}
                    </h3>
                  </Link>
                  
                  <Link to={`/providers/${service.provider.toLowerCase().replace(/\s+/g, '-')}`}>
                    <p className="text-sm text-gray-600 hover:text-primary transition-colors">
                      by {service.provider}
                    </p>
                  </Link>
                  
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span className="flex items-center">
                      <MapPin className="h-3 w-3 mr-1" />
                      {service.location}
                    </span>
                    <Badge variant="outline" className="text-xs">
                      {service.category}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center space-x-1">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-3 w-3 ${i < Math.floor(service.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">({service.reviews})</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-gray-900">
                      Starting at ${service.startingPrice}
                    </span>
                    <span className="text-xs text-gray-500">
                      Responds in {service.responseTime}
                    </span>
                  </div>
                </div>
              </CardContent>
              
              <CardFooter className="p-4 pt-0 space-y-2">
                <div className="flex space-x-2 w-full">
                  <Button 
                    className="flex-1"
                    onClick={() => handleBookNow(service)}
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    Book Now
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => handleStartChat(service)}
                  >
                    <MessageSquare className="h-4 w-4" />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
