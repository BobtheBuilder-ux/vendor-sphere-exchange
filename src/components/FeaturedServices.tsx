
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Calendar, MessageSquare, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const featuredServices = [
  {
    id: 1,
    title: "Professional Web Development",
    provider: "CodeCraft Studios",
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

const FeaturedServices = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Services</h2>
            <p className="text-lg text-gray-600">
              Professional services from verified providers
            </p>
          </div>
          <Button variant="outline" asChild>
            <Link to="/services">View All Services</Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredServices.map((service) => (
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
                  <Button className="flex-1">
                    <Calendar className="h-4 w-4 mr-2" />
                    Book Now
                  </Button>
                  <Button variant="outline" size="icon">
                    <MessageSquare className="h-4 w-4" />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedServices;
